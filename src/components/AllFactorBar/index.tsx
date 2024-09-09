import {
  Chart,
  Coordinate,
  Facet,
  GroupedColumnChart,
  Interaction,
  Interval,
  Legend,
} from "bizcharts";
import "./index.css";
import { Button, Space, Form, Tooltip, Card } from "antd";
import SelectName from "../SelectName";
import axios from "axios";
import { basePath } from "../../config";
import { useEffect, useState } from "react";

const AllFactorBar = () => {
  const [form] = Form.useForm();
  const [chartData, setChartData] = useState<any>([]);
  const [dataGroup, setDataGroup] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = (values: any) => {
    let params = {
      Name: values?.Name.join(","),
    };
    setDataGroup([]);
    getResult(params);
  };

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
          let currentData = [] as any;
          Object.keys(target).map((r: any, index: number) => {
            tmpChartData.push({
              name: k,
              factor: r,
              value: target[r],
            });
            currentData.push({
              name: k,
              factor: r,
              value: target[r],
            });
          });
          setDataGroup((prev: any) => [...prev, currentData]);
        });
      });
      console.log("???????????data, ", tmpChartData, dataGroup);
      setChartData(tmpChartData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("dfasdfadfadf", dataGroup);
  }, [dataGroup]);

  const scale = {
    category: {
      // 禁止 BizCharts 自动排序 category
      isOrder: false,
    },
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
            <Space>
              <Button style={{ marginLeft: 10 }}>全选</Button>
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

        {dataGroup.map((item: any) => {
          return (
            <Card style={{ margin: "0 10px 10px 0" }} title={item?.[0]?.name}>
              <Chart
                padding="auto"
                data={item}
                // width={1000}
                width={420}
                height={"180px"}
                autoFit
                forceFit
              >
                {/* <Coordinate transpose /> */}
                <Legend />
                <Interval
                  scale={scale}
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
            </Card>
          );
        })}

        {/* <Chart
          padding="auto"
          data={chartData}
          width={500}
          height={"50vh"}
          autoFit
          forceFit
        >
          <Legend />
          <Interval
            scale={scale}
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
        </Chart> */}
      </div>
    </div>
  );
};

export default AllFactorBar;
