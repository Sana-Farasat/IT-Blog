"use client";
//import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "./Carousel.css";
import Image from "next/image";

export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  return (
    <div className="carousel-wrapper">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">
            <Image
              src="/carousel-img01.jpg"
              alt="Slide 1"
              height={300}
              width={800}
              className="slide-img"
            />
          </div>
          <div className="embla__slide">
            <Image
              src="/carousel-img02.jpg"
              alt="Slide 2"
              height={300}
              width={800}
              className="slide-img"
            />
          </div>
          <div className="embla__slide">
            <Image
              src="/carousel-img03.jpg"
              alt="Slide 3"
              height={300}
              width={800}
              className="slide-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
