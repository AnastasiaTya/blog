import { Outlet, Link, useNavigate } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from '../../hook'
import { changeAuth } from '../../store/slice/UserSlice'
import unnamed from '../../assets/unnamed.jpg'

import styles from './PrivateHeader.module.scss'

function PrivateHeader() {
  const user = useAppSelector((state) => state.user.user)
  const dispatch = useAppDispatch()
  const handleClick = () => {
    window.scrollTo(0, 0)
  }
  const navigate = useNavigate()
  const logOutChange = () => {
    dispatch(changeAuth(false))
    localStorage.removeItem('token')
    navigate('/sign-in')
  }
  return (
    <>
      <div className={styles.wrapper}>
        <Link to="/article" className={styles.title} onClick={handleClick}>
          Realworld Blog
        </Link>
        <div className={styles.flexBtn}>
          <Link to="/new-article" className={styles.btnCreate}>
            Create article
          </Link>
          <Link to="/profile" className={styles.btnUser}>
            {user.username}
          </Link>
          {user.image && <img src={user.image} alt="avatar" className={styles.img} />}
          {!user.image && <img src={unnamed} alt="avatar" className={styles.img} />}
          <Link to="/sign-in" className={styles.btnOut} onClick={logOutChange}>
            Log Out
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default PrivateHeader
