import {
  Chart,
  Coordinate,
  Facet,
  GroupedColumnChart,
  Interaction,
  Interval,
  Legend,
} from "bizcharts";
import "./index.css";
import { Button, Space, Form, Tooltip, Card, Empty, Spin } from "antd";
import SelectNameMulti from "../SelectNameMulti";
import axios from "axios";
import { basePath } from "../../config";
import { useEffect, useState } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import BigModal from "./BigModal";

const AllFactorBar = () => {
  const [form] = Form.useForm();
  const [chartData, setChartData] = useState<any>([]);
  const [dataGroup, setDataGroup] = useState<any>([]);
  const [options, setOptions] = useState<any>([]);
  const [selectValue, setSelectValue] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [data, setData] = useState<any>();

  const onFinish = (values: any) => {
    let params = {
      Name: values?.Name.join(","),
    };
    setDataGroup([]);
    getResult(params);
  };

  const onSelectChange = (values: any) => {
    console.log(values);
    setSelectValue(values);
  };

  const getResult = async (params: any) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${basePath}/linearRegression/getPartFactorWeight`,
        {},
        { params: params }
      );

      const ori = res?.data?.data;
      let tmpChartData = [] as any;
      ori.map((item: any) => {
        Object.keys(item).map((k: any) => {
          let target = item[k];
          let currentData = [] as any;
          Object.keys(target).map((r: any, index: number) => {
            tmpChartData.push({
              name: k,
              factor: r,
              value: target[r],
            });
            currentData.push({
              name: k,
              factor: r,
              value: target[r],
            });
          });
          setDataGroup((prev: any) => [...prev, currentData]);
        });
      });
      console.log("???????????data, ", tmpChartData, dataGroup);
      setChartData(tmpChartData);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const scale = {
    category: {
      // 禁止 BizCharts 自动排序 category
      isOrder: false,
    },
  };

  useEffect(() => {
    getNameList();
  }, []);

  const getNameList = async () => {
    try {
      const res = await axios.get(`${basePath}/information/getAllDishName`);
      const data = res?.data?.data?.map((item: any) => ({
        key: item?.name,
        value: item?.name,
        label: item?.name,
        // item: item,
      }));
      setOptions(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSelectAll = () => {
    form.setFieldValue(
      "Name",
      options.map(({ value }: any) => value)
    );
    console.log(options.map(({ value }: any) => value));
    form.validateFields(["Name"]);
    setSelectValue(options.map(({ value }: any) => value));
  };

  const downloadFile = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = ""; // 设置下载文件名，如果不需要特定名称可留空
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownLoad = async () => {
    try {
      // const res = await axios.get(`${basePath}/downloadPartDishFactor`);
      downloadFile(`${basePath}/downloadPartDishFactor`);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCardClick = (item: any) => {
    console.log(item);
    setData(item);
    setVisible(true);
  };

  return (
    <>
      <BigModal
        data={data}
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      />

      <div className="allfactorBar-wrapper">
        <h1>多个要素权重</h1>

        <div className="sale-wrapper-filter">
          <Form
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="Name"
              label="菜品名称"
              rules={[{ required: true }]}
            >
              <SelectNameMulti
                onChange={onSelectChange}
                type={"multiple"}
                width={"80vw"}
                selectValue={selectValue}
                options={options}
              />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
              </Space>
              <Space>
                <Button style={{ marginLeft: 10 }} onClick={handleSelectAll}>
                  全选
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>

        <>
          {/* <div className="sale-wrapper-header-btns">
            {chartData.length > 0 && (
              <Button onClick={() => handleDownLoad()}>
                点击下载 <DownloadOutlined style={{ fontSize: 20 }} />
              </Button>
            )}
          </div> */}
        </>
        <Card
          title="查询结果（可滑动，右侧点击下载）"
          extra={
            <Button onClick={() => handleDownLoad()} type="primary">
              点击下载 <DownloadOutlined style={{ fontSize: 20 }} />
            </Button>
          }
        >
          <Spin spinning={loading}>
            {dataGroup?.length == 0 ? (
              <Empty />
            ) : (
              <div className="chart-wrapper">
                {/* <GroupedColumnChart
          title={{
            visible: true,
            // alignTo: "center",
            text: "多个要素权重图",
            style: {
              fontSize: 18,
              fill: "black",
            },
          }}
          description={{
            visible: true,
            alignTo: "left",
            text: "多个要素权重图多个要素权重图多个要素权重图",
            style: {
              fontSize: 12,
              fill: "grey",
            },
          }}
          legend={{
            visible: true,
          }}
          // height={400}
          width={1200}
          // padding="auto"
          // columnSize={1}
          // data={data}
          // xField="year"
          // yField="value"
          // groupField="country"
          // autoFit
          data={chartData}
          xField="name"
          yField="value"
          groupField="factor"
          // label={{
          //   visible: true,
          //   position: "top",
          //   style: {
          //     fill: "rgba(0, 0, 0, 0.65)",
          //     stroke: "#ffffff",
          //     lineWidth: 2,
          //   },
          //   // formatter: (r: any) => {
          //   //   console.log(r);
          //   //   return r.value.toFixed(2);
          //   // },
          // }}
          color={"factor"}
        /> */}

                {dataGroup.map((item: any) => {
                  return (
                    <Card
                      hoverable
                      style={{ margin: "0 10px 10px 0", cursor: "pointer" }}
                      title={item?.[0]?.name}
                      onClick={() => {
                        handleCardClick(item);
                      }}
                    >
                      <Chart
                        padding="auto"
                        data={item}
                        // width={1000}
                        width={400}
                        height={"180px"}
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
                          scale={scale}
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
                  );
                })}

                {/* <Chart
          padding="auto"
          data={chartData}
          width={500}
          height={"50vh"}
          autoFit
          forceFit
        >
          <Legend />
          <Interval
            scale={scale}
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
        </Chart> */}
              </div>
            )}
          </Spin>
        </Card>
      </div>
    </>
  );
};

export default AllFactorBar;
