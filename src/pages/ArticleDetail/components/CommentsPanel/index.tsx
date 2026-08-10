import {
  Avatar,
  Button,
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
    <section className="comments-panel">
      <Flex align="center" justify="space-between" className="comments-header">
        <Flex align="center" gap="small">
          <h3 className="comments-title">评论</h3>
          <span className="comments-count">{commentsList.length}</span>
        </Flex>
        <Radio.Group
          options={[
            { label: '最热', value: 'hot' },
            { label: '最新', value: 'new' },
          ]}
          onChange={(e) => onCommentsGroupChange(e.target.value)}
          value={commentsValue}
          optionType="button"
          size="small"
        />
      </Flex>

      <Flex align="flex-start" gap="small" className="comment-input-row">
        <Avatar src={avatarUrl} size="default" />
        <Form
          form={form}
          style={{ width: '100%' }}
          onFinish={onCommentInputFinish}
          validateTrigger="onBlur"
        >
          <Flex justify="space-between" gap="middle" style={{ width: '100%' }}>
            <Form.Item
              name="inputContent"
              style={{ width: '100%' }}
              rules={[{ required: true, message: '请输入内容' }]}
            >
              <TextArea
                className="comment-input"
                showCount
                maxLength={200}
                placeholder="写下你的评论…"
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

      <Divider className="comments-divider" />

      {commentsList.length === 0 ? (
        <div className="comments-empty">还没有评论，来抢沙发吧</div>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={commentsList}
          renderItem={(item) => (
            <List.Item className="comment-item">
              <Flex align="flex-start" gap="small">
                <Avatar src={avatarUrl} size="large" />
                <Flex align="flex-start" vertical gap={4}>
                  <span className="comment-username">{item.username}</span>
                  <div className="comment-content">{item.content}</div>
                  <Flex gap="large" className="comment-meta">
                    <span>{item.pubdate}</span>
                    <span>点赞 {item.like_count}</span>
                  </Flex>
                </Flex>
              </Flex>
            </List.Item>
          )}
        />
      )}
    </section>
  )
}

export default CommentsPanel
