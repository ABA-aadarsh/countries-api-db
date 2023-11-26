import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import SinglePage from './pages/SinglePage/SinglePage.jsx'
import Home from './pages/Home/Home.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route
        path='country/:code' element={
          <SinglePage/>
        }
      />
      <Route
        path=''
        element={<Home/>}
      />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider
    router={router}
  />
)
