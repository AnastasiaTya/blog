import { useAppSelector } from '../hook'
import Articles from '../components/Articles'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'

import styles from './Pages.module.scss'

function ArticlesPage() {
  const loading = useAppSelector((state) => state.articles.isLoading)
  return (
    <div className={styles.containerPage}>
      {loading && <Loader />}
      <Articles />
      <Pagination />
    </div>
  )
}

export default ArticlesPage
