/* eslint-disable react/jsx-props-no-spreading */
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { notification } from 'antd'

import { createUser } from '../../services/index'

import styles from './CreateAccount.module.scss'

type Inputs = {
  username: string
  email: string
  password: string
  repeatPassword: string
  agreement: string
}

const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createUser(data)
      .then((res) => {
        if (res.status < 400) {
          notification.success({
            message: 'Registration Successful',
            description: 'You have successfully registered!',
            placement: 'top',
          })
          navigate('/sign-in')
        }
      })
      .catch(() => {
        notification.error({
          message: 'Registration Failed',
          description: 'Registration failed, please try again.',
          placement: 'top',
        })
      })
  }

  const password = watch('password')

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Create new account</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username" className={styles.label}>
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            className={errors.username ? styles.inputError : styles.input}
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'Username must be less than 20 characters',
              },
            })}
          />
          {errors.username && <p className={styles.error}>{errors.username.message}</p>}
          <label htmlFor="email" className={styles.label}>
            Email address
          </label>
          <input
            type="email"
            placeholder="Email address"
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
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
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
            Repeat Password
          </label>
          <input
            type="password"
            placeholder="Repeat Password"
            id="repeatPassword"
            className={errors.repeatPassword ? styles.inputError : styles.input}
            {...register('repeatPassword', {
              required: 'Repeat password is required',
              validate: (value) => value === password || 'Passwords do not match',
            })}
          />
          {errors.repeatPassword && <p className={styles.error}>{errors.repeatPassword.message}</p>}
          <div className={styles.line} />
          <label htmlFor="checkbox" className={styles.checkboxLabel}>
            <input
              type="checkbox"
              placeholder="Repeat Password"
              id="checkbox"
              className={styles.checkbox}
              {...register('agreement', { required: 'You must agree to the terms' })}
            />
            I agree to the processing of my personal information
          </label>
          {errors.agreement && <p className={styles.error}>{errors.agreement.message}</p>}
          <button type="submit" className={styles.btn}>
            Create
          </button>
        </form>
        <div className={styles.signIn}>
          Already have an account? <Link to="/sign-in">Sign In.</Link>
        </div>
      </div>
    </div>
  )
}

export default CreateAccount
