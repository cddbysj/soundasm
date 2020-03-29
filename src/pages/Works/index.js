// 所有的作品
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { UserOutlined, SmileOutlined } from '@ant-design/icons';
import { List, Avatar, Tag, Typography, Result } from 'antd';
import { fetchWorks } from 'store/actions';

const { Text, Paragraph } = Typography;

// 占位图片
const imagePlaceholder =
  'https://os.alipayobjects.com/rmsportal/UXamdIxYSkXfoVo.jpg';

const WorksPage = ({ works, fetchWorks }) => {
  const { isFetching, error, items } = works;

  useEffect(() => {
    fetchWorks();
  }, [fetchWorks]);

  return (
    <div>
      {isFetching && <div>Fetching...</div>}
      <List
        itemLayout="vertical"
        size="large"
        style={{ maxWidth: 750 }}
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={items}
        footer={<div>一共 {items.length} 个作品</div>}
        renderItem={item => (
          <List.Item
            key={item.title}
            extra={
              item.imageSrc ? (
                <img
                  width={280}
                  alt="logo"
                  src={item.imageSrc || imagePlaceholder}
                />
              ) : (
                <Result
                  style={{ width: 280 }}
                  icon={<SmileOutlined />}
                  title="This work has no cover yet"
                />
              )
            }
          >
            <List.Item.Meta
              avatar={
                item.avatar || <Avatar size="default" icon={<UserOutlined />} />
              }
              title={item.author.join(' & ')}
              description={`${item.language} ${item.rating} ${
                item.rj ? item.rj : ''
              }`}
            />
            <div>
              <Text strong>
                <a target="_blank" rel="noopener noreferrer" href={item.url}>
                  {item.title}
                </a>
              </Text>
              <Paragraph>{item.description}</Paragraph>
              <div>
                {item.tags.map(tag => (
                  <Tag style={{ margin: 2 }} key={tag}>
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

const mapStateToProps = state => {
  const { works } = state;
  return { works };
};

export default connect(mapStateToProps, { fetchWorks })(WorksPage);
