import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/Root'
import ErrorPage from './ErrorPage'
import Contact from './routes/Contact'
import { action as rootAction, loader as rootLoader} from './routes/Root'
import { action as editAction } from './routes/Edit'
import Edit from './routes/Edit'
import { loader as contactLoader } from './routes/Contact'
import {Action as destroyAction} from './routes/Destroy'
import { Index } from './routes/Index'
const router = createBrowserRouter([
  {
    path:"/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children:[
      {
        element: <Index />,
        index:true
      },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>
      },
      {
        path: "contacts/:contactId/edit",
        element: <Edit />,
        loader: contactLoader,
        action:editAction
      },

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <RouterProvider router={router} />
  </React.StrictMode>,
)
