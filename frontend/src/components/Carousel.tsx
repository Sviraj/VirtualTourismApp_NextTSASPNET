import React, {
  useState,
  useEffect,
  useCallback,
  TouchEvent,
  MouseEvent,
} from "react";
import styles from "../styles/Carousel.module.css";

interface CarouselProps {
  images: string[];
  autoPlayInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  autoPlayInterval = 3000,
}) => {
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

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
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
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className={styles["carousel-image"]}
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
