import React, { forwardRef, ForwardedRef } from "react";
import styles from "../styles/NormalPhotoGallery.module.css";
import { useRouter } from "next/router";
import {
  NormalPhotoGalleryPhotos,
  NormalPhotpGalleryPhoto,
} from "@/utiles/normalPhotoGallery-photos";

const NormalPhotoGallery = forwardRef<HTMLDivElement>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const router = useRouter();

    // Function to chunk the array into groups of 5
    const chunkPhotos = (
      arr: NormalPhotpGalleryPhoto[],
      size: number
    ): NormalPhotpGalleryPhoto[][] => {
      const chunkedArr: NormalPhotpGalleryPhoto[][] = [];
      for (let i = 0; i < arr.length; i += size) {
        chunkedArr.push(arr.slice(i, i + size));
      }
      return chunkedArr;
    };

    const photoRows = chunkPhotos(NormalPhotoGalleryPhotos, 5);

    const handleClick = () => {
      router.push("photogallerypage");
    }

    return (
      <div ref={ref}>
        <div className={styles["gallery-container"]}>
          <h1 className={styles["gallery-title"]}>Photogallery</h1>
          <div className={styles["gallery-rows"]}>
            {photoRows.map((row, rowIndex) => (
              <div key={rowIndex} className={styles["photo-row"]}>
                {row.map((photo, index) => (
                  <div
                    key={`${rowIndex}-${index}`}
                    className={styles["photo-item"]}
                    onClick={() =>
                      router.push({
                        pathname: "/normalImage-viewer",
                        query: { imageUrl: photo.url, caption: photo.caption },
                      })
                    }
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption || `Photo ${rowIndex * 5 + index + 1}`}
                      loading="lazy"
                    />
                    {photo.caption && (
                      <div className={styles["photo-caption"]}>
                        <span className={styles["caption-text"]}>
                          {photo.caption}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className={styles["see-all-button"]} onClick={handleClick}>
            <button>See all Photo ({NormalPhotoGalleryPhotos.length})</button>
          </div>
        </div>
      </div>
    );
  }
);

// Set a display name for debugging purposes
NormalPhotoGallery.displayName = "NormalPhotoGallery";

export default NormalPhotoGallery;
