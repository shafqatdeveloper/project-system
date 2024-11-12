"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Carousel,
  CarouselControl,
  CarouselIndicators,
  CarouselItem,
} from "reactstrap";

const StandardSlider = ({ items,onIndexChange,activeIndex,previous,next,setAnimating,dontGiveSpace }) => {
 


useEffect(()=>{
  if(onIndexChange)
    onIndexChange(activeIndex+1);
},[activeIndex])

  //   const goToIndex = (newIndex) => {
  //     if (animating) return;
  //     setActiveIndex(newIndex);
  //   };  not needed yet
  return (
    <Carousel
      next={()=>{}}
      className="d-flex align-items-center full-width justify-content-center"
      previous={previous}
      activeIndex={activeIndex}
      ride="carousel"
    >
      {items?.map((item, key) => (
        <CarouselItem className={`${dontGiveSpace?"":"px-3"}`}
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={key}
          
        >
          {item}
        </CarouselItem>
      ))}
   
    </Carousel>
  );
};

export default StandardSlider;
