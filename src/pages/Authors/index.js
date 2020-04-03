// 所有作者
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Spin, Row, Col, Button } from "antd";
import { fetchAuthors, fetchAuthorProfile } from "store/actions";
import AuthorProfile from "components/AuthorProfile";

const AuthorsPage = ({
  authors,
  authorProfile,
  fetchAuthors,
  fetchAuthorProfile
}) => {
  const { authorItems } = authors;
  const { profile } = authorProfile;

  const [currentProfile, setCurrentProfile] = useState("Latte ASMR");

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  useEffect(() => {
    fetchAuthorProfile(currentProfile);
  }, [currentProfile, fetchAuthorProfile]);

  return (
    <Row gutter={[48, 48]}>
      <Col span={18}>
        {authorProfile.isfetching && <Spin />}
        {profile ? (
          <AuthorProfile profile={profile} />
        ) : (
          <div>这位艺术家还没有档案^_^</div>
        )}
      </Col>
      <Col span={6}>
        {authors.isfetching && <Spin />}
        {Object.keys(authorItems).map(author => (
          <Button
            key={author}
            onClick={() => setCurrentProfile(author)}
            type="link"
            block
          >
            {author}
          </Button>
        ))}
      </Col>
    </Row>
  );
};

const mapStateToProps = state => {
  const { authors, authorProfile } = state;
  return { authors, authorProfile };
};

export default connect(mapStateToProps, { fetchAuthors, fetchAuthorProfile })(
  AuthorsPage
);
