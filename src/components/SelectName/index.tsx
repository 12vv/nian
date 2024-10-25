import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { basePath } from "../../config";
import axios from "axios";

const SelectName = (props: any) => {
  const { onChange, type = "default", width = "200px" } = props;
  const [options, setOptions] = useState<any>([]);
  const [defaultValue, setDefaultValue] = useState<any>(null);

  const handleSelectChange = (value: string[]) => {
    console.log(`selected ${JSON.stringify(value)}`);
    onChange && onChange(value);
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

  return (
    <>
      <Select
        mode={type}
        allowClear
        style={{ width: width }}
        placeholder="请选择菜品"
        onChange={handleSelectChange}
        options={options}
        defaultValue={defaultValue}
        key={defaultValue}
        // labelInValue
      />
    </>
  );
};

export default SelectName;
