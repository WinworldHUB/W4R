import React, { Children, FC, useEffect, useRef } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

interface SliderProps {
  children: React.ReactNode;
  slideTo: number;
  autoHeight?: boolean;
}

const Slider: FC<SliderProps> = ({ children, slideTo, autoHeight = true }) => {
  const swiperRef = useRef<SwiperClass>();

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(slideTo);
    }
  }, [slideTo]);

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      noSwiping
      allowTouchMove={false}
      autoHeight={autoHeight}
      autoplay={false}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      onSlideChange={() => console.log("slide change")}
    >
      {Children.map(children, (child, index) => (
        <SwiperSlide key={`slide-${index}`}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
