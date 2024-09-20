import { Pagination as PaginationComponent } from 'antd'
import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../hook'
import { fetchArticles, onLoading, pageChange } from '../../store/slice/ArticlesSlice'

import styles from './Pagination.module.scss'

const Pagination: React.FC = () => {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector((state) => state.articles.page)
  const handleChange = (page: number) => {
    dispatch(pageChange(page))
    window.scrollTo(0, 0)
  }
  useEffect(() => {
    dispatch(onLoading())
    dispatch(fetchArticles((currentPage - 1) * 20))
  }, [currentPage, dispatch])
  return (
    <PaginationComponent
      align="center"
      current={currentPage}
      total={100}
      pageSize={20}
      onChange={handleChange}
      className={styles.pagination}
      showSizeChanger={false}
    />
  )
}

export default Pagination
