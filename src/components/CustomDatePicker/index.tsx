import React, { useState } from "react";
import { DatePicker, Button, Space } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const CustomDatePicker = (props: any) => {
  const { onChange } = props;
  const [dates, setDates] = useState<any>(null);

  // 设置日期的处理函数
  const onDateChange = (dates: any) => {
    console.log(dates);
    const formattedDate1 = dayjs(dates?.[0]).format("YYYY-MM-DD");
    const formattedDate2 = dayjs(dates?.[1]).format("YYYY-MM-DD");
    onChange([formattedDate1, formattedDate2]);
    setDates(dates);
  };

  // 获取今天的起始和结束时间
  const selectToday = () => {
    // const today = dayjs();
    // setDates([today.startOf("day"), today.endOf("day")]);
    const today = dayjs("2024-09-27");

    onDateChange([today.startOf("day"), today.endOf("day")]);
  };

  // 获取本周的起始和结束时间
  const selectThisWeek = () => {
    // const startOfWeek = dayjs().startOf("week");
    // const endOfWeek = dayjs().endOf("week");
    const startOfWeek = dayjs("2024-09-20");
    const endOfWeek = dayjs("2024-09-27");
    // setDates([startOfWeek, endOfWeek]);
    onDateChange([startOfWeek, endOfWeek]);
  };

  // 获取本月的起始和结束时间
  const selectThisMonth = () => {
    // const startOfMonth = dayjs().startOf("month");
    // const endOfMonth = dayjs().endOf("month");
    const startOfMonth = dayjs("2024-08-27");
    const endOfMonth = dayjs("2024-09-27");
    // setDates([startOfMonth, endOfMonth]);
    onDateChange([startOfMonth, endOfMonth]);
  };

  return (
    <div>
      <Space direction="horizontal" size={12}>
        {/* 日期范围选择器 */}
        <RangePicker
          value={dates}
          onChange={onDateChange}
          maxDate={dayjs("2024-09-27")}
        />

        {/* 快速选择按钮 */}
        <Space>
          <Button onClick={selectToday}>今天</Button>
          <Button onClick={selectThisWeek}>本周</Button>
          <Button onClick={selectThisMonth}>本月</Button>
        </Space>
      </Space>
    </div>
  );
};

export default CustomDatePicker;
