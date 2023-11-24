import React from 'react'
import SinglePage from './pages/SinglePage/SinglePage'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Outlet/>
    </>
  )
}

export default App