import { useEffect, useState } from "react";
import { getArticleListAPI } from "../../../apis/article";
import { Button, Card, Flex, List, Tabs } from "antd";

const MyFollowers = () => {
  const list = [
    {
      name: "1",
      isFollowing: 1,
    },
    {
      name: "2",
      isFollowing: 0,
    },
  ];

  const followering = () => (
    <Flex>
      <List
        style={{ width: "100%" }}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item, index) => (
          <List.Item>
            <Flex
              style={{ width: "100%" }}
              justify="space-between"
              align="start"
            >
              <div>用户名 {item.name} </div>
              {item.isFollowing ? (
                // 如果已关注，显示取消关注按钮
                <Button
                  type="primary"
                  onMouseEnter={(e) => {
                    e.target.innerText = "取消关注";
                  }}
                  onMouseLeave={(e) => {
                    e.target.innerText = "已关注";
                  }}
                  onClick={(e) => {
                    // 在此处处理取消关注的逻辑
                  }}
                >
                  已关注
                </Button>
              ) : (
                // 如果未关注，显示关注按钮
                <Button
                  type="default"
                  onMouseEnter={(e) => {
                    e.target.innerText = "关注";
                  }}
                  onMouseLeave={(e) => {
                    e.target.innerText = "未关注";
                  }}
                  onClick={(e) => {
                    // 在此处处理关注的逻辑
                  }}
                >
                  未关注
                </Button>
              )}
            </Flex>
          </List.Item>
        )}
      />
    </Flex>
  );

  const followers = () => (
    <Flex>
      <List
        style={{ width: "100%" }}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item, index) => (
          <List.Item>
            <Flex
              style={{ width: "100%" }}
              justify="space-between"
              align="start"
            >
              <div>用户名 {item.name} </div>
              {item.isFollowing ? (
                // 如果已关注，显示取消关注按钮
                <Button
                  type="primary"
                  onMouseEnter={(e) => {
                    e.target.innerText = "取消关注";
                  }}
                  onMouseLeave={(e) => {
                    e.target.innerText = "已关注";
                  }}
                  onClick={(e) => {
                    // 在此处处理取消关注的逻辑
                  }}
                >
                  已关注
                </Button>
              ) : (
                // 如果未关注，显示关注按钮
                <Button
                  type="default"
                  onMouseEnter={(e) => {
                    e.target.innerText = "关注";
                  }}
                  onMouseLeave={(e) => {
                    e.target.innerText = "未关注";
                  }}
                  onClick={(e) => {
                    // 在此处处理关注的逻辑
                  }}
                >
                  未关注
                </Button>
              )}
            </Flex>
          </List.Item>
        )}
      />
    </Flex>
  );

  // 二级选单 关注和粉丝
  const tabsitems = [
    {
      label: `我的关注`,
      key: "1",
      children: followering(),
    },
    {
      label: `我的粉丝`,
      key: "2",
      children: followers(),
    },
  ];

  return (
    <div>
      <Card>
        <Tabs
          defaultActiveKey="1"
          // type="card"
          type="tabs"
          size="large"
          items={tabsitems}
          style={{
            marginLeft: 20,
            paddingRight: 20,
            width: "100%",
            // 重复渲染bug
            minWidth: 400,
          }}
        />
      </Card>
    </div>
  );
};

export default MyFollowers;
