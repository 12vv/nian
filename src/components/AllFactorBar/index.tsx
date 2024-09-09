import {
  G2,
  Chart,
  Tooltip,
  Interval,
  Interaction,
  ColumnChart,
} from "bizcharts";
import {
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormRadio,
  ProFormText,
  QueryFilter,
} from "@ant-design/pro-components";
import "./index.css";
import { Button, Space, Form } from "antd";
import SelectName from "../SelectName";
import axios from "axios";
import { basePath } from "../../config";
import { useState } from "react";

const data = [
  { name: "London", 月份: "Jan.", 月均降雨量: 18.9 },
  { name: "London", 月份: "Feb.", 月均降雨量: 28.8 },
  { name: "London", 月份: "Mar.", 月均降雨量: 39.3 },
  { name: "London", 月份: "Apr.", 月均降雨量: 81.4 },
  { name: "London", 月份: "May", 月均降雨量: 47 },
  { name: "London", 月份: "Jun.", 月均降雨量: -20.3 },
  { name: "London", 月份: "Jul.", 月均降雨量: 24 },
  { name: "London", 月份: "Aug.", 月均降雨量: 35.6 },
  { name: "Berlin", 月份: "Jan.", 月均降雨量: 12.4 },
  { name: "Berlin", 月份: "Feb.", 月均降雨量: 23.2 },
  { name: "Berlin", 月份: "Mar.", 月均降雨量: -34.5 },
  { name: "Berlin", 月份: "Apr.", 月均降雨量: 99.7 },
  { name: "Berlin", 月份: "May", 月均降雨量: 52.6 },
  { name: "Berlin", 月份: "Jun.", 月均降雨量: 35.5 },
  { name: "Berlin", 月份: "Jul.", 月均降雨量: 37.4 },
  { name: "Berlin", 月份: "Aug.", 月均降雨量: 42.4 },
];

const AllFactorBar = () => {
  const [form] = Form.useForm();
  const [chartData, setChartData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = (values: any) => {
    console.log(values);
    getResult(values);
  };

  const onSelectChange = (values: any) => {
    console.log(values);
  };

  const getResult = async (params: any) => {
    try {
      const res = await axios.post(
        `${basePath}/linearRegression/getOneFactorWeight`,
        {},
        { params: params }
      );

      const ori = res?.data?.data;
      let tmpChartData = [] as any;
      Object.keys(ori).map((item: any) => {
        if (item !== "name") {
          tmpChartData.push({
            factor: item,
            value: ori[item],
          });
        }
      });
      setChartData(tmpChartData);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="factorBar-wrapper">
      <h1>多个要素权重</h1>
      <div className="sale-wrapper-filter">
        <Form
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item name="Name" label="菜品名称" rules={[{ required: true }]}>
            <SelectName
              onChange={onSelectChange}
              type={"multiple"}
              width={"1000px"}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
      <div className="chart-wrapper">
        <ColumnChart
          title={{
            visible: true,
            alignTo: "center",
            text: "多个要素权重图",
            style: {
              fontSize: 18,
              fill: "black",
            },
          }}
          height={400}
          width={1200}
          // margin={20}
          padding="auto"
          data={chartData}
          autoFit
          xField="factor"
          yField="value"
          label={{
            visible: true,
            position: "top",
            style: {
              fill: "rgba(0, 0, 0, 0.65)",
              stroke: "#ffffff",
              lineWidth: 2,
            },
            formatter: (r: any) => {
              console.log(r);
              return r.value.toFixed(2);
            },
          }}
          color={"factor"}
        />

        {/* <Chart height={400} padding="auto" data={chartData} width={1200}>
          <Interval
            adjust={[
              {
                type: "stack",
                marginRatio: 0,
              },
            ]}
            color="factor"
            position="factor*value"
            autoFit
          />
          <Interaction type="element-highlight" />
          <Interaction type="active-region" />
          <Tooltip shared />
        </Chart> */}
      </div>
    </div>
  );
};

export default AllFactorBar;
