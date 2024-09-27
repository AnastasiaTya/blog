import { Link, useParams } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { useEffect } from 'react'
import Markdown from 'react-markdown'

import { fetchArticle, onLoading } from '../store/slice/ArticlesSlice'
import { useAppDispatch, useAppSelector } from '../hook'
import DeleteBtn from '../components/DeleteBtn'

import styles from './Pages.module.scss'

const ArticlePage = () => {
  const article = useAppSelector((state) => state.articles.article)
  const user = useAppSelector((state) => state.user.user.username)
  const { slug } = useParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(onLoading())
    dispatch(fetchArticle(slug))
    // return () => {
    //   dispatch(removeArticle())
    // }
  }, [slug, dispatch])

  if (!article) return null

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.infoWrapper}>
          <div className={styles.info}>
            <div className={styles.titleWrap}>
              <Link to="/article" className={styles.title}>
                {article.title}
              </Link>
              <svg
                // onClick={handleLikeClick} // добавляем обработчик клика
                width="16"
                height="16"
                viewBox="0 0 16 16"
                // fill={isLiked ? 'red' : 'none'} // меняем цвет при клике
                xmlns="http://www.w3.org/2000/svg"
                style={{ cursor: 'pointer' }} // стиль указателя
              >
                <g clipPath="url(#clip0_478_1295)">
                  <path
                    d="M7.99998 15.1099C7.7722 15.1099 7.5526 15.0273 7.38146 14.8774C6.73509 14.3123 6.11193 13.7811 5.56212 13.3126L5.55932 13.3102C3.94738 11.9365 2.55542 10.7502 1.58691 9.58167C0.504271 8.27527 0 7.03662 0 5.68347C0 4.36877 0.450805 3.15588 1.26928 2.26807C2.09753 1.36975 3.234 0.875 4.46972 0.875C5.3933 0.875 6.23912 1.16699 6.98363 1.7428C7.35936 2.03345 7.69994 2.38916 7.99998 2.80408C8.30016 2.38916 8.64061 2.03345 9.01646 1.7428C9.76097 1.16699 10.6068 0.875 11.5304 0.875C12.766 0.875 13.9026 1.36975 14.7308 2.26807C15.5493 3.15588 16 4.36877 16 5.68347C16 7.03662 15.4958 8.27527 14.4132 9.58154C13.4447 10.7502 12.0528 11.9364 10.4411 13.3099C9.89036 13.7792 9.26622 14.3112 8.61839 14.8777C8.44737 15.0273 8.22765 15.1099 7.99998 15.1099V15.1099ZM4.46972 1.81226C3.49889 1.81226 2.60705 2.19971 1.95825 2.90332C1.2998 3.61755 0.937132 4.60486 0.937132 5.68347C0.937132 6.82153 1.3601 7.83936 2.30847 8.98364C3.22509 10.0897 4.58849 11.2516 6.1671 12.5969L6.17003 12.5994C6.72191 13.0697 7.34752 13.6029 7.99864 14.1722C8.65367 13.6018 9.28026 13.0677 9.83323 12.5967C11.4117 11.2513 12.775 10.0897 13.6916 8.98364C14.6399 7.83936 15.0628 6.82153 15.0628 5.68347C15.0628 4.60486 14.7002 3.61755 14.0417 2.90332C13.393 2.19971 12.5011 1.81226 11.5304 1.81226C10.8192 1.81226 10.1662 2.03833 9.5897 2.48413C9.07591 2.88159 8.718 3.38403 8.50816 3.7356C8.40025 3.91638 8.21031 4.02429 7.99998 4.02429C7.78966 4.02429 7.59972 3.91638 7.49181 3.7356C7.28209 3.38403 6.92418 2.88159 6.41027 2.48413C5.83373 2.03833 5.18078 1.81226 4.46972 1.81226V1.81226Z"
                    // fill={isLiked ? 'red' : 'black'} // цвет сердца в зависимости от состояния
                  />
                </g>
                <defs>
                  <clipPath id="clip0_478_1295">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className={styles.hearts}>{article.favoritesCount}</span>
            </div>
            <div className={styles.tagWrap}>
              {article.tagList?.map((tag) => {
                if (!tag) {
                  return null
                }
                return (
                  <button type="button" key={nanoid(6)} disabled className={styles.tag}>
                    {tag}
                  </button>
                )
              })}
            </div>
          </div>
          <div className={styles.personInfo}>
            <div className={styles.person}>
              <h2 className={styles.personName}>{article.author.username}</h2>
              <span className={styles.date}>
                {new Date(article.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <img src={article.author.image} alt="avatar" className={styles.img} />
          </div>
        </div>
        <div className={styles.description}>
          <p className={styles.text}>{article.description}</p>
          {article.author.username === user && (
            <div className={styles.myBtn}>
              <DeleteBtn slug={article.slug} />
              <button type="button" className={styles.editBtn}>
                <Link to={`/article/${article.slug}/edit`}>Edit</Link>
              </button>
            </div>
          )}
        </div>
        <Markdown className={styles.body}>{article.body}</Markdown>
      </div>
    </div>
  )
}
export default ArticlePage
