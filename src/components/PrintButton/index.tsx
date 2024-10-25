import React from "react";
// @ts-ignore
import html2pdf from "html2pdf.js";
import { Button } from "antd";
import "./index.css";

const PrintButton: React.FC = () => {
  const handlePrint = () => {
    const element = document.getElementsByClassName("result-wrapper")?.[0]; // 你可以选择要打印的特定元素
    const opt = {
      margin: 0,
      filename: "统计.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 1, logging: true, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "landscape" }, // 设置为竖向打印
    };

    html2pdf().from(element).set(opt).save();
  };
  // const handlePrint = () => {
  //   window.print();
  // };

  return <Button onClick={handlePrint}>打印</Button>;
};

export default PrintButton;
