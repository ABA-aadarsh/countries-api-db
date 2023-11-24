import React, { useEffect, useState } from 'react'
import style from "./SinglePage.module.css"
import CountryPreview from '../../components/CountryPreview'
import { useParams } from 'react-router-dom'

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
                        language: Object.values(data.languages)[0],
                        timeZone: data.timezones,
                        capital: data.capital,
                        landlocked: data.landlocked,
                        independent: data.independent,
                        latlng: data.latlng,
                        population: data.population,
                        currency: Object.values(data.currencies)[0],
                        continents: data.continents,
                        area: data.area,
                        borderCountries: data.borders,
                        flag: data.flags.svg
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

    // useEffect(()=>{
    //     console.log(data)
    // },[data])
  return (!loading && data!=null) && (
    <div className={style.mainContainer}>
        <div className={style.box1}>
            {/* country info */}
            <div className={style.flagContainer}>
                <img src={data.flag} alt="" 
                    className={style.flag}
                />
                <h3
                    className={style.flagTitle}
                >{data.commonName}</h3>
            </div>
            <div className={style.detailInfo}>
                <div className={style.heading}>
                    <h1
                        className={style.officialName}
                    >{data.officialName}</h1>
                    <img src={data.coatOfArm} alt="Coat" 
                        className={style.coat}
                    />
                </div>
                <div>
                    <div><span>Capital : {data.capital}</span></div>
                    <div><span>Independent : {data.independent?"Yes":"No"}</span></div>
                    <div><span>Continent : {data.continents.join(", ")}</span></div>
                    <div><span>Language : {data.language}</span></div>
                    <div><span>Population : {data.population}</span></div>
                    <div><span>Area : {data.area} .sq .km</span></div>
                    <div><span>Latitude : {data.latlng[0]}</span></div>
                    <div><span>Longitude : {data.latlng[1]}</span></div>
                    <div><span>Landlocked : {data.landlocked?"Yes":"No"}</span></div>
                    <div><span>Time-zone : {data.timeZone}</span></div>
                    <div><span>Currency : {data.currency.name} ({data.currency.symbol})</span></div>
                </div>
            </div>
        </div>
        <div>
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
            <iframe style={{width:"100%",height:"400px"}} frameborder="0"  marginheight="0" marginwidth="0" id="gmap_canvas" src={`https://maps.google.com/maps?width=520&height=400&hl=en&q=%20${data.capital}+()&t=&z=4&ie=UTF8&iwloc=B&output=embed`}></iframe>

        </div>
    </div>
  )
}

export default SinglePage