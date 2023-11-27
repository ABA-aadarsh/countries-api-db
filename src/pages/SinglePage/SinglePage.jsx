import React, { useEffect, useState } from 'react'
import style from "./SinglePage.module.css"
import CountryPreview from '../../components/CountryPreview'
import { useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'

function SinglePage() {
    const {code}=useParams()
    const [data,setData]=useState(null)

    const [loading,setLoading]=useState(true)
    const getData=async (code)=>{
        const url=`https://restcountries.com/v3.1/alpha/${code}?`
        try{
            const res=await fetch(url)

            if(res.status==200){
                const data=(await res.json())[0]
                setData(
                    {
                        coatOfArm: data.coatOfArms.svg,
                        officialName: data.name.official,
                        commonName: data.name.common,
                        map: data.maps.googleMaps,
                        language: (typeof(data.languages)=="object")?Object.values(data.languages)[0]: "None",
                        timeZone: typeof(data.timezones)=="string"?data.timezones:data.timezones[0],
                        capital: data.capital || "None",
                        landlocked: data.landlocked,
                        independent: data.independent,
                        latlng: data.latlng,
                        population: data.population,
                        currency: (typeof(data.currencies)=="object")?Object.values(data.currencies)[0]: {name:"None",symbol:"-"},
                        continents: data.continents,
                        area: data.area,
                        borderCountries: data.borders || [],
                        flag: data.flags.svg,
                        flagInfo: data.flags.alt
                    }
                )
            }else{
                console.log("No such country")
            }

        }catch(err){
            console.log(err)
            console.log("Error occured while fetching")
        }
        setLoading(false)
    }
    useEffect(()=>{
        getData(code)
        return ()=>{
            setData(null)
        }
    },[code])

  return (!loading && data!=null) && (
    <div className={style.mainContainer}>
        <div className={style.box1}>
            {/* country info */}
            <div className={style.flagContainer}>
                <div className={style.centerContainer}>
                    <img src={data.flag} alt="" 
                        className={style.flag}
                    />
                    <h3
                        className={style.flagTitle}
                    >{data.commonName}</h3>
                    <p
                        className={style.flagInfo}
                    >
                        {data.flagInfo}
                    </p>
                </div>
            </div>
            <div className={style.detailInfo}>
                <div className={style.heading}>
                    <h1
                        className={style.officialName}
                    >{data.officialName}</h1>
                    <div className={style.coatContainer}>
                        <img src={data.coatOfArm} alt="Coat" 
                            className={style.coat}
                        />
                    </div>
                    
                </div>
                <div className={style.infos}>
                    <div className={style.datas}>
                        <span>Capital</span>
                        <span>:</span>
                        <span>{data.capital}</span>
                        </div>
                    <div className={style.datas}>
                        <span>Independent</span>
                        <span>:</span>
                        <span>{data.independent?"Yes":"No"}</span>
                        </div>
                    <div className={style.datas}>
                        <span>Continent</span>
                        <span>:</span>
                        <span>{data.continents.join(", ")}</span>
                        </div>
                    <div className={style.datas}>
                        <span>Language</span>
                        <span>:</span>
                        <span>{data.language}</span>
                        </div>
                    <div className={style.datas}>
                        <span>Population</span>
                        <span>:</span>
                        <span>{data.population}</span>
                        </div>
                    <div className={style.datas}>
                        <span>Area</span>
                        <span>:</span>
                        <span>{data.area} .sq .km</span>
                        </div>
                    <div className={style.datas}>
                        <span>Latitude</span>
                        <span>:</span>
                        <span>{data.latlng[0]}</span>
                        </div>
                    <div className={style.datas}>
                        <span>Longitude</span>
                        <span>:</span>
                        <span>{data.latlng[1]}</span>
                        </div>
                    <div className={style.datas}>
                        <span>Landlocked</span>
                        <span>:</span>
                        <span>{data.landlocked?"Yes":"No"}</span>
                        </div>
                    <div className={style.datas}>
                        <span>Time-zone</span>
                        <span>:</span>
                        <span>{data.timeZone}</span>
                        </div>
                    <div className={style.datas}>
                        <span>Currency</span>
                        <span>:</span>
                        <span>{data.currency.name} ({data.currency.symbol})</span>
                        </div>
                </div>
            </div>
        </div>
        <div className={style.box2}>
            {/* border countries */}
            <h2
                style={{textAlign:"center"}}
            >Border Countries</h2>
            <div className={style.borderCountriesContainer}>
                {
                    data.borderCountries.map(c=>(
                        <CountryPreview
                            key={c}
                            code={c}
                        />
                    ))
                }
            </div>
        </div>
        <div className={style.mapContainer}>
            {/* google map */}
            <h3>See on Map</h3>
            <iframe style={{width:"100%",height:"400px", margin:"0px",border:"0px"}}   id="gmap_canvas" src={`https://maps.google.com/maps?width=520&height=400&hl=en&q=%20${data.capital}+()&t=&z=4&ie=UTF8&iwloc=B&output=embed`}></iframe>

        </div>
    </div>
  )
}

export default SinglePage