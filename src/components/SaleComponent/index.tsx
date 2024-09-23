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
  const [form1] = Form.useForm();

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
  const [showRate, setShowRate] = useState<boolean>(false);
  const [rate, setRate] = useState<number>(0.5);

  const onFinish = (values: any) => {
    console.log(values);
    getRecommend({
      repetitionRate: rate,
      ...values,
    });
  };

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

  const handleFormChange = () => {
    console.log(form.getFieldsValue());
    if (form.getFieldsValue()?.queryParams?.length >= 2) {
      setShowRate(true);
    } else {
      setShowRate(false);
    }
  };

  const handleRateChange = (values: any) => {
    setRate(values);
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
          <div style={{ marginBottom: 10 }}>
            <Form form={form1} name="control-hooks1" layout="inline">
              <Form.Item
                style={{
                  display: showRate ? "block" : "none",
                }}
                shouldUpdate
                name={"repetitionRate"}
                label="重复率"
                rules={[{ required: true }]}
              >
                <InputNumber
                  onChange={handleRateChange}
                  style={{ width: 60 }}
                  min={0}
                  max={1}
                  defaultValue={0.5}
                />
              </Form.Item>
            </Form>
          </div>
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
                  onChange={handleFormChange}
                >
                  <Form.List name="queryParams">
                    {(fields, { add, remove }) => (
                      <div>
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

                            <MinusCircleOutlined
                              onClick={() => {
                                remove(name);
                                if (
                                  form.getFieldsValue()?.queryParams?.length >=
                                  2
                                ) {
                                  setShowRate(true);
                                } else {
                                  setShowRate(false);
                                }
                              }}
                            />
                          </Space>
                        ))}
                        <div className="btn-wrapper">
                          <Form.Item>
                            <Button
                              type="dashed"
                              disabled={
                                form.getFieldsValue()?.queryParams?.length >= 2
                              }
                              onClick={() => {
                                add({
                                  MaxTemperature: 40,
                                  MinTemperature: 23,
                                  StaticStock: 140,
                                  SunOrRain: 1,
                                  Discount: 0.5,
                                  Day: 1,
                                  Kind: 6,
                                });

                                if (
                                  form.getFieldsValue()?.queryParams?.length >=
                                  2
                                ) {
                                  setShowRate(true);
                                } else {
                                  setShowRate(false);
                                }
                              }}
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
                      </div>
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
                        size="small"
                        key={index}
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
                          width: "220px",
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
                          rowKey="name"
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
