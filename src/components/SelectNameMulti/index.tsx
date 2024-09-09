import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { basePath } from "../../config";
import axios from "axios";

const SelectNameMulti = (props: any) => {
  const {
    options,
    onChange,
    type = "default",
    width = "200px",
    selectValue,
  } = props;
  // const [options, setOptions] = useState<any>([]);
  const [defaultValue, setDefaultValue] = useState<any>(null);

  const handleSelectChange = (value: string[]) => {
    console.log(`selected ${JSON.stringify(value)}`);
    onChange && onChange(value);
  };

  return (
    <>
      <Select
        mode={type}
        allowClear
        value={selectValue}
        style={{ width: width }}
        placeholder="请选择菜品"
        onChange={handleSelectChange}
        options={options}
        // defaultValue={defaultValue}
        key={defaultValue}
        // labelInValue
      />
    </>
  );
};

export default SelectNameMulti;
