import { Button, Col, Divider, Flex, Form, Input, Layout, Row, message } from 'antd'

const PasswordSecurity = () => {
  const onFinish = (values: Record<string, string>) => {
    void values
    message.success('密码安全设置已保存')
  }

  return (
    <Form name="PasswordSecurity" onFinish={onFinish}>
      <Layout style={{ backgroundColor: 'white', marginLeft: 20 }}>
        {[0, 1, 2, 3].map((index) => (
          <div key={index}>
            <Form.Item
              name={`field-${index}`}
              rules={[{ required: true, message: '密码安全' }]}
            >
              <Row>
                <Col span={6}>密码安全</Col>
                <Col span={18}>
                  <Input defaultValue="密码安全" />
                </Col>
              </Row>
            </Form.Item>
            <Divider />
          </div>
        ))}
        <Flex justify="end">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Flex>
      </Layout>
    </Form>
  )
}

export default PasswordSecurity
