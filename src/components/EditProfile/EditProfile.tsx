/* eslint-disable react/jsx-props-no-spreading */
import { useForm, SubmitHandler } from 'react-hook-form'
import { notification } from 'antd'
import { useEffect, useState } from 'react'

import { useAppSelector, useAppDispatch } from '../../hook'
import { clearError, updateUser, clearUpdateSuccess } from '../../store/slice/UserSlice'

import styles from './EditProfile.module.scss'

type Inputs = {
  username: string
  email: string
  password: string
  image: string
}

const EditProfile = () => {
  const [showNotifications, setShowNotifications] = useState(false)
  const { user, updateSuccess } = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  useEffect(() => {
    if (showNotifications && updateSuccess !== null) {
      if (updateSuccess) {
        notification.success({
          message: 'Update Successful',
          description: 'You have successfully edit your profile!',
          placement: 'top',
        })
        dispatch(clearUpdateSuccess())
        dispatch(clearError())
      } else {
        notification.error({
          message: 'Update Failed',
          description: 'Update failed, please try again.',
          placement: 'top',
        })
        dispatch(clearUpdateSuccess())
        dispatch(clearError())
      }
      setShowNotifications(false)
    }
  }, [updateSuccess, showNotifications, dispatch])

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(updateUser(data))
    setShowNotifications(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Edit Profile</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username" className={styles.label}>
            Username
          </label>
          <input
            type="text"
            defaultValue={user.username}
            id="username"
            className={errors.username ? styles.inputError : styles.input}
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters',
              },
            })}
          />
          {errors.username && <p className={styles.error}>{errors.username.message}</p>}
          <label htmlFor="email" className={styles.label}>
            Email address
          </label>
          <input
            type="email"
            defaultValue={user.email}
            id="email"
            autoComplete="off"
            className={errors.email ? styles.inputError : styles.input}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-z][a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          <label htmlFor="password" className={styles.label}>
            New password
          </label>
          <input
            type="password"
            placeholder="New password"
            id="password"
            className={errors.password ? styles.inputError : styles.input}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
              maxLength: {
                value: 40,
                message: 'Password must be less than 40 characters',
              },
            })}
          />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          <label htmlFor="repeatPassword" className={styles.label}>
            Avatar image (url)
          </label>
          <input
            type="url"
            defaultValue={user.image}
            id="repeatPassword"
            className={errors.image ? styles.inputError : styles.input}
            {...register('image', {
              required: 'Avatar image is required',
            })}
          />
          {errors.image && <p className={styles.error}>{errors.image.message}</p>}
          <div className={styles.line} />
          <button type="submit" className={styles.btn}>
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
