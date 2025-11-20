import React from 'react'
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import amzon from '../../../assets/brands/amazon.png';
import amzon_vector from '../../../assets/brands/amazon_vector.png';
import casio from '../../../assets/brands/casio.png';
import moonstar from '../../../assets/brands/moonstar.png';
import randstad from '../../../assets/brands/randstad.png';
import star from '../../../assets/brands/star.png';
import start_people from '../../../assets/brands/start_people.png';
import { Autoplay } from 'swiper/modules';

const brandLogos = [amzon, amzon_vector, casio, moonstar, randstad, star, start_people];

const Brands = () => {
    return (
        <div>

            <Swiper
               loop={true}
                slidesPerView={4}
                centeredSlides={true}
                spaceBetween={30}
                grabCursor={true}
                modules={[Autoplay]}
                autoplay={{
                    delay:1000,
                    disableOnInteraction: false,
                }}
            >

               {
                brandLogos.map((logo, index) => <SwiperSlide key={index}>
                    <img src={logo} alt="" />
                </SwiperSlide>)
               }

                
                

            </Swiper>

        </div>
    )
}

export default Brands