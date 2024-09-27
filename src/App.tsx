import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { changeAuth, getUser } from './store/slice/UserSlice'
import { useAppDispatch, useAppSelector } from './hook'
import ArticlesPage from './pages/ArticlesPage'
import CreateAccount from './components/CreateAccount'
import ArticlePage from './pages/ArticlePage'
import CreateArticle from './pages/CreateArticle'
import EditArticle from './pages/EditArticle'
import Header from './pages/Header'
import SignIn from './components/SignIn'
import EditProfile from './components/EditProfile'
import Loader from './components/Loader'
import './App.css'

const PrivateRoute = ({ isAuth, isAuthLoaded, children }) => {
  if (!isAuthLoaded) {
    return <Loader />
  }

  return isAuth ? children : <Navigate to="/sign-in" />
}

function App() {
  const isAuthenticated = !!localStorage.getItem('token')
  const isAuth = useAppSelector((state) => state.user.isAuth)
  const dispatch = useAppDispatch()
  const [isAuthLoaded, setIsAuthLoaded] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(changeAuth(true))
      dispatch(getUser()).then(() => setIsAuthLoaded(true))
    } else {
      setIsAuthLoaded(true)
    }
  }, [isAuthenticated, dispatch, isAuthLoaded])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Header isAuth={isAuth} />}>
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/article" element={<ArticlesPage />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
        <Route path="/sign-up" element={<CreateAccount />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute isAuth={isAuth} isAuthLoaded={isAuthLoaded}>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/new-article"
          element={
            <PrivateRoute isAuth={isAuth} isAuthLoaded={isAuthLoaded}>
              <CreateArticle />
            </PrivateRoute>
          }
        />
        <Route
          path="/article/:slug/edit"
          element={
            <PrivateRoute isAuth={isAuth} isAuthLoaded={isAuthLoaded}>
              <EditArticle />
            </PrivateRoute>
          }
        />
        <Route path="/sign-in" element={<SignIn />} />
      </Route>
    )
  )
  return <RouterProvider router={router} />
}

export default App
