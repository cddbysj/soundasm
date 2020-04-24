// 所有作者
import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Spin, Row, Col, Button, Skeleton, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import AuthorProfile from "components/AuthorProfile";

const AuthorsPage = ({ authors, authorProfile }) => {
  const history = useHistory();

  const { authorItems } = authors;
  const { profiles } = authorProfile;

  const [currentAuthor, setCurrentAuthor] = useState(
    (history.location.state && history.location.state.author) || ""
  );

  const authorList = Object.keys(authorItems);

  const profile = profiles && profiles[currentAuthor];

  return (
    <Row gutter={[48, 48]}>
      <Col span={16}>
        {authorProfile.isfetching && <Spin />}
        {profile ? (
          <AuthorProfile profile={profile} />
        ) : (
          <Skeleton avatar>
            <Avatar icon={<UserOutlined />} />
            <div>这位艺术家还没有档案^_^</div>
          </Skeleton>
        )}
      </Col>
      <Col span={8}>
        {authors.isfetching && <Spin />}
        {authorList.map((author) => (
          <Button
            key={author}
            shape="round"
            onClick={() => setCurrentAuthor(author)}
          >
            {author}
          </Button>
        ))}
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  const { authors, authorProfile } = state;
  return { authors, authorProfile };
};

export default connect(mapStateToProps)(AuthorsPage);
