import React from 'react'
import SinglePage from './pages/SinglePage/SinglePage'
import 'react-loading-skeleton/dist/skeleton.css'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Outlet/>
    </>
  )
}

export default App