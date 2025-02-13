import { imageSliderPhotos } from "../utiles/image-slider-photos";
import styles from "../styles/imageSlider.module.css";
import { useState } from "react";

interface ImageSliderPhoto {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
}

const ImageSlider: React.FC = () => {
  const [photos, setPhotos] = useState<ImageSliderPhoto[]>(imageSliderPhotos);

  const goToPrevious = () => {
    setPhotos((previousPhoto) => {
      if (previousPhoto.length === 0) return previousPhoto;
      const last = previousPhoto[previousPhoto.length - 1];
      return [last, ...previousPhoto.slice(0, previousPhoto.length - 1)];
    });
  };
  const gotonext = () => {
    setPhotos((previousPhoto) => {
      if (previousPhoto.length === 0) return previousPhoto;
      const [first, ...rest] = previousPhoto;
      return [...rest, first];
    });
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["slide"]}>
        {photos.map((photo, index) => (
          <div
            key={index}
            className={styles["item"]}
            style={{ backgroundImage: `url(${photo.imageUrl})` }}
          >
            <div className={styles["content"]}>
              <div className={styles["name"]}>{photo.name}</div>
              <div className={styles["description"]}>
                <p>{photo.description}</p>
              </div>
              <button className={styles["content-button"]}>See More</button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles["button"]}>
        <button
          className={styles["prev"]}
          onClick={() => {
            goToPrevious();
          }}
        >
          &#10094;
        </button>
        <button
          className={styles["next"]}
          onClick={() => {
            gotonext();
          }}
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;