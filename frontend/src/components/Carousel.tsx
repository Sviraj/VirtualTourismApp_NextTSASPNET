import React, {
  useState,
  useEffect,
  useCallback,
  TouchEvent,
  MouseEvent,
} from "react";
import styles from "../styles/Carousel.module.css";
import Image from "next/image";

interface CarouselProps {
  autoPlayInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ autoPlayInterval = 3000 }) => {
  
  const [images, setCarouselPhotos] = useState<string[]>([
    "https://images.unsplash.com/photo-1499336315816-097655dcfbda?q=80&w=2447&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1501082183835-b7b33db89c3f?q=80&w=2320&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1706984193600-dfcd49077c87?q=80&w=2305&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className={styles["carousel-image"]}
          width={800} // specify an appropriate width
          height={400} // specify an appropriate height
          // Alternatively, you can use layout="responsive" for fluid images
          //layout="responsive"
          //objectFit="cover" // or another value as needed
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
