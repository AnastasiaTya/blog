/* eslint-disable react/jsx-props-no-spreading */
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'

import { useAppDispatch } from '../../hook'
import { createArticle, updateArticle } from '../../store/slice/ArticleSlice'
import { removeArticle } from '../../store/slice/ArticlesSlice'

import styles from './ArticleAction.module.scss'

type Inputs = {
  title: string
  description: string
  body: string
  tags: string[]
}

const ArticleAction = ({ title, article, isEdit }) => {
  const [tags, setTags] = useState(
    article ? article.tagList.map((tag, index) => ({ id: index + 1, value: tag })) : [{ id: 1, value: '' }]
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: article?.title || '',
      description: article?.description || '',
      body: article?.body || '',
    },
  })

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const handleAddTag = () => {
    setTags([...tags, { id: tags.length + 1, value: '' }])
  }

  const handleRemoveTag = (id: number) => {
    setTags(tags.filter((tag) => tag.id !== id))
  }

  const handleTagChange = (id: number, value: string) => {
    setTags(tags.map((tag) => (tag.id === id ? { ...tag, value } : tag)))
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const tagValues = tags.map((tag) => tag.value).filter((tag) => tag)
    dispatch(removeArticle())
    if (isEdit) {
      dispatch(updateArticle({ data: { ...data, tagList: tagValues }, slug: article.slug }))
      navigate('/article')
    } else {
      dispatch(createArticle({ ...data, tagList: tagValues }))
      navigate('/article')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{title}</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            type="text"
            placeholder="Title"
            id="title"
            className={errors.title ? styles.inputError : styles.input}
            {...register('title', {
              required: 'Title is required',
            })}
          />
          {errors.title && <p className={styles.error}>{errors.title.message}</p>}
          <label htmlFor="description" className={styles.label}>
            Short description
          </label>
          <input
            type="text"
            placeholder="Description"
            id="description"
            autoComplete="off"
            className={errors.description ? styles.inputError : styles.input}
            {...register('description', {
              required: 'Description is required',
            })}
          />
          {errors.description && <p className={styles.error}>{errors.description.message}</p>}
          <label htmlFor="text" className={styles.label}>
            Text
          </label>
          <textarea
            placeholder="Text"
            id="text"
            className={errors.body ? styles.textareaError : styles.textarea}
            {...register('body', {
              required: 'Text is required',
            })}
          />
          {errors.body && <p className={styles.error}>{errors.body.message}</p>}
          <label htmlFor="tags" className={styles.label}>
            Tags
          </label>
          {tags.map((tag) => (
            <div className={styles.tags} key={tag.id}>
              <input
                type="text"
                placeholder="Tag"
                value={tag.value}
                onChange={(e) => handleTagChange(tag.id, e.target.value)}
                className={styles.tag}
              />
              <button type="button" className={styles.btnRemoveTag} onClick={() => handleRemoveTag(tag.id)}>
                Delete
              </button>
            </div>
          ))}
          <button type="button" className={styles.btnAddTag} onClick={handleAddTag}>
            Add tag
          </button>
          <button type="submit" className={styles.btn}>
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default ArticleAction

// /* eslint-disable react/jsx-props-no-spreading */
// import { useNavigate, useLocation } from 'react-router-dom'
// import { useForm, SubmitHandler } from 'react-hook-form'
// import { useState, useEffect } from 'react'

// import { useAppDispatch, useAppSelector } from '../../hook'
// import { createArticle, updateArticle } from '../../store/slice/ArticleSlice'
// import { removeArticle } from '../../store/slice/ArticlesSlice'

// import styles from './ArticleAction.module.scss'

// type Inputs = {
//   title: string
//   description: string
//   body: string
//   tags: string[]
// }

// const ArticleAction = ({ title }) => {
//   const article = useAppSelector((state) => state.articles.article)
//   const [tags, setTags] = useState(
//     article ? article.tagList.map((tag, index) => ({ id: index + 1, value: tag })) : [{ id: 1, value: '' }]
//   )

//   const { pathname } = useLocation()

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Inputs>({
//     defaultValues: {
//       title: article?.title || '',
//       description: article?.description || '',
//       body: article?.body || '',
//     },
//   })

//   const dispatch = useAppDispatch()

//   const navigate = useNavigate()

//   useEffect(() => {
//     const isEdit = pathname.includes('/edit')
//     if (!isEdit) {
//       dispatch(removeArticle())
//     }
//   }, [dispatch, pathname])

//   const handleAddTag = () => {
//     setTags([...tags, { id: tags.length + 1, value: '' }])
//   }

//   const handleRemoveTag = (id: number) => {
//     setTags(tags.filter((tag) => tag.id !== id))
//   }

//   const handleTagChange = (id: number, value: string) => {
//     setTags(tags.map((tag) => (tag.id === id ? { ...tag, value } : tag)))
//   }

//   const onSubmit: SubmitHandler<Inputs> = (data) => {
//     const tagValues = tags.map((tag) => tag.value).filter((tag) => tag)
//     const isEdit = pathname.includes('/edit')
//     dispatch(removeArticle())
//     if (isEdit) {
//       dispatch(updateArticle({ data: { ...data, tagList: tagValues }, slug: article.slug }))
//       navigate('/article')
//     } else {
//       dispatch(createArticle({ ...data, tagList: tagValues }))
//       navigate('/article')
//     }
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.wrapper}>
//         <h2 className={styles.title}>{title}</h2>
//         <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
//           <label htmlFor="title" className={styles.label}>
//             Title
//           </label>
//           <input
//             type="text"
//             placeholder="Title"
//             id="title"
//             className={errors.title ? styles.inputError : styles.input}
//             {...register('title', {
//               required: 'Title is required',
//             })}
//           />
//           {errors.title && <p className={styles.error}>{errors.title.message}</p>}
//           <label htmlFor="description" className={styles.label}>
//             Short description
//           </label>
//           <input
//             type="text"
//             placeholder="Description"
//             id="description"
//             autoComplete="off"
//             className={errors.description ? styles.inputError : styles.input}
//             {...register('description', {
//               required: 'Description is required',
//             })}
//           />
//           {errors.description && <p className={styles.error}>{errors.description.message}</p>}
//           <label htmlFor="text" className={styles.label}>
//             Text
//           </label>
//           <textarea
//             placeholder="Text"
//             id="text"
//             className={errors.body ? styles.textareaError : styles.textarea}
//             {...register('body', {
//               required: 'Text is required',
//             })}
//           />
//           {errors.body && <p className={styles.error}>{errors.body.message}</p>}
//           <label htmlFor="tags" className={styles.label}>
//             Tags
//           </label>
//           {tags.map((tag) => (
//             <div className={styles.tags} key={tag.id}>
//               <input
//                 type="text"
//                 placeholder="Tag"
//                 value={tag.value}
//                 onChange={(e) => handleTagChange(tag.id, e.target.value)}
//                 className={styles.tag}
//               />
//               <button type="button" className={styles.btnRemoveTag} onClick={() => handleRemoveTag(tag.id)}>
//                 Delete
//               </button>
//             </div>
//           ))}
//           <button type="button" className={styles.btnAddTag} onClick={handleAddTag}>
//             Add tag
//           </button>
//           <button type="submit" className={styles.btn}>
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default ArticleAction
