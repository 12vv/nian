import {
  G2,
  Chart,
  Tooltip,
  Interval,
  Interaction,
  ColumnChart,
  Coordinate,
  Axis,
  getTheme,
} from "bizcharts";
import {
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormRadio,
  ProFormText,
  QueryFilter,
} from "@ant-design/pro-components";
import "./index.css";
import { Button, Space, Form, Table, Divider, Spin } from "antd";
import SelectName from "../SelectName";
import axios from "axios";
import { basePath } from "../../config";
import { useState } from "react";
import CustomDatePicker from "../CustomDatePicker";

const columns = [
  { title: "菜品名称", dataIndex: "name", key: "name" },
  { title: "销售量", dataIndex: "SaleCount", key: "SaleCount" },
  { title: "入库量", dataIndex: "StaticStock", key: "StaticStock" },
  { title: "中午卖出", dataIndex: "LunchNumber", key: "LunchNumber" },
  { title: "晚上卖出", dataIndex: "DinnerNumber", key: "DinnerNumber" },
  { title: "转化率", dataIndex: "ConvertRate", key: "ConvertRate" },
  { title: "销售天数", dataIndex: "Days", key: "Days" },
];

const salesColumns = [
  { title: "菜品名称", dataIndex: "name", key: "name" },
  { title: "销售量", dataIndex: "SaleCount", key: "SaleCount" },
  { title: "入库量", dataIndex: "StaticStock", key: "StaticStock" },
  { title: "中午卖出", dataIndex: "LunchNumber", key: "LunchNumber" },
  { title: "晚上卖出", dataIndex: "DinnerNumber", key: "DinnerNumber" },
  { title: "转化率", dataIndex: "ConvertRate", key: "ConvertRate" },
  { title: "销售天数", dataIndex: "Days", key: "Days" },
];

const profitColumns = [
  { title: "菜品名称", dataIndex: "name", key: "name" },
  { title: "销售总额", dataIndex: "SalesAmount", key: "SalesAmount" },
  { title: "总利润", dataIndex: "TotalProfit", key: "TotalProfit" },
  {
    title: "平均每天利润",
    dataIndex: "MeanProfitEveryDay",
    key: "MeanProfitEveryDay",
  },
  {
    title: "平均每道菜利润",
    dataIndex: "MeanProfitEveryOne",
    key: "MeanProfitEveryOne",
  },
  { title: "天数", dataIndex: "Days", key: "Days" },
];

