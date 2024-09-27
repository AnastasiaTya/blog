/* eslint-disable react/jsx-props-no-spreading */
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../hook'
import { loginUser, clearError, clearSuccess, changeAuth } from '../../store/slice/UserSlice'

import styles from './SignIn.module.scss'

type Inputs = {
  email: string
  password: string
}

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { error, success } = useAppSelector((state) => state.user)

  useEffect(() => {
    if (!error && success) {
      navigate('/article')
    }
    return () => {
      dispatch(clearSuccess())
    }
  }, [error, success, navigate])

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(clearError())
    dispatch(loginUser(data))
    dispatch(changeAuth(true))
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Sign In</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email" className={styles.label}>
            Email address
          </label>
          <input
            type="email"
            placeholder="Email address"
            id="email"
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
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            className={errors.password ? styles.inputError : styles.input}
            {...register('password', {
              required: 'Password is required',
            })}
          />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          <button type="submit" className={styles.btn}>
            Login
          </button>
        </form>
        <div className={styles.signIn}>
          Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
        </div>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  )
}

export default SignIn
