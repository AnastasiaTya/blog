import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import { useAppSelector, useAppDispatch } from '../hook'
import ArticleAction from '../components/ArticleAction'
import { removeArticle } from '../store/slice/ArticlesSlice'

const EditArticle = () => {
  const article = useAppSelector((state) => state.articles.article)
  const { pathname } = useLocation()

  const dispatch = useAppDispatch()

  useEffect(() => {
    const isEdit = pathname.includes('/edit')
    if (!isEdit) {
      dispatch(removeArticle())
    }
  }, [dispatch, pathname])

  return <ArticleAction title="Edit article" article={article} isEdit />
}

export default EditArticle
