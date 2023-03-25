import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/layout/App'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/Routes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
