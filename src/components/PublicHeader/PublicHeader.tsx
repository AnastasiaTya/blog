import { Outlet, Link } from 'react-router-dom'

import styles from './PublicHeader.module.scss'

function PublicHeader() {
  const handleClick = () => {
    window.scrollTo(0, 0)
  }
  return (
    <>
      <div className={styles.wrapper}>
        <Link to="/article" className={styles.title} onClick={handleClick}>
          Realworld Blog
        </Link>
        <div>
          <Link to="/sign-in" className={styles.btnIn}>
            Sign In
          </Link>
          <Link to="/sign-up" className={styles.btnUp}>
            Sign Up
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default PublicHeader
