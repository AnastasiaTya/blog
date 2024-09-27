import React from 'react'
import { useNavigate } from 'react-router-dom'
import type { PopconfirmProps } from 'antd'
import { Button, message, Popconfirm } from 'antd'

import { useAppDispatch } from '../../hook'
import { deleteArticle } from '../../store/slice/ArticleSlice'

interface DeleteBtnProps {
  slug: string
}

const DeleteBtn: React.FC<DeleteBtnProps> = ({ slug }) => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const confirm: PopconfirmProps['onConfirm'] = () => {
    dispatch(deleteArticle(slug))
    message.success('Successfully deleted')
    navigate('/article')
  }

  const cancel: PopconfirmProps['onCancel'] = () => {
    message.error('Canceling the deletion')
  }

  return (
    <Popconfirm
      title="Delete the article"
      description="Are you sure you want to delete this article?"
      placement="right"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <Button danger>Delete</Button>
    </Popconfirm>
  )
}

export default DeleteBtn
