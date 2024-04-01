import { Button, Col, Divider, Flex, Form, Input, Layout, Row } from "antd";

const PasswordSecurity = () => {
  const onPasswordSecurityFinish = (values) => {
    console.log("onPasswordSecurityFinish", values);
  };
  return (
    <Form name="PasswordSecurity" onFinish={onPasswordSecurityFinish}>
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
              message: "密码安全",
            },
          ]}
        >
          <Row>
            <Col span={6}>密码安全</Col>
            <Col span={18}>
              <Input defaultValue={'密码安全'}></Input>
            </Col>
          </Row>
        </Form.Item>
        <Divider />
        <Form.Item
          name="industry"
          rules={[
            {
              required: true,
              message: "密码安全",
            },
          ]}
        >
          <Row>
            <Col span={6}>密码安全</Col>
            <Col span={18}>
              <Input defaultValue={'密码安全'}></Input>
            </Col>
          </Row>
        </Form.Item>
        <Divider />
        <Form.Item
          name="industry"
          rules={[
            {
              required: true,
              message: "密码安全",
            },
          ]}
        >
          <Row>
            <Col span={6}>密码安全</Col>
            <Col span={18}>
              <Input defaultValue={'密码安全'}></Input>
            </Col>
          </Row>
        </Form.Item>
        <Divider />
        <Form.Item
          name="industry"
          rules={[
            {
              required: true,
              message: "密码安全",
            },
          ]}
        >
          <Row>
            <Col span={6}>密码安全</Col>
            <Col span={18}>
              <Input defaultValue={'密码安全'}></Input>
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

export default PasswordSecurity;
