import React from "react";
import { useState } from "react";
import { Modal, Form, Select, TreeSelect, Card } from "antd";
import type { SelectProps } from "antd";
import "./index.css";
import { Chart, Interaction, Interval, Legend } from "bizcharts";

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
        <Chart
          padding="auto"
          data={data}
          // width={1000}
          width={"85vw"}
          height={"50vh"}
          autoFit
          forceFit
        >
          {/* <Coordinate transpose /> */}
          <Legend
            position="right"
            filter={(value) => {
              console.log(value);
              return true;
            }}
          />
          <Interval
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
    </Modal>
  );
};

export default BigModal;
