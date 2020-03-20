// 设计存储在 Firebase 数据库的数据的结构
const data = {
  audios: {
    1: {
      title: "",
      author: [],
      url: "" || null,
      img: "" || null, // 图床地址或者 Firebase Strorage 地址
      description: "",
      tags: [""],
      rating: "R18" || "ALL_AGE" || "R15", // 内容分级
      rate: 1, // 作品水准评分，1-5星
      language:
        "English" ||
        "Japnanese" ||
        "Chinese" ||
        "Korean" ||
        "Spanish" ||
        "French"
    }
    // ...more
  },
  authors: {
    1: {
      name: "",
      info: "",
      avatar: "" || null // 图床地址或者 Firebase Strorage 地址
    }
    // ...more
  },
  tags: {
    1: "whisper",
    2: "oil",
    3: "massage"
    // ...more
  },
  languages: {
    1: "English",
    2: "Japanese",
    3: "Chinese"
    // ...
  }
};

console.log(data);
