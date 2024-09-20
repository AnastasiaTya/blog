import { Outlet, Link } from 'react-router-dom'

import styles from './Header.module.scss'

function Header() {
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
          <button type="button" className={styles.btnIn}>
            Sign In
          </button>
          <button type="button" className={styles.btnUp}>
            Sign Up
          </button>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Header
