import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/layout/App'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/Routes'
import { Provider } from 'react-redux'
import { store } from './app/store/configureStore'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>

      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>,
)
