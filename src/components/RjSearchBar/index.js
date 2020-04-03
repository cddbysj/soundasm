// RJ 搜索框组件
import React, { useState } from "react";
import { Input, Tooltip } from "antd";

const { Search } = Input;

const DL_URL = "https://www.dlsite.com/maniax/work/=/product_id/";

const validateRJ = rj => {
  if (rj.length === 8) {
    const number = parseInt(rj.slice(2));
    if (rj.startsWith("RT")) return true;
    return rj.startsWith("RJ") && number >= 80000 && number <= 400000;
  }

  if (rj.length === 6) {
    const number = parseInt(rj);
    return number >= 80000 && number <= 400000;
  }

  return false;
};

const RjSearchBar = () => {
  const [tips, setTips] = useState("");

  const handleRjSearch = rj => {
    console.log("rj", rj);
    const RJ = rj.toUpperCase();
    if (validateRJ(RJ)) {
      window.open(`${DL_URL}${RJ}.html`, "_blank");
    } else {
      setTips("格式：RJ138503");
      return;
    }
  };

  return (
    <Tooltip title={tips}>
      <Search
        placeholder="输入 RJ 编号"
        style={{ width: 160 }}
        onSearch={handleRjSearch}
        allowClear
      />
    </Tooltip>
  );
};

export default RjSearchBar;
