import { Button, Col, Divider, Flex, Form, Input, Layout, Row } from "antd";

const PrivacySettings = () => {
  const onPrivacySettingsFinish = (values) => {
    console.log("onPrivacySettingsFinish", values);
  };
  return (
    <Form name="privacySettings" onFinish={onPrivacySettingsFinish}>
      <Layout
        style={{
          backgroundColor: "white",
          marginLeft: 20,
        }}
      >
        <Form.Item
          name="industry"
          rules={[
            {
              required: true,
              message: "隐私设置",
            },
          ]}
        >
          <Row>
            <Col span={6}>隐私设置</Col>
            <Col span={18}>
              <Input defaultValue={'隐私设置'}></Input>
            </Col>
          </Row>
        </Form.Item>
        <Divider />
        <Form.Item
          name="industry"
          rules={[
            {
              required: true,
              message: "隐私设置",
            },
          ]}
        >
          <Row>
            <Col span={6}>隐私设置</Col>
            <Col span={18}>
              <Input defaultValue={'隐私设置'}></Input>
            </Col>
          </Row>
        </Form.Item>
        <Divider />
        <Form.Item
          name="industry"
          rules={[
            {
              required: true,
              message: "隐私设置",
            },
          ]}
        >
          <Row>
            <Col span={6}>隐私设置</Col>
            <Col span={18}>
              <Input defaultValue={'隐私设置'}></Input>
            </Col>
          </Row>
        </Form.Item>
        <Divider />
        <Form.Item
          name="industry"
          rules={[
            {
              required: true,
              message: "隐私设置",
            },
          ]}
        >
          <Row>
            <Col span={6}>隐私设置</Col>
            <Col span={18}>
              <Input defaultValue={'隐私设置'}></Input>
            </Col>
          </Row>
        </Form.Item>
        <Divider />
        <Flex justify="end">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Flex>
      </Layout>
    </Form>
  );
};

export default PrivacySettings;
