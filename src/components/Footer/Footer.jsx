import React from 'react'
import style from "./Footer.module.css"

function Footer() {
  return (
    <footer className={style.footer}>
        <div className={style.container1}>
            <span>This project is for learning purpose and has no commercial gain.</span>
            <span>API credit to <a href="https://restcountries.com/"
                style={{color:"#9696ff"}}
            >RESTCOUNTRIES</a></span>
        </div>
        <div></div>
    </footer>
  )
}

export default Footer