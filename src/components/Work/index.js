// 作品详情组件
// 每个作品的数据结构如下
import React from "react";
import { Typography, Rate, Tag, Row, Col } from "antd";

const { Title, Paragraph, Text } = Typography;

const work = {
  title: "保健室的女神",
  author: ["野上菜月"],
  rj: "RJ265254",
  url: "https://www.dlsite.com/maniax/work/=/product_id/RJ265254.html",
  img:
    "https://img.dlsite.jp/modpub/images2/work/doujin/RJ266000/RJ265254_img_main.jpg",
  description: "好久不见，老师想要舔你的耳朵，吃你的耳朵...",
  tags: ["治愈", "舔耳", "低语", "环绕音", "纯爱"],
  rating: "R18",
  star: 4,
  language: "Japnanese",
  script: `
  01-舔耳手交 22:52

  “难道前辈……和我接吻……只是接吻，就让小鸡鸡勃起了吗
  
  小鸡鸡瘙痒难耐吧，现在我完全明白了，前辈♪
  
  哎呀，虽说前辈没有女人缘，到现在还是处男，
  
  但仅仅亲一下，居然就让小鸡鸡勃起了……。
  
  前辈，手淫之类的都好好地做了吗？♪
  
  02-耳语手交 25:49
  
  “前～辈～。这样在耳边低声私语怎么样？
  
  身体变得很敏感呢，不仅仅是小鸡鸡，耳朵也很脆弱呢，前辈♪
  
  那么，这个怎么样呢。嗯~……”
  
  “看吧，小鸡鸡shiko~shiko（撸鸡鸡的拟声词,下同）。
  
  因为被比自己小的女孩子欺负小鸡鸡而高兴，真是丢人呢♪
  
  前辈不想抵抗吗？
  
  不想让面前柔弱的女孩子，被刻上男人的烙印吗？
  
  不是啊……前辈不是不做……是做不到呢♪
  
  我的手交太舒服，变得不能抵抗了呢♪
  
  前辈这个……变态….变态….大~变~态~…..呵呵呵呵……”
  
  03-黑丝骂倒足交 19:20
  
  “看，就这样慢慢地，挪动脚……丝溜丝溜~
  
  ♪和昨天一样♪表情很舒服♪
  
  看吧看吧，小鸡鸡丝溜丝溜~丝溜丝溜~♪
  
  小鸡鸡在脚下战战兢兢的。唔，好恶心♪
  
  小鸡鸡丝溜丝溜~丝溜丝溜~♪
  
  用滑溜溜的黑丝把小鸡鸡夹住，很舒服吗？
  
  哈~哈~地吐着气，满脸享受的表情，小鸡鸡还越来越硬了……♪
  
  真的，前辈是个变态呢♪看，变态小流氓，我会再踩一踩的♪
  
  要稍微用力一点吗？紧紧地，压迫着小鸡鸡……唔~唔~唔~唔~唔~唔~♪
  
  到底是觉得痛苦呢还是舒服呢？
  
  04-奖励做爱 20:09
  
  “在耳边，我会说很多色情的话♪ 看~我的小穴像鲍鱼一样一张一合♪
  
  小穴里，小鸡鸡在里面，进，出，进，出，进，一直扑哧扑哧扑哧地发抖♪
  
  在温热的小穴里，小鸡鸡被包裹着哦♪
  
  连做梦都梦见的小穴的味道，怎么样呢？
  
  小金鸡和柔软的小穴交缠在一起……
  
  紧紧地、紧紧地紧紧地缠在一起，感觉很舒服、很舒服♪
  
  前辈。前辈，到现在为止妄想了几次？
  
  把这只小鸡鸡放进小穴里的妄想，做了几次？
  
  05-结束 3:31
  
  “以后两个人再在一起，变得舒服起来吧。
  
  拥抱在一起，不停接吻，互相爱抚……最后当然是射在我的里面。
  
  呵呵……。那么，首先再来一次。嗯……。
  
  嗯……最喜欢前辈了♪呵呵……”` // 台本
};

const Work = () => {
  return (
    <div>
      <Row gutter={[32, 32]} align="middle">
        <Col>
          <div>
            <img src={work.img} alt={work.title} />
          </div>
        </Col>
        <Col flex="450px">
          <Title level={4}>{work.title}</Title>
          <Paragraph>作者：{work.author}</Paragraph>
          <Paragraph>分级：{work.rating}</Paragraph>
          <Paragraph>语言：{work.language}</Paragraph>
          <Paragraph>描述：{work.description}</Paragraph>
          <Paragraph>
            链接：
            <a href={work.url} target="_blank" rel="noopener noreferrer">
              访问外链
            </a>
          </Paragraph>
          <Paragraph>编号：{work.rj}</Paragraph>
          <div>
            标签：
            {work.tags.map(tag => (
              <Tag key={tag} color="geekblue">
                {tag}
              </Tag>
            ))}
          </div>
          <div>
            评价： <Rate defaultValue={work.star} />
          </div>
        </Col>
      </Row>
      <Row gutter={[32, 32]}>
        <Col span={16}>
          <Title>台本</Title>
          <Paragraph>
            <pre>{work.script}</pre>
          </Paragraph>
        </Col>
      </Row>
    </div>
  );
};

export default Work;
