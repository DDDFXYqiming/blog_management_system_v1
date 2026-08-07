import { createBrowserRouter } from 'react-router-dom'
import { AuthRoute } from '@/components/AuthRoute'
import Layout from '@/pages/Layout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Article from '@/pages/Article'
import ArticleDetail from '@/pages/ArticleDetail'
import Publish from '@/pages/Publish'
import MyHomepage from '@/pages/MyHomepage'
import Settings from '@/pages/Settings'
import ProfileDetails from '@/pages/Settings/component/ProfileDetails'
import PasswordSecurity from '@/pages/Settings/component/PasswordSecurity'
import PrivacySettings from '@/pages/Settings/component/PrivacySettings'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      { path: '/', element: <Home /> },
      { path: 'article', element: <Article /> },
      { path: 'publish', element: <Publish /> },
      { path: 'myhomepage', element: <MyHomepage /> },
      { path: 'articleDetailLayout', element: <ArticleDetail /> },
      {
        path: 'settings',
        element: <Settings />,
        children: [
          { path: 'profileDetails', element: <ProfileDetails /> },
          { path: 'privacySettings', element: <PrivacySettings /> },
          { path: 'passwordSecurity', element: <PasswordSecurity /> },
        ],
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
])

export default router
