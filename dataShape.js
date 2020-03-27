// 设计存储在 Firebase 数据库的数据的结构
const data = {
  audios: {
    1: {
      title: "",
      author: [],
      rj: "" || null, // DL Site 上的 RJ 编号
      url: "" || null, // 链接地址，比如 DL site 地址，或者 youtube
      platform: "", // 平台：比如 DL site / Youtube / Soundgasm / Netease Music
      imageSrc: "" || null, // 插画或者封面的链接地址, DLsite 封面尺寸是 560*420
      Illustrator: "", // 插画师，比如 DL site 上的 Ryuki 就非常不错
      description: "", // 简短描述
      tags: [""],
      rating: "R18" || "ALL_AGE" || "R15", // 内容分级
      got: false, // 是否已拥有
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
