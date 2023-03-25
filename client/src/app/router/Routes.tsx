import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import AboutPage from "../../features/about/AboutPage";
import HomePage from "../../features/home/HomePage";
import PostDetail from '../../features/post/PostDetail';
import Posts from './../../features/post/Posts';
import ContactPage from "../../features/contact/ContactPage";

export const router = createBrowserRouter([
  {
      path: '/',
      element: <App />,
      children: [
          {path: '', element: <HomePage />},
          {path: 'post', element: <Posts />},
          {path: 'post/:id', element: <PostDetail />},
          {path: 'about', element: <AboutPage />},
          {path: 'contact', element: <ContactPage />},
      ]
  }
])