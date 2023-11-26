import React, { useEffect, useRef, useState } from 'react'
import style from "./Searchbar.module.css"
import { useNavigate } from 'react-router-dom'

function Searchbar() {
    const [result,setResult]=useState([])
    const navigate=useNavigate()
    const [inputValue,setInputValue]=useState("")
    const [showResults,setShowResults]=useState(false)
    const ref=useRef(null)
    const getSearchData=async (inputValue)=>{
        const url=`https://restcountries.com/v3.1/name/${inputValue}?fields=name,flag,cca3`
        const res=await fetch(url)
        if(res.status==200){
            const data=await res.json()
            setResult([...data])
            setShowResults(true)
        }else{
            setResult([])
        }
    }
    useEffect(()=>{
        const searchOptionShow=(e)=>{
            if (e.target !== ref.current && !ref.current.contains(e.target)) {
                setShowResults(false)
            }
        }
        document.addEventListener("click",searchOptionShow)

        return ()=>{
            document.removeEventListener("click",searchOptionShow)
        }
    },[])
    useEffect(()=>{
        if(inputValue!=""){
            getSearchData(inputValue)
        }
        setResult([])
    },[inputValue])
  return (
    <div className={style.searchBarContainer}
        ref={ref}
    >
        <div className={style.searchbar}>
            <input type="text" 
                placeholder='Search Country'
                value={inputValue}
                onChange={(e)=>setInputValue(e.target.value)}
                className={style.input}
                
            />
        </div>
        <div className={style.box}
            style={{
                display:showResults?"unset":"none"
            }}
        >
            <div className={style.resultsContainer}
                
            >
                {   (result.length!=0) &&
                    <>
                        {result.splice(0,5).map(r=>(
                            <div key={r.name.common}
                                className={style.result}
                                onClick={()=>{
                                    // console.log(r.tld)
                                    setInputValue("")
                                    navigate(`country/${r.cca3}`)
                                }}
                            >
                                <span>{r.flag}</span>
                                <span>{r.name.common}</span>
                            </div>
                        ))}
                    </>
                    
                }
            </div>
            {
                result.length>6 && 
                <div
                    className={style.showMoreResults}
                >
                    Show All Results
                </div>
            }
        </div>
    </div>
  )
}

export default Searchbar