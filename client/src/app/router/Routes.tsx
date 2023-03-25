import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import AboutPage from "../../features/about/AboutPage";
import HomePage from "../../features/home/HomePage";
import PostDetail from '../../features/post/PostDetail';
import Posts from './../../features/post/Posts';
import ContactPage from "../../features/contact/ContactPage";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";

export const router = createBrowserRouter([
  {
      path: '/',
      element: <App />,
      children: [
          {path: '', element: <HomePage />},
          {path: 'post', element: <Posts />},
          {path: 'post/:id', element: <PostDetail />},
          {path: 'about', element: <AboutPage />},
          { path: 'contact', element: <ContactPage /> },
          {path: 'server-error', element: <ServerError />},
          {path: 'not-found', element: <NotFound />},
          {path: '*', element: <Navigate replace to='/not-found' />}
      ]
  }
])