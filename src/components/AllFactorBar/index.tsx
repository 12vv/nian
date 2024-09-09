import {
  Chart,
  GroupedColumnChart,
  Interaction,
  Interval,
  Legend,
} from "bizcharts";
import "./index.css";
import { Button, Space, Form, Tooltip } from "antd";
import SelectName from "../SelectName";
import axios from "axios";
import { basePath } from "../../config";
import { useState } from "react";

const AllFactorBar = () => {
  const [form] = Form.useForm();
  const [chartData, setChartData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = (values: any) => {
    let params = {
      Name: values?.Name.join(","),
    };
    getResult(params);
  };

  const data = [
    { country: "Asia", year: "1750", value: 502 },
    { country: "Asia", year: "1800", value: 635 },
    { country: "Europe", year: "1750", value: 163 },
    { country: "Europe", year: "1800", value: 203 },
  ];

  const onSelectChange = (values: any) => {
    console.log(values);
  };

  const getResult = async (params: any) => {
    try {
      const res = await axios.post(
        `${basePath}/linearRegression/getPartFactorWeight`,
        {},
        { params: params }
      );

      const ori = res?.data?.data;
      let tmpChartData = [] as any;
      ori.map((item: any) => {
        Object.keys(item).map((k: any) => {
          let target = item[k];
          Object.keys(target).map((r: any, index: number) => {
            tmpChartData.push({
              name: k,
              factor: r,
              value: target[r],
            });
          });
        });
      });
      console.log("???????????data, ", tmpChartData);
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
        {/* <GroupedColumnChart
          title={{
            visible: true,
            // alignTo: "center",
            text: "多个要素权重图",
            style: {
              fontSize: 18,
              fill: "black",
            },
          }}
          description={{
            visible: true,
            alignTo: "left",
            text: "多个要素权重图多个要素权重图多个要素权重图",
            style: {
              fontSize: 12,
              fill: "grey",
            },
          }}
          legend={{
            visible: true,
          }}
          // height={400}
          width={1200}
          // padding="auto"
          // columnSize={1}
          // data={data}
          // xField="year"
          // yField="value"
          // groupField="country"
          // autoFit
          data={chartData}
          xField="name"
          yField="value"
          groupField="factor"
          // label={{
          //   visible: true,
          //   position: "top",
          //   style: {
          //     fill: "rgba(0, 0, 0, 0.65)",
          //     stroke: "#ffffff",
          //     lineWidth: 2,
          //   },
          //   // formatter: (r: any) => {
          //   //   console.log(r);
          //   //   return r.value.toFixed(2);
          //   // },
          // }}
          color={"factor"}
        /> */}

        <Chart
          padding="auto"
          data={chartData}
          // width={1300}
          height={"50vh"}
          autoFit
        >
          <Legend />
          <Interval
            adjust={[
              {
                type: "dodge",
                marginRatio: 0,
              },
            ]}
            color="factor"
            position="name*value"
            autoFit
          />
          <Interaction type="element-highlight" />
          <Interaction type="active-region" />
          {/* <Tooltip shared/> */}
        </Chart>
      </div>
    </div>
  );
};

export default AllFactorBar;
