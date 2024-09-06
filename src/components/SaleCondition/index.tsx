import {
  Button,
  Form,
  Radio,
  Table,
  Input,
  Select,
  Space,
  InputNumber,
} from "antd";
import { G2, Chart, Tooltip, Interval } from "bizcharts";
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

console.log(getTheme());

// 数据源
const data = [
  {
    year: "1991",
    value: 3,
  },
  {
    year: "1992",
    value: 4,
  },
  {
    year: "1993",
    value: 3.5,
  },
  {
    year: "1994",
    value: 5,
  },
  {
    year: "1995",
    value: 6.5,
  },
  {
    year: "1996",
    value: 6,
  },
  {
    year: "1997",
    value: 7,
  },
  {
    year: "1998",
    value: 9,
  },
  {
    year: "1999",
    value: 13,
  },
];

data.forEach((item: any) => (item.type = item.value > 6 ? 1 : 0));

const data1 = [
  { month: "Jan", value: 30 },
  { month: "Feb", value: 90 },
  { month: "Mar", value: 50 },
  { month: "Apr", value: 70 },
  { month: "May", value: 100 },
  { month: "Jun", value: 130 },
];

const columns = [
  { title: "Month", dataIndex: "month", key: "month" },
  { title: "Value", dataIndex: "value", key: "value" },
];

const scale = {
  month: {
    range: [0, 1],
  },
  value: {
    min: 0,
  },
};
const { Option } = Select;

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const SaleCondition = () => {
  const [viewType, setViewType] = useState<"table" | "chart">("table");
  const [data, setData] = useState<any>([]);
  const [form] = Form.useForm();

  const onGenderChange = (value: string) => {
    switch (value) {
      case "male":
        form.setFieldsValue({ note: "Hi, man!" });
        break;
      case "female":
        form.setFieldsValue({ note: "Hi, lady!" });
        break;
      case "other":
        form.setFieldsValue({ note: "Hi there!" });
        break;
      default:
    }
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      MaxTemperature: 38,
      MinTemperature: 23,
      StaticStock: 120,
      SunOrRain: 1,
      Discount: 0.5,
      Day: 1,
    });
  };

  const getRecommend = async (params: any) => {
    try {
      const res = await axios.post(
        `${basePath}/randomForest/getMaxSaleSpeedCountSort`,
        {},
        { params: params }
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const params = {
      MaxTemperature: 38,
      MinTemperature: 23,
      StaticStock: 120,
      SunOrRain: 1,
      Discount: 0.5,
      Day: 1,
    };

    getRecommend(params);
  }, []);

  return (
    <div className="sale-wrapper">
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
              <Select
                placeholder="Select "
                onChange={onGenderChange}
                allowClear
              >
                <Option value="1">Sun</Option>
                <Option value="0">Rain</Option>
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

            <Button onClick={() => setViewType("chart")}>
              <DownloadOutlined />
            </Button>
          </div>
        </div>

        <div className="sale-chart-wrapper">
          {viewType === "table" ? (
            <Table dataSource={data1} columns={columns} rowKey="month" />
          ) : (
            <Chart
              appendPadding={[10, 0, 0, 10]}
              autoFit
              height={500}
              data={data}
              onLineClick={console.log}
              scale={{
                value: { min: 0, alias: "人均年收入", type: "linear-strict" },
              }}
            >
              <Axis name="year" label={null} />
              {data.map((item: any) => (
                <Annotation.Html
                  offsetY={10}
                  position={{
                    year: item.year,
                    value: 0,
                  }}
                  html={`<div style='transform:translateX(-50%);color:${
                    item.value <= 6 ? "red" : "auto"
                  };'>${item.year}</div>`}
                />
              ))}
              <Interval
                position="year*value"
                color={["type", ["red", "dodgerblue"]]}
                label={[
                  "value",
                  (v) => {
                    return {
                      style: {
                        fill: v <= 6 ? "red" : "dodgerblue",
                      },
                    };
                  },
                ]}
                tooltip={[
                  "year*value",
                  (title, value) => {
                    return {
                      title,
                      value,
                      name: "人均年收入",
                    };
                  },
                ]}
              />
              <Legend name="type" visible={false} />
              <Tooltip showCrosshairs follow={false} />
            </Chart>
          )}
        </div>
      </div>
    </div>
  );
};

export default SaleCondition;
