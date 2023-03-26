import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import AboutPage from "../../features/about/AboutPage";
import HomePage from "../../features/home/HomePage";
import PostDetail from '../../features/post/PostDetail';
import Posts from './../../features/post/Posts';
import ContactPage from "../../features/contact/ContactPage";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import Register from "../../features/account/Register";
import Login from "../../features/account/Login";
import AdminPage from "../../features/Admin/AdminPage";
import RequireAuth from "./RequireAuth";

export const router = createBrowserRouter([
  {
      path: '/',
      element: <App />,
    children: [
      {element: <RequireAuth />, children: [
        {path: 'adminpage', element: <AdminPage />},
    ]},
          {path: '', element: <HomePage />},
          {path: 'post', element: <Posts />},
          {path: 'post/:id', element: <PostDetail />},
          {path: 'about', element: <AboutPage />},
          { path: 'contact', element: <ContactPage /> },
          {path: 'server-error', element: <ServerError />},
        { path: 'not-found', element: <NotFound /> },
        {path: 'login', element: <Login />},
        {path: 'register', element: <Register />},
          {path: '*', element: <Navigate replace to='/not-found' />}
      ]
  }
])