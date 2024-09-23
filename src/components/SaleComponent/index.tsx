import {
  Button,
  Form,
  Radio,
  Table,
  Input,
  Select,
  Space,
  InputNumber,
  Spin,
  Card,
} from "antd";
import {
  G2,
  Chart,
  Tooltip,
  Interval,
  Interaction,
  ColumnChart,
} from "bizcharts";
import { Point, Legend, getTheme, Axis, Annotation } from "bizcharts";
import { useEffect, useState } from "react";
import "./index.css";
import {
  BarChartOutlined,
  DownloadOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  TableOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { basePath } from "../../config";
import BigModal from "./BigModal";

const columns = [
  { title: "菜品名称", dataIndex: "name", key: "name" },
  { title: "数量", dataIndex: "count", key: "count" },
];

const { Option } = Select;

const SaleComponent = (props: any) => {
  const {
    url = "/randomForest/getKindSaleSpeedCountSort",
    isKind = false,
    title = "按照固定种类数推荐",
  } = props;
  const [viewType, setViewType] = useState<"table" | "chart">("table");
  const [form] = Form.useForm();
  const [OriTableData, setOriTableData] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [chartData, setChartData] = useState<any>([]);
  const [chartDataRatio, setChartDataRatio] = useState<any>([]);
  const [chartDataSpeed, setChartDataSpeed] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [dynamicCol, setDynamicCol] = useState<any>(columns);
  const [titles, setTitles] = useState<any>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [allData, setAllData] = useState<any>([]);
  const [current, setCurrent] = useState<any>();

  const onFinish = (values: any) => {
    console.log(values);
    getRecommend(values);
  };

  // useEffect(() => {
  //   let data2 = [
  //     {
  //       星期四: [
  //         ["虾仁牛肉炒饭", [0.574, 19, 1.2]],
  //         ["孜然羊排炒饭", [0.742, 19, 0]],
  //         ["咖喱牛腩饭", [0.809, 17, 1.71]],
  //         ["秘制卤肉饭", [0.624, 17, 0]],
  //         ["酸菜肥肠饭", [0.604, 16, 1.0]],
  //         ["木耳小炒肉饭", [0.47, 16, 0.83]],
  //       ],
  //     },
  //     {
  //       星期一: [
  //         ["孜然羊排炒饭", [0.741, 19, 0]],
  //         ["咖喱牛腩饭", [0.808, 18, 1.64]],
  //         ["虾仁牛肉炒饭", [0.561, 18, 1.2]],
  //         ["酸菜肥肠饭", [0.604, 16, 1.0]],
  //         ["木耳小炒肉饭", [0.406, 16, 0.66]],
  //         ["秘制卤肉饭", [0.52, 16, 0]],
  //       ],
  //     },
  //   ] as any;

  //   let dataMap = {} as any;
  //   let dmap = data2?.map((item: any) => {
  //     dataMap = { ...dataMap, ...item };
  //     return { ...item };
  //   });

  //   console.log(dataMap, dmap);
  //   setOriTableData(dataMap);
  //   data2 = dataMap;

  //   let data = [] as any;
  //   let titles = Object.keys(data2);
  //   setTitles(titles);
  //   if (typeof data2 == "object") {
  //     Object.keys(data2).map((k: any) => {
  //       let oneChart = [] as any;
  //       data2?.[k]?.map((item: any) => {
  //         oneChart.push({ name: item?.[0], count: item?.[1]?.[1] });
  //       });
  //       data.push(oneChart);
  //     });

  //     console.log(data);
  //     setAllData(data);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (OriTableData?.length == 0) return;
  //   // 转换表格数据
  //   let data = [] as any;
  //   OriTableData?.map((item: any) => {
  //     data.push({ name: item?.[0], count: item?.[1]?.[1] });
  //   });
  //   setTableData(data);

  //   // 转换柱状图数据
  //   let tmpChartData = [] as any;
  //   let tmpChartDataRatio = [] as any;
  //   let tmpChartDataSpeed = [] as any;

  //   OriTableData?.map((item: any) => {
  //     tmpChartData.push({
  //       商品名称: item?.[0],
  //       份数: item?.[1]?.[1],
  //     });
  //     tmpChartDataRatio.push({
  //       商品名称: item?.[0],
  //       转换率: item?.[1]?.[0],
  //     });
  //     tmpChartDataSpeed.push({
  //       商品名称: item?.[0],
  //       速率: item?.[1]?.[2],
  //     });
  //   });
  //   setChartData(tmpChartData);
  //   setChartDataRatio(tmpChartDataRatio);
  //   setChartDataSpeed(tmpChartDataSpeed);
  // }, [OriTableData]);

  // useEffect(() => {
  //   let data = [] as any;
  //   OriTableData?.map((item: any) => {
  //     data.push({ name: item?.[0], count: item?.[1]?.[1] });
  //   });
  //   setTableData(data);
  // }, [OriTableData]);

  const getRecommend = async (params: any) => {
    setLoading(true);

    try {
      const res = await axios.post(`${basePath}${url}`, { ...params });
      let data2 = res?.data?.data;
      console.log(res?.data, data2);
      setOriTableData(res?.data?.data);

      let data = [] as any;
      let titles = Object.keys(data2);
      setTitles(titles);
      if (typeof data2 == "object") {
        Object.keys(data2).map((k: any) => {
          let oneChart = [] as any;
          data2?.[k]?.map((item: any) => {
            oneChart.push({ name: item?.[0], count: item?.[1]?.[1] });
          });
          data.push(oneChart);
        });

        console.log(data);
        setAllData(data);
      }

      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <>
      <BigModal
        data={current}
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      />

      <div className="sale-wrapper-common">
        <div>
          <h1>{title}</h1>
          {viewType === "table" && (
            <Card
              style={{ width: "90vw" }}
              className="sale-wrapper-filter-card"
            >
              <div className="sale-wrapper-filter">
                <Form
                  form={form}
                  name="control-hooks"
                  onFinish={onFinish}
                  layout="inline"
                >
                  <Form.List name="queryParams">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space
                            key={key}
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              marginBottom: 8,
                            }}
                            align="baseline"
                          >
                            <Form.Item
                              name={[name, "StaticStock"]}
                              label="固定库存"
                              rules={[{ required: true }]}
                            >
                              <InputNumber style={{ width: 80 }} />
                            </Form.Item>

                            <Form.Item
                              name={[name, "MaxTemperature"]}
                              label="最高温度"
                              rules={[{ required: true }]}
                            >
                              <InputNumber style={{ width: 60 }} />
                            </Form.Item>

                            <Form.Item
                              name={[name, "MinTemperature"]}
                              label="最低温度"
                              rules={[{ required: true }]}
                            >
                              <InputNumber style={{ width: 60 }} />
                            </Form.Item>
                            <Form.Item
                              name={[name, "SunOrRain"]}
                              label="SunOrRain"
                              rules={[{ required: true }]}
                            >
                              <Select placeholder="Select">
                                <Option value={1}>Sun</Option>
                                <Option value={0}>Rain</Option>
                              </Select>
                            </Form.Item>

                            <Form.Item
                              label="折扣"
                              rules={[{ required: true }]}
                              name={[name, "Discount"]}
                            >
                              <InputNumber style={{ width: 60 }} />
                            </Form.Item>

                            <Form.Item
                              label="Day"
                              rules={[{ required: true }]}
                              name={[name, "Day"]}
                            >
                              <Select
                                style={{ width: 90 }}
                                options={[
                                  { value: 1, label: "星期一" },
                                  { value: 2, label: "星期二" },
                                  { value: 3, label: "星期三" },
                                  { value: 4, label: "星期四" },
                                  { value: 5, label: "星期五" },
                                  { value: 6, label: "星期六" },
                                  { value: 7, label: "星期日" },
                                ]}
                              />
                            </Form.Item>

                            {isKind && (
                              <Form.Item
                                name={[name, "Kind"]}
                                // name="Kind"
                                label="种类数量"
                                rules={[{ required: true }]}
                              >
                                <InputNumber style={{ width: 50 }} />
                              </Form.Item>
                            )}

                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <div className="btn-wrapper">
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() =>
                                add({
                                  MaxTemperature: 40,
                                  MinTemperature: 23,
                                  StaticStock: 140,
                                  SunOrRain: 1,
                                  Discount: 0.5,
                                  Day: 1,
                                  Kind: 6,
                                })
                              }
                              block
                              icon={<PlusOutlined />}
                            >
                              添加查询日
                            </Button>
                          </Form.Item>
                          <Form.Item>
                            <Button type="primary" htmlType="submit">
                              Submit
                            </Button>
                          </Form.Item>
                        </div>
                      </>
                    )}
                  </Form.List>
                </Form>
              </div>
            </Card>
          )}

          <div className="sale-wrapper-header" style={{ marginBottom: "20px" }}>
            <div className="sale-wrapper-header-btns">
              <Radio.Group
                value={viewType}
                onChange={(e) => setViewType(e.target.value)}
              >
                <Radio.Button value="table">
                  <TableOutlined />
                </Radio.Button>
                {/* <Radio.Button value="chart">
                  <BarChartOutlined />
                </Radio.Button> */}
              </Radio.Group>

              <Button onClick={() => setViewType("chart")}>
                <DownloadOutlined />
              </Button>
            </div>
          </div>
          <Spin spinning={loading}>
            <div className="sale-chart-wrapper">
              {viewType === "table" ? (
                <>
                  {allData?.map((item: any, index: number) => {
                    return (
                      <Card
                        hoverable
                        onClick={() => {
                          setCurrent(OriTableData?.[titles?.[index]]);
                          setVisible(true);
                        }}
                        title={
                          <div style={{ fontSize: "14px" }}>
                            {titles?.[index]}
                          </div>
                        }
                        style={{
                          display: "inline-block",
                          width: "200px",
                          margin: "0 20px",
                          cursor: "pointer",
                          // height: "200px",
                        }}
                      >
                        <Table
                          // style={{
                          //   display: "inline-block",
                          //   width: "200px",
                          //   margin: "0 20px",
                          //   height: "200px",
                          // }}
                          pagination={false}
                          size="small"
                          dataSource={item}
                          columns={dynamicCol}
                          // rowKey="month"
                        />
                      </Card>
                    );
                  })}
                </>
              ) : (
                <>
                  <ColumnChart
                    title={{
                      visible: true,
                      alignTo: "center",
                      text: "份数图",
                      style: {
                        fontSize: 14,
                        fill: "black",
                      },
                    }}
                    height={140}
                    width={1000}
                    padding="auto"
                    data={chartData}
                    autoFit
                    xField="商品名称"
                    yField="份数"
                    label={{
                      visible: true,
                      position: "top",
                      style: {
                        fill: "rgba(0, 0, 0, 0.65)",
                        stroke: "#ffffff",
                        lineWidth: 2,
                      },
                    }}
                    color={"#a8daf9"}
                  />
                  <ColumnChart
                    title={{
                      visible: true,
                      alignTo: "center",
                      text: "转换率图",
                      style: {
                        fontSize: 14,
                        fill: "black",
                      },
                    }}
                    height={140}
                    width={1000}
                    padding="auto"
                    data={chartDataRatio}
                    autoFit
                    xField="商品名称"
                    yField="转换率"
                    label={{
                      visible: true,
                      position: "top",
                      style: {
                        fill: "rgba(0, 0, 0, 0.65)",
                        stroke: "#ffffff",
                        lineWidth: 2,
                      },
                    }}
                    color={"#c5baf3"}
                  />
                  <ColumnChart
                    title={{
                      visible: true,
                      alignTo: "center",
                      text: "速率图",
                      style: {
                        fontSize: 14,
                        fill: "black",
                      },
                    }}
                    height={140}
                    width={1000}
                    // margin={20}
                    padding="auto"
                    data={chartDataSpeed}
                    autoFit
                    xField="商品名称"
                    yField="速率"
                    label={{
                      visible: true,
                      position: "top",
                      style: {
                        fill: "rgba(0, 0, 0, 0.65)",
                        stroke: "#ffffff",
                        lineWidth: 2,
                      },
                    }}
                    color={"#ffdf92"}
                  />
                </>
              )}
            </div>
          </Spin>
        </div>
      </div>
    </>
  );
};

export default SaleComponent;
