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
  TableOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { basePath } from "../../config";

const { Option } = Select;

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const SaleCondition = () => {
  const [viewType, setViewType] = useState<"table" | "chart">("table");
  const [form] = Form.useForm();
  const [OriTableData, setOriTableData] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [chartData, setChartData] = useState<any>([]);
  const [chartDataRatio, setChartDataRatio] = useState<any>([]);
  const [chartDataSpeed, setChartDataSpeed] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const columns = [
    { title: "菜品名称", dataIndex: "name", key: "name" },
    { title: "数量", dataIndex: "count", key: "count" },
  ];
  // const [dynamicCol, setDynamicCol] = useState<any>(columns);

  useEffect(() => {
    // 转换表格数据
    let data = [] as any;
    OriTableData?.map((item: any) => {
      data.push({ name: item?.[0], count: item?.[1]?.[1] });
    });
    setTableData(data);

    // if (!(data?.length > 0)) return;
    // // 工具函数：将原数据转置
    // const transposeData = (data: any) => {
    //   const fields = Object.keys(data?.[0]);
    //   return fields.map((field) => ({
    //     key: field,
    //     field,
    //     ...data.reduce((acc: any, item: any) => {

    //       acc[item.key] = item[field];
    //       return acc;
    //     }, {}),
    //   }));
    // };

    // setTableData(transposeData(data));

    // // 动态生成列
    // const columns = [
    //   { title: "字段", dataIndex: "field", key: "field" },
    //   ...data.map((item: any) => ({
    //     title: item.name,
    //     dataIndex: item.key,
    //     key: item.key,
    //   })),
    // ];

    // setDynamicCol(columns);

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
    setChartData(tmpChartData);
    setChartDataRatio(tmpChartDataRatio);
    setChartDataSpeed(tmpChartDataSpeed);
  }, [OriTableData]);

  const onFinish = (values: any) => {
    console.log(values);
    getRecommend(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      MaxTemperature: 38,
      MinTemperature: 23,
      StaticStock: 140,
      SunOrRain: 1,
      Discount: 0.5,
      Day: 1,
    });
  };

  const getRecommend = async (params: any) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${basePath}/randomForest/getMaxSaleSpeedCountSort`,
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

  return (
    <div className="sale-wrapper-stock">
      <div>
        <h1>按照固定入库量推荐（N=140）</h1>
        <div className="sale-wrapper-filter">
          <Form
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            // style={{ maxWidth: 600 }}
            layout="inline"
          >
            <Form.Item
              name="StaticStock"
              label="固定库存"
              rules={[{ required: true }]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              name="MaxTemperature"
              label="最高温度"
              rules={[{ required: true }]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              name="MinTemperature"
              label="最低温度"
              rules={[{ required: true }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="SunOrRain"
              label="SunOrRain"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select " allowClear>
                <Option value={1}>Sun</Option>
                <Option value={0}>Rain</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="Discount"
              label="折扣"
              rules={[{ required: true }]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item name="Day" label="Day" rules={[{ required: true }]}>
              <InputNumber />
            </Form.Item>

            {/* <Form.Item
              name="Kind"
              label="种类数量"
              rules={[{ required: true }]}
            >
              <InputNumber />
            </Form.Item> */}

            <Form.Item {...tailLayout}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
                <Button type="link" htmlType="button" onClick={onFill}>
                  默认值
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
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

            <Button
              onClick={() => {
                console.log("download");
              }}
            >
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
                {/* <Interval position="商品名称*份数" color={"#a8daf9"} />
                  <Interaction type="element-highlight" />
                  <Interaction type="active-region" />
                  <Tooltip shared />
                </ColumnChart> */}

                {/* <div style={{ textAlign: "center", margin: "30px 0 10 0" }}>
                  转换率
                </div> */}
                {/* <Chart
                  height={150}
                  width={1000}
                  padding="auto"
                  data={chartDataRatio}
                  autoFit
                  title={"转换率图"}
                >
                  <Interval position="商品名称*转换率" color={"#c5baf3"} />
                  <Interaction type="element-highlight" />
                  <Interaction type="active-region" />
                  <Tooltip shared />
                </Chart> */}

                {/* <div style={{ textAlign: "center", margin: "30px 0 10 0" }}>
                  速率图
                </div> */}

                {/* <Chart
                  height={150}
                  width={1000}
                  padding="auto"
                  title={"速率图"}
                  data={chartDataSpeed}
                  autoFit
                >
                  <Interval position="商品名称*速率" color={"#ffdf92"} />
                  <Interaction type="element-highlight" />
                  <Interaction type="active-region" />
                  <Tooltip shared />
                </Chart> */}
              </>
            )}
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default SaleCondition;
