import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

import ArticlesPage from './pages/ArticlesPage'
import ArticlePage from './pages/ArticlePage'
import Header from './components/Header'
import './App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route path="/" element={<ArticlesPage />} />
      <Route path="/article" element={<ArticlesPage />} />
      <Route path="/article/:slug" element={<ArticlePage />} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
