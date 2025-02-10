import React, { useState, useEffect, useCallback, TouchEvent } from "react";
import styles from "../styles/Carousel.module.css";
import Viewer360 from "./Image360Viewer";

interface CarouselProps {
  autoPlayInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ autoPlayInterval = 5000 }) => {
  const [images] = useState<string[]>([
    "https://as2.ftcdn.net/v2/jpg/05/00/13/57/1000_F_500135749_Cl1dMNuH7DpSP7kDaHQxIpeQqo8w5n0E.jpg",
    "https://as1.ftcdn.net/v2/jpg/01/24/53/86/1000_F_124538688_amRnfhQENBJxMOoOfxP9nUaB3p0phHu7.jpg",
    "https://as2.ftcdn.net/v2/jpg/02/86/08/85/1000_F_286088509_GZFeghJcoPjVCLotBR5AgDi3pf1Fjfxp.jpg",
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
