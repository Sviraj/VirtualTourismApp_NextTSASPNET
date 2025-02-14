import React, { forwardRef } from "react";
import { useState } from "react";
import styles from "./../styles/PhotoGallery.module.css";
import { useRouter } from "next/router";
import { PhotoGalleryImages } from "../utiles/PhotoGallery-images";

interface PhotoGalleryProps {
  ref?: React.Ref<HTMLDivElement>;
}

const PhotoGallery = forwardRef<HTMLDivElement, PhotoGalleryProps>((_, ref) => {
  const router = useRouter();
  const [numberOfPhotos] = useState<number>(513);

  const handleClick = () => {
    router.push("/image360page");
  };

  return (
    <div ref={ref}>
      <div className={styles["photo-gallery-container"]}>
        <h1 className={styles["gallery-title"]}>360° Photo</h1>
        <div className={styles["photo-grid"]}>
          {PhotoGalleryImages.map((photo) => (
            <div
              key={photo.id}
              className={styles["photo-card"]}
              onClick={() =>
                router.push({
                  pathname: "/image-viewer",
                  query: { imageUrl: photo.imageUrl },
                })
              }
            >
              <div className={styles["photo-content"]}>
                <div className={styles["icon-360"]}>
                  <span>360°</span>
                </div>
                <div className={styles["views-count"]}>
                  <span>views: {photo.views}</span>
                </div>
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className={styles["photo-image"]}
                />
                <div className={styles["photo-title"]}>
                  <h3>{photo.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles["see-all-button"]}>
          <button onClick={handleClick}>
            See all 360° Photo ({numberOfPhotos})
          </button>
        </div>
      </div>
    </div>
  );
});

PhotoGallery.displayName = "PhotoGallery";

export default PhotoGallery;
