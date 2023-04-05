import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import swiper1 from "../../Assets/swiperImages/1.jpg";
import swiper2 from "../../Assets/swiperImages/2.jpg";
import swiper3 from "../../Assets/swiperImages/3.jpg";
import swiper4 from "../../Assets/swiperImages/4.jpg";
import swiper5 from "../../Assets/swiperImages/5.jpg";
import swiper6 from "../../Assets/swiperImages/6.jpg";
import swiper7 from "../../Assets/swiperImages/7.jpg";
import swiper8 from "../../Assets/swiperImages/8.jpg";
import swiper9 from "../../Assets/swiperImages/9.jpg";
import "swiper/css";
import "swiper/css/pagination";
import "./DashboardSwiper.css";

export default function DashboardSwiper() {
  return (
    <Swiper
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Autoplay]}
      speed={400}
      autoplay={{ delay: 4000 }}
      slidesPerView={1}
      className="mySwiper"
    >
      <SwiperSlide className="swiper-slide">
        <img src={swiper1} alt="delicate arch" />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <img src={swiper2} alt="slot canyon in Utah" />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <img src={swiper3} alt="El Capitan in Yosemite" />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <img src={swiper4} alt="River in Yosemite" />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <img src={swiper5} alt="Waterfall in southern Utah" />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <img src={swiper6} alt="Alpine lake in Glacier NP" />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <img src={swiper7} alt="Cabin and dock in Denali NP" />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <img src={swiper8} alt="Valley in Banff National Park" />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <img
          src={swiper9}
          alt="Lake with mountain in background in Lake Clark National Park"
        />
      </SwiperSlide>
    </Swiper>
  );
}
