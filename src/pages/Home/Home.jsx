import React, { useEffect, useState } from 'react'
import style from "./Home.module.css"
import CountryPreview from '../../components/CountryPreview'
import Searchbar from '../../components/Searchbar/Searchbar'

function Home() {
  const [data,setData]=useState([])
  const getAllData=async ()=>{
    const url=`https://restcountries.com/v3.1/all`
    const res=await fetch(url)
    if(res.status==200){
        const data=await res.json()
        setData([...data])
    }
  }
  useEffect(()=>{
    getAllData()
  },[])
  return (
    <div className={style.mainContainer}>
      <div className={style.rightBox}>
        <div className={style.searchBox}>
          <Searchbar
            storeData={setData}
            listShow={false}
          />
        </div>
        <div className={style.countryListContainer}>
          {
            data.map(i=>(
              <CountryPreview
                code={i.cca3}
                key={i.cca3}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Home