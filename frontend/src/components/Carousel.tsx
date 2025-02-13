import React, { useState, useEffect, useCallback, TouchEvent } from "react";
import styles from "../styles/Carousel.module.css";
import Viewer360 from "./Image360Viewer";

interface CarouselProps {
  autoPlayInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ autoPlayInterval = 5000 }) => {
  const [images] = useState<string[]>([
    "https://t3.ftcdn.net/jpg/04/96/33/28/240_F_496332871_6AHFHGSxsLzGIBGarXYN6tyiyf1VFeVp.jpg",
    "https://t3.ftcdn.net/jpg/02/22/96/30/240_F_222963012_Dq6NSrRUfscMnB3FclNNqmws3TGoL21P.jpg",
    "https://as2.ftcdn.net/v2/jpg/02/86/08/85/1000_F_286088509_GZFeghJcoPjVCLotBR5AgDi3pf1Fjfxp.jpg",
    "https://t4.ftcdn.net/jpg/05/17/77/55/240_F_517775514_2gNFycX0B8eXBFp5QUSiQGFPXOmhuc79.jpg",
    "https://t3.ftcdn.net/jpg/02/08/48/68/240_F_208486829_9Zf0XvJq5IQTWPf9kcJPes4dOWWMXlNX.jpg"
  ]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        goToNext();
      }, autoPlayInterval);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoPlaying, goToNext, autoPlayInterval]);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.touches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!touchStart) return;
    const touchEnd = e.touches[0].clientX;
    if (touchStart - touchEnd > 50) {
      goToNext();
      setTouchStart(null);
    }
    if (touchStart - touchEnd < -50) {
      goToPrevious();
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setIsAutoPlaying(true);
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return (
    <div
      className={styles["carousel"]}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`${styles["carousel-button"]} ${styles["prev"]}`}
        onClick={() => {
          goToPrevious();
          setIsAutoPlaying(false);
        }}
      >
        &#10094;
      </button>
      <div className={styles["carousel-image-container"]}>
        <div className={styles["carousel-image-container-overlay"]}>
              <h1>VirtuTour</h1>
        </div>
        <Viewer360
          imageUrl={images[currentIndex]}
          controlsTheme="dark" // optional: 'light' or 'dark'
          showControls={false} // optional
          initialAutoRotate={true} // optional
          initialEnableZoom={false} // optional
        />
      </div>
      <button
        className={`${styles["carousel-button"]} ${styles["next"]}`}
        onClick={() => {
          goToNext();
          setIsAutoPlaying(false);
        }}
      >
        &#10095;
      </button>
      <div className={styles["carousel-indicators"]}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles["indicator"]} ${
              index === currentIndex ? styles["active"] : ""
            }`}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoPlaying(false);
            }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
