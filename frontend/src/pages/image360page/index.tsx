import React from "react";
import styles from "../../styles/Image360page.module.css";
import { useRouter } from "next/router";
import { photos } from "../../utiles/photos";

const ImagePage360: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles["image360-container"]}>
      <div className={styles["photo-gallery-container"]}>
        <h1 className={styles["gallery-title"]}>360° Photo</h1>
        <div className={styles["photo-grid"]}>
          {photos.map((photo) => (
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
      </div>
    </div>
  );
};

export default ImagePage360;
