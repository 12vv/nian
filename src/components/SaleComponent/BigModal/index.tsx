import React, { useEffect } from "react";
import { useState } from "react";
import { Modal, Form, Select, TreeSelect, Card } from "antd";
import type { SelectProps } from "antd";
import "./index.css";
import { Chart, ColumnChart, Interaction, Interval, Legend } from "bizcharts";

interface ModalFormProps {
  // state: any;
  visible: boolean;
  // onSave: (values: any) => void;
  onCancel: () => void;
  data: any;
}

const BigModal: React.FC<ModalFormProps> = ({
  // state,
  visible,
  // onSave,
  onCancel,
  data,
}) => {
  const [chartData, setChartData] = useState<any>([]);
  const [chartDataRatio, setChartDataRatio] = useState<any>([]);
  const [chartDataSpeed, setChartDataSpeed] = useState<any>([]);

  useEffect(() => {
    if (data?.length == 0) return;

    // 转换柱状图数据
    let tmpChartData = [] as any;
    let tmpChartDataRatio = [] as any;
    let tmpChartDataSpeed = [] as any;

    data?.map((item: any) => {
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
  }, [data]);

  return (
    <Modal
      open={visible}
      title="大图展示"
      okText="确认"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        console.log("ok");
        onCancel();
      }}
      width={"95vw"}
      height={"60vh"}
    >
      <Card style={{ margin: "0 10px 10px 0" }} title={data?.[0]?.name}>
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
            height={200}
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
            height={200}
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
            height={200}
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
      </Card>
    </Modal>
  );
};

export default BigModal;