const TopBar = () => {
  const [form] = Form.useForm();
  const [date, setDate] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [profitTableLoading, setprofitTableLoading] = useState<boolean>(false);
  const [salesTableLoading, setSalesTableLoading] = useState<boolean>(false);
  const [pieSaleLoading, setPieSaleLoading] = useState<boolean>(false);
  const [pieStockLoading, setPieStockLoading] = useState<boolean>(false);

  const [profitTableData, setProfitTableData] = useState<any>([]);
  const [salesTableData, setSalesTableData] = useState<any>([]);
  const [pieSaleData, setPieSaleData] = useState<any>([]);
  const [pieStockData, setPieStockData] = useState<any>([]);

  const onFinish = (values: any) => {
    console.log(values, date);
    getResult({ startDate: date?.[0], endDate: date?.[1] });
    getProfitResult({ startDate: date?.[0], endDate: date?.[1] });
    getSalesResult({ startDate: date?.[0], endDate: date?.[1] });
    getPieResult({ startDate: date?.[0], endDate: date?.[1] });
  };

  const onSelectChange = (values: any) => {
    console.log(values);
    setDate(values);
    // getResult({ startDate: values?.[0], endDate: values?.[1] });
  };

  const getResult = async (params: any) => {
    setTableLoading(true);
    try {
      const res = await axios.post(
        `${basePath}/information/getDishInfo/getSpeedTop3AndTail3DishInfo`,
        params
      );

      setTableData(res?.data?.data);
      setTableLoading(false);
    } catch (e) {
      console.log(e);
      setTableLoading(false);
    }
  };

  const getProfitResult = async (params: any) => {
    setprofitTableLoading(true);
    try {
      const res = await axios.post(
        `${basePath}/information/getDishInfo/getProfitTop3AndTail3DishInfo`,
        params
      );

      console.log(res?.data?.data);
      setProfitTableData(res?.data?.data);
      setprofitTableLoading(false);
    } catch (e) {
      console.log(e);
      setprofitTableLoading(false);
    }
  };

  const getSalesResult = async (params: any) => {
    setSalesTableLoading(true);

    try {
      const res = await axios.post(
        `${basePath}/information/getDishInfo/getSalesTop3AndTail3DishInfo`,
        params
      );

      console.log(res?.data?.data);
      setSalesTableData(res?.data?.data);
      setSalesTableLoading(false);
    } catch (e) {
      console.log(e);
      setSalesTableLoading(false);
    }
  };

  const getPieResult = async (params: any) => {
    setPieSaleLoading(true);
    try {
      const res = await axios.post(
        `${basePath}/information/getDishInfo/getCategoryPercentInfo`,
        params
      );

      console.log(res?.data?.data);

      const result = res?.data?.data;
      const categorySaleCount = result?.categorySaleCount;
      const categorySaleCountPercent = result?.categorySaleCountPercent;
      const categoryStaticStockCount = result?.categoryStaticStockCount;
      const categoryStaticStockCountPercent =
        result?.categoryStaticStockCountPercent;

      let salePie: any = [];
      let stockPie: any = [];

      Object.keys(categorySaleCount)?.map((key: any) => {
        salePie.push({
          item: key,
          count: categorySaleCount[key],
          percent: categorySaleCountPercent[key],
        });
        stockPie.push({
          item: key,
          count: categoryStaticStockCount[key],
          percent: categoryStaticStockCountPercent[key],
        });
      });

      setPieSaleData(salePie);
      setPieStockData(stockPie);
      setPieSaleLoading(false);
    } catch (e) {
      setPieSaleLoading(false);
      console.log(e);
    }
  };

  // const data = [
  //   { item: "事例一", count: 40, percent: 0.4 },
  //   { item: "事例二", count: 21, percent: 0.21 },
  //   { item: "事例三", count: 17, percent: 0.17 },
  //   {
  //     item: "事例四xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxYYYY",
  //     count: 13,
  //     percent: 0.13,
  //   },
  //   { item: "事例五", count: 9, percent: 0.09 },
  // ];

  const cols = {
    percent: {
      formatter: (val: any) => {
        val = val * 100 + "%";
        return val;
      },
    },
  };

  return (
    <div className="topBar-wrapper">
      <h1>报表系统</h1>
      <div className="sale-wrapper-filter">
        <Form
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          // style={{ maxWidth: 600 }}
          layout="inline"
        >
          <Form.Item name="Name" label="查询日期" rules={[{ required: true }]}>
            {/* <SelectName onChange={onSelectChange} /> */}
            <CustomDatePicker onChange={onSelectChange} />
          </Form.Item>

          {/* <Form.Item
              name="Kind"
              label="种类数量"
              rules={[{ required: true }]}
            >
              <InputNumber />
            </Form.Item> */}

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
      <div className="result-wrapper">
        <Divider>销售速度</Divider>
        <Spin spinning={tableLoading}>
          <div className="chart-wrapper">
            <Table
              dataSource={tableData?.slice(0, 3)}
              columns={columns}
              size="small"
              title={() => {
                <>{"TOP 3"}</>;
              }}
              pagination={false}
            />
            <Divider type="vertical" style={{ height: "80%" }} />
            <Table
              size="small"
              dataSource={tableData?.slice(-3)}
              columns={columns}
              title={() => {
                <>{"LAST 3"}</>;
              }}
              pagination={false}
            />
          </div>
        </Spin>
        <Divider>销售利润</Divider>
        <Spin spinning={profitTableLoading}>
          <div className="chart-wrapper">
            <Table
              size="small"
              dataSource={profitTableData?.slice(0, 3)}
              columns={profitColumns}
              pagination={false}
            />
            <Divider type="vertical" style={{ height: "80%" }} />
            <Table
              size="small"
              dataSource={profitTableData?.slice(-3)}
              columns={profitColumns}
              pagination={false}
            />
          </div>
        </Spin>
        <Divider>销售额</Divider>
        <Spin spinning={salesTableLoading}>
          <div className="chart-wrapper">
            <Table
              size="small"
              dataSource={salesTableData?.slice(0, 3)}
              columns={salesColumns}
              pagination={false}
            />
            <Divider type="vertical" style={{ height: "80%" }} />
            <Table
              size="small"
              dataSource={salesTableData?.slice(-3)}
              columns={salesColumns}
              pagination={false}
            />
          </div>
        </Spin>
        <Divider style={{ marginTop: "100px" }}>饼图</Divider>

        <div className="pie-chart-wrapper">
          <Spin spinning={pieSaleLoading}>
            <Chart
              height={400}
              width={500}
              data={pieSaleData}
              scale={cols}
              autoFit
              onIntervalClick={(e: any) => {
                const states = e.target.cfg.element.getStates(); // 如果是选中，值为['selected'];取消选中，值为[]
              }}
              onGetG2Instance={(c: any) => {
                // console.log(c.getXY(data?.[0]));
              }}
            >
              <Coordinate type="theta" radius={0.75} />
              <Tooltip showTitle={false} />
              <Axis visible={false} />
              <Interval
                position="percent"
                adjust="stack"
                color="item"
                style={{
                  lineWidth: 1,
                  stroke: "#fff",
                }}
                label={[
                  "count",
                  {
                    // label 太长自动截断
                    layout: {
                      type: "limit-in-plot",
                      cfg: { action: "ellipsis" },
                    },
                    content: (data) => {
                      return `${data.item}: ${data.percent * 100}%`;
                    },
                  },
                ]}
                state={{
                  selected: {
                    style: (t) => {
                      const res =
                        getTheme().geometries.interval.rect.selected.style(t);
                      return { ...res, fill: "red" };
                    },
                  },
                }}
              />
              <Interaction type="element-single-selected" />
            </Chart>
            {/* <Divider type="vertical" style={{ height: "80%" }} /> */}
            <Chart
              height={400}
              width={500}
              data={pieStockData}
              scale={cols}
              autoFit
              onIntervalClick={(e: any) => {
                const states = e.target.cfg.element.getStates(); // 如果是选中，值为['selected'];取消选中，值为[]
              }}
              onGetG2Instance={(c: any) => {
                // console.log(c.getXY(data[0]));
              }}
            >
              <Coordinate type="theta" radius={0.75} />
              <Tooltip showTitle={false} />
              <Axis visible={false} />
              <Interval
                position="percent"
                adjust="stack"
                color="item"
                style={{
                  lineWidth: 1,
                  stroke: "#fff",
                }}
                label={[
                  "count",
                  {
                    // label 太长自动截断
                    layout: {
                      type: "limit-in-plot",
                      cfg: { action: "ellipsis" },
                    },
                    content: (data) => {
                      return `${data.item}: ${data.percent * 100}%`;
                    },
                  },
                ]}
                state={{
                  selected: {
                    style: (t) => {
                      const res =
                        getTheme().geometries.interval.rect.selected.style(t);
                      return { ...res, fill: "red" };
                    },
                  },
                }}
              />
              <Interaction type="element-single-selected" />
            </Chart>
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
