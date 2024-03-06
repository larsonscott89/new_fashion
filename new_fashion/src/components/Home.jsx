import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import '../componentsStyles/home.css'

// SWIPER IMPORTS
import React, { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import {Autoplay, FreeMode, Pagination, Navigation } from 'swiper/modules';

export default function Home() {
  const navigate = useNavigate()
  let showItem = (id) => {
    navigate(`/drinklist/${id}`)
  }
  

  const [allDrinks, setAllDrinks] = useState([])

  useEffect(() => {
    const getDrinks = async () => {
      let response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink')
      const drinksArr = response.data.drinks

      console.log('drinks array', drinksArr)
      const randomArr = []

      for (let i = 0; i < 10; i++){
        let randomNum = Math.floor(Math.random() * drinksArr.length)
        // TODO: update code with check duplicate
        randomArr.push(drinksArr[randomNum])
      }
      console.log(randomArr)

      setAllDrinks(randomArr)
    }
    getDrinks()    
  }, [])

  return (
    <>
    <div>
      <h2 className="drink-of-day">Drinks of the day</h2>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {allDrinks.map((drink) => (
          <div className="drink-card" key={drink.idDrink}>
            {/* <p>{drink.strDrink}</p> */}
            <SwiperSlide onClick={()=> showItem(drink.idDrink)}><img src={drink.strDrinkThumb} alt='pic' /><p className="drink-name">{drink.strDrink}</p></SwiperSlide>
          </div>
        ))}
      </Swiper>
      </div>
      
      </>  
  )
}