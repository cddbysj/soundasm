// 所有作者
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Spin, Row, Col, Button, Skeleton, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { fetchAuthors, fetchAuthorProfiles } from "store/actions";
import AuthorProfile from "components/AuthorProfile";

const AuthorsPage = ({
  authors,
  authorProfile,
  fetchAuthors,
  fetchAuthorProfiles,
}) => {
  const { authorItems } = authors;
  const { profiles } = authorProfile;

  const [currentAuthor, setCurrentAuthor] = useState("");

  const authorList = Object.keys(authorItems);

  const profile = profiles && profiles[currentAuthor];

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  useEffect(() => {
    fetchAuthorProfiles();
  }, [fetchAuthorProfiles]);

  return (
    <Row gutter={[48, 48]}>
      <Col span={18}>
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
      <Col span={6}>
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

export default connect(mapStateToProps, {
  fetchAuthors,
  fetchAuthorProfiles,
})(AuthorsPage);
