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

const columns = [
  { title: "菜品名称", dataIndex: "name", key: "name" },
  { title: "数量", dataIndex: "count", key: "count" },
];

const { Option } = Select;

const SaleCategory = () => {
  const [viewType, setViewType] = useState<"table" | "chart">("table");
  const [form] = Form.useForm();
  const [OriTableData, setOriTableData] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [chartData, setChartData] = useState<any>([]);
  const [chartDataRatio, setChartDataRatio] = useState<any>([]);
  const [chartDataSpeed, setChartDataSpeed] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onSunorRainChange = () => {};

  const onFinish = (values: any) => {
    console.log(values);

    getRecommend(values);
  };

  useEffect(() => {
    // 转换表格数据
    let data = [] as any;
    OriTableData?.map((item: any) => {
      data.push({ name: item?.[0], count: item?.[1]?.[1] });
    });

    // 将数据项变为列的实现
    // const transformedData = Object.keys(data).map((key) => ({
    //   key,
    //   label: key,
    //   ...data.reduce((acc: any, item: any) => {
    //     acc[item.key] = item[key];
    //     return acc;
    //   }, {}),
    // }));

    setTableData(data);
    // setTableData(transformedData);

    // 转换柱状图数据
    let tmpChartData = [] as any;
    let tmpChartDataRatio = [] as any;
    let tmpChartDataSpeed = [] as any;

    OriTableData?.map((item: any) => {
      tmpChartData.push({
        商品名称: item?.[0],
        份数: item?.[1]?.[1],
      });
      tmpChartDataRatio.push({
        商品名称: item?.[0],
        转换率: item?.[1]?.[0],
      });
      tmpChartDataSpeed.push({
        商品名称: item?.[0],
        速率: item?.[1]?.[2],
      });
    });
    console.log("==========chartData", chartData);
    setChartData(tmpChartData);
    setChartDataRatio(tmpChartDataRatio);
    setChartDataSpeed(tmpChartDataSpeed);
  }, [OriTableData]);

  useEffect(() => {
    let data = [] as any;
    OriTableData?.map((item: any) => {
      data.push({ name: item?.[0], count: item?.[1]?.[1] });
    });
    setTableData(data);
  }, [OriTableData]);

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      MaxTemperature: 40,
      MinTemperature: 23,
      StaticStock: 140,
      SunOrRain: 1,
      Discount: 0.5,
      Day: 1,
      Kind: 6,
    });
  };

  const getRecommend = async (params: any) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${basePath}/randomForest/getKindSaleSpeedCountSort`,
        {},
        { params: params }
      );
      setOriTableData(res?.data?.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  // function onClick(event: MouseEvent<HTMLElement, MouseEvent>): void {
  //   throw new Error("Function not implemented.");
  // }

  return (
    <div className="sale-wrapper-kind">
      <div>
        <h1>按照固定种类数推荐</h1>
        <Card style={{ width: "90vw" }}>
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
                          // name="MaxTemperature"
                          label="最高温度"
                          rules={[{ required: true }]}
                        >
                          <InputNumber style={{ width: 60 }} />
                        </Form.Item>

                        <Form.Item
                          name={[name, "MinTemperature"]}
                          // name="MinTemperature"
                          label="最低温度"
                          rules={[{ required: true }]}
                        >
                          <InputNumber style={{ width: 60 }} />
                        </Form.Item>
                        <Form.Item
                          name={[name, "SunOrRain"]}
                          // name="SunOrRain"
                          label="SunOrRain"
                          rules={[{ required: true }]}
                        >
                          <Select
                            placeholder="Select"
                            onChange={onSunorRainChange}
                            allowClear
                          >
                            <Option value={1}>Sun</Option>
                            <Option value={0}>Rain</Option>
                          </Select>
                        </Form.Item>

                        <Form.Item
                          // name="Discount"
                          label="折扣"
                          rules={[{ required: true }]}
                          name={[name, "Discount"]}
                        >
                          <InputNumber style={{ width: 60 }} />
                        </Form.Item>

                        <Form.Item
                          // name="Day"
                          label="Day"
                          rules={[{ required: true }]}
                          name={[name, "Day"]}
                        >
                          {/* <InputNumber /> */}

                          <Select
                            // defaultValue="1"
                            style={{ width: 90 }}
                            // onChange={handleChange}
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

                        <Form.Item
                          name={[name, "Kind"]}
                          // name="Kind"
                          label="种类数量"
                          rules={[{ required: true }]}
                        >
                          <InputNumber style={{ width: 50 }} />
                        </Form.Item>

                        <Form.Item>
                          <Space>
                            {/* <Button type="primary" htmlType="submit">
                            Submit
                          </Button> */}
                            {/* <Button htmlType="button" onClick={onReset}>
                            Reset
                          </Button> */}
                            {/* <Button
                            type="link"
                            htmlType="button"
                            onClick={onFill}
                          >
                            默认值
                          </Button> */}
                          </Space>
                        </Form.Item>
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
            {/* 
          <Space className="action-btns">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
            <Button type="link" htmlType="button" onClick={onFill}>
              默认值
            </Button>
          </Space> */}
          </div>
        </Card>
        <div className="sale-wrapper-header" style={{ marginBottom: "20px" }}>
          {/* <Button onClick={() => setViewType("table")} >
            <TableOutlined />
          </Button>
          <Button onClick={() => setViewType("chart")}>
            <BarChartOutlined />
          </Button> */}

          <div className="sale-wrapper-header-btns">
            <Radio.Group
              value={viewType}
              onChange={(e) => setViewType(e.target.value)}
            >
              <Radio.Button value="table">
                <TableOutlined />
              </Radio.Button>
              <Radio.Button value="chart">
                <BarChartOutlined />
              </Radio.Button>
            </Radio.Group>

            <Button onClick={() => setViewType("chart")}>
              <DownloadOutlined />
            </Button>
          </div>
        </div>

        <div className="sale-chart-wrapper">
          <Spin spinning={loading}>
            {viewType === "table" ? (
              <Table dataSource={tableData} columns={columns} rowKey="month" />
            ) : (
              <>
                <ColumnChart
                  title={{
                    visible: true,
                    alignTo: "center",
                    text: "份数图",
                    style: {
                      fontSize: 18,
                      fill: "black",
                    },
                  }}
                  height={150}
                  width={1000}
                  // margin={20}
                  padding="auto"
                  data={chartData}
                  autoFit
                  xField="商品名称"
                  yField="份数"
                  label={{
                    visible: true,
                    position: "top",
                    // offsetX: 6,
                    // offsetY: 6,
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
                      fontSize: 18,
                      fill: "black",
                    },
                  }}
                  height={150}
                  width={1000}
                  // margin={20}
                  padding="auto"
                  data={chartDataRatio}
                  autoFit
                  xField="商品名称"
                  yField="转换率"
                  label={{
                    visible: true,
                    position: "top",
                    // offsetX: 6,
                    // offsetY: 6,
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
                      fontSize: 18,
                      fill: "black",
                    },
                  }}
                  height={150}
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
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default SaleCategory;
