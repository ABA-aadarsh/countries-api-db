import React from 'react'
import SinglePage from './pages/SinglePage/SinglePage'
import 'react-loading-skeleton/dist/skeleton.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App