import React from 'react'
import style from "./Navbar.module.css"
import Searchbar from '../Searchbar/Searchbar'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate=useNavigate()
  return (
    <nav className={style.nav}>
        <h3
            onClick={()=>{
                navigate("/")
            }}
        >
            <Link
                to={"/"}
            >
                Country-API
            </Link>
        </h3>
        <div className={style.searchBoxContainer}>
        <Searchbar
            width={200}
        />
        </div>
    </nav>
  )
}

export default Navbar