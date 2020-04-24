// 所有的作品
import React from "react";
import { Spin, Row, Col } from "antd";
import { connect } from "react-redux";
import VisibilityFilter from "components/VisibilityFilter";
import WorkList from "components/WorkList";

const getVisibleWorks = (works, filter) => {
  console.count("getVisibleWorks");
  const { items } = works;
  const {
    author,
    tag,
    language,
    rating,
    rj,
    title,
    onlyShowWorksWithScript,
  } = filter;

  const filteredItems = items.filter((item) => {
    const isMatchAuthor = !author || item.author.includes(author);
    const isMatchTag =
      !tag ||
      item.tags.map((tag) => tag.toLowerCase()).includes(tag.toLowerCase());
    const isMatchLanguage = !language || item.language.includes(language);
    const isMatchRating = !rating || item.rating === rating;
    const isMatchRj = !rj || (item.rj && item.rj.includes(rj));
    const isMatchTitle =
      !title || item.title.toLowerCase().includes(title.toLowerCase());
    const isMatchHasScript = onlyShowWorksWithScript ? item.script : true;
    return (
      isMatchAuthor &&
      isMatchTag &&
      isMatchLanguage &&
      isMatchRating &&
      isMatchRj &&
      isMatchTitle &&
      isMatchHasScript
    );
  });

  return { ...works, items: filteredItems };
};

const WorksPage = ({ works }) => {
  const { isFetching, items } = works;

  return (
    <Row gutter={[32, 32]}>
      <Col span={18}>
        {isFetching && <Spin delay={1000} />}
        <WorkList items={items} />
      </Col>
      <Col span={6}>
        <VisibilityFilter />
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  const { works, visibilityFilter } = state;
  return {
    works: getVisibleWorks(works, visibilityFilter),
    visibilityFilter,
  };
};

export default connect(mapStateToProps)(WorksPage);
