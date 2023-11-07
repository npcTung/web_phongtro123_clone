import React, { memo } from "react";
import NoImage from "assets/logo-image.png";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const SplidePost = ({ images, title }) => {
  return (
    <Splide
      options={{ rewind: true, perPage: 1 }}
      aria-label="React Splide Example"
    >
      {images &&
        images.map((el, idx) => (
          <SplideSlide
            key={idx}
            className="cursor-ew-resize w-full h-[350px] bg-black"
          >
            <img
              src={el || NoImage}
              alt={title}
              className="w-full h-full object-contain"
            />
          </SplideSlide>
        ))}
    </Splide>
  );
};

export default memo(SplidePost);
