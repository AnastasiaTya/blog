import { useEffect } from 'react'

import { fetchArticles } from '../../store/slice/ArticlesSlice'
import Article from '../Article'
import { useAppDispatch, useAppSelector } from '../../hook'

import styles from './Articles.module.scss'

function Articles() {
  const dispatch = useAppDispatch()
  const articles = useAppSelector((state) => state.articles.articles)
  useEffect(() => {
    dispatch(fetchArticles(0))
  }, [dispatch])
  return (
    <div className={styles.wrapper}>
      {articles.map((article) => (
        <Article key={article.slug} article={article} />
      ))}
    </div>
  )
}

export default Articles
