import {
  Avatar,
  Button,
  Card,
  Divider,
  Flex,
  Form,
  List,
  Radio,
  message,
} from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getCommentsListAPI, publishCommentAPI } from '@/api'
import type { RootState } from '@/store'
import type { Comment, CommentQuery } from '@/types'
import './index.scss'

interface CommentFormValues {
  inputContent: string
}

const CommentsPanel = () => {
  const { avatarUrl } = useSelector((state: RootState) => state.user.userInfo)
  const [commentsList, setCommentsList] = useState<Comment[]>([])
  const [commentsValue, setCommentsValue] = useState<'hot' | 'new'>('hot')
  const [reqData, setReqData] = useState<CommentQuery>({ sortOrder: 'hot' })
  const [form] = Form.useForm<CommentFormValues>()

  useEffect(() => {
    const getCommentsList = async () => {
      const res = await getCommentsListAPI(reqData)
      setCommentsList(res.data.commentsData)
    }
    void getCommentsList()
  }, [reqData])

  const onCommentsGroupChange = (value: 'hot' | 'new') => {
    setCommentsValue(value)
    setReqData({ sortOrder: value })
  }

  const onCommentInputFinish = async (values: CommentFormValues) => {
    await publishCommentAPI({ content: values.inputContent })
    message.success('发表成功')
    form.resetFields()
    setReqData((prev) => ({ ...prev }))
  }

  return (
    <Card>
      <Flex vertical>
        <Flex align="center" gap="middle">
          <Flex align="center" gap="small">
            <h3>评论</h3>
            <p>{commentsList.length}</p>
          </Flex>
          <Radio.Group
            options={[
              { label: '最热', value: 'hot' },
              { label: '最新', value: 'new' },
            ]}
            onChange={(e) => onCommentsGroupChange(e.target.value)}
            value={commentsValue}
            optionType="button"
          />
        </Flex>
        <Flex align="flex-start" gap="small">
          <Avatar
            src={avatarUrl}
            style={{ verticalAlign: 'middle', minWidth: 35, minHeight: 35, marginLeft: 10, marginRight: 10 }}
            size="default"
          />
          <Form form={form} style={{ width: '100%' }} onFinish={onCommentInputFinish} validateTrigger="onBlur">
            <Flex justify="space-between" gap="middle" style={{ width: '100%' }}>
              <Form.Item
                name="inputContent"
                style={{ width: '100%' }}
                rules={[{ required: true, message: '请输入内容' }]}
              >
                <TextArea
                  className="commentInput"
                  showCount
                  maxLength={200}
                  placeholder="这里需要输入一条评论"
                  autoSize={{ minRows: 3, maxRows: 10 }}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  发布
                </Button>
              </Form.Item>
            </Flex>
          </Form>
        </Flex>
        <Divider />
        <List
          itemLayout="horizontal"
          dataSource={commentsList}
          renderItem={(item) => (
            <List.Item>
              <Flex align="flex-start" gap="small">
                <Avatar src={avatarUrl} size="large" style={{ marginTop: 15 }} />
                <Flex align="flex-start" vertical gap="middle">
                  <h4>{item.username}</h4>
                  <div>{item.content}</div>
                  <Flex gap="large">
                    <p>{item.pubdate}</p>
                    <p>点赞数：{item.like_count}</p>
                  </Flex>
                </Flex>
              </Flex>
            </List.Item>
          )}
        />
      </Flex>
    </Card>
  )
}

export default CommentsPanel
