// 作品详情组件
// 每个作品的数据结构如下
import React from "react";

const work = {
  title: "",
  author: [],
  url: "" || null,
  img: "" || null, // 图床地址或者 Firebase Strorage 地址
  description: "",
  tags: [""],
  rating: "R18" || "ALL_AGE" || "R15", // 内容分级
  rate: 1, // 作品水准评分，1-5星
  language:
    "English" || "Japnanese" || "Chinese" || "Korean" || "Spanish" || "French"
};

const Work = () => {
  return (
    <div>
      <h1>作品详情</h1>
    </div>
  );
};

export default Work;
