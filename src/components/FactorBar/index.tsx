import { G2, Chart, Tooltip, Interval } from "bizcharts";
import {
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormRadio,
  ProFormText,
  QueryFilter,
} from "@ant-design/pro-components";
import "./index.css";

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

const FactorBar = () => {
  return (
    <div className="factorBar-wrapper">
      <div className="query-wrapper">
        <QueryFilter layout="vertical">
          <ProFormText name="name" label="这是一个超级超级长的名称" />
          <ProFormText name="sex" label="应用状态" />
          <ProFormRadio.Group
            name="freq"
            label="查询频度"
            options={[
              {
                value: "weekly",
                label: "每周",
              },
              {
                value: "quarterly",
                label: "每季度",
              },
              {
                value: "monthly",
                label: "每月",
              },
              {
                value: "yearly",
                label: "每年",
              },
            ]}
          />
          <ProFormDatePicker name="birth" label="创建时间" />

          <ProFormCheckbox.Group
            name="checkbox"
            label="行业分布"
            options={["农业", "制造业", "互联网"]}
          />
        </QueryFilter>
      </div>
      <div className="chart-wrapper">
        <Chart height={400} padding="auto" data={data} autoFit>
          <Interval
            adjust={[
              {
                type: "dodge",
                marginRatio: 0,
              },
            ]}
            color="name"
            position="月份*月均降雨量"
          />
          <Tooltip shared />
        </Chart>
      </div>
    </div>
  );
};

export default FactorBar;
