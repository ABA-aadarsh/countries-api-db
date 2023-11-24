import React, { useEffect, useState } from 'react'
import style from "./CountryPreview.module.css"
import { Link } from 'react-router-dom'

function CountryPreview({code}) {
    const [data,setData]=useState({})
    const [loading,setLoading]=useState(true)
    const getFlagAndName=async (code)=>{
        const url=`https://restcountries.com/v3.1/alpha/${code}?fields=flags,name`
        try{
            const res=await fetch(url)
            if(res.status!=404){
                const data=(await res.json())
                setData(
                    {
                        flag: data.flags.svg,
                        name: data.name.common
                    }
                )

            }else{
                console.log("No such country")
            }
        }catch(err){
            console.log(err)
            console.log("Error in fetching preview data")
        }
        setLoading(false)
    }
    useEffect(()=>{
        getFlagAndName(code)
    },[])
  return !loading && (
    <div className={style.container}>
        <Link 
            to={`/country/${code}`}
        >
            <div
                className={style.imgContainer}
            >
                <img src={data.flag} alt="" 
                    className={style.img}
                />
            </div>
            <h3
                className={style.name}
            >{data.name}</h3>
        </Link>
    </div>
  )
}

export default CountryPreview