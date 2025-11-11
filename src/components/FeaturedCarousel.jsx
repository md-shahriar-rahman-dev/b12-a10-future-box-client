import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

export default function FeaturedCarousel({ slides = [] }) {
  return (
    <Swiper
      effect="coverflow"
      grabCursor
      centeredSlides
      slidesPerView="auto"
      coverflowEffect={{
        rotate: 30,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true,
      }}
      autoplay={{ delay: 2500 }}
      pagination={{ clickable: true }}
      modules={[EffectCoverflow, Autoplay, Pagination]}
      className="py-6"
    >
      {(slides.length === 0 ? [{ title: "Build daily habits", text: "Track, mark complete, and grow streaks." }] : slides)
        .map((s, i) => (
          <SwiperSlide
            key={i}
            className="w-72 bg-gray-900/80 text-white rounded-2xl shadow-2xl p-6 backdrop-blur-md hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-xl font-bold">{s.title}</h3>
            <p className="mt-2 text-gray-300">{s.text}</p>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
