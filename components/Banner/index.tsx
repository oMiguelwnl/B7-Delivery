import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import styles from "./styles.module.css";
import Image from "next/image";

export const Banner = () => {
  return (
    <div className={styles.container}>
      <Swiper
        slidesPerView={1}
        className={styles.swiper}
        loop={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        <SwiperSlide className={styles.slide}>
          <Image
            src="/tmp/banner1.png"
            alt="Banner 1"
            width={380}
            height={190}
          />
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <Image
            src="/tmp/banner2.png"
            alt="Banner 2"
            width={380}
            height={190}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
