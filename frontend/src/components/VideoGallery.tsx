import React, { forwardRef } from "react";
import styles from "../styles/VideoGallery.module.css";
import router from "next/router";
import { VideoGalleryPhotos} from "../utiles/videoGallery-photos";

// VideoGallery component with TypeScript support
const VideoGallery = forwardRef<HTMLDivElement>(
  (props, ref) => {

    const handleClick = () =>{
      router.push("/video360page");
    }
    return (
      <div ref={ref}>
        <div className={styles["video-gallery-container"]}>
          <h1 className={styles["gallery-title"]}>360° Video</h1>
          <div className={styles["video-gallery"]}>
            {VideoGalleryPhotos.map((video, index) => (
              <div
                className={styles["video-card"]}
                key={index}
                onClick={() =>
                  router.push({
                    pathname: "/video-viewer"
                  })
                }
              >
                <img
                  src={video.image}
                  alt={video.title}
                  className={styles["video-image"]}
                />
                <div className={styles["video-info"]}>
                  <h3>{video.title}</h3>
                  <p>{`Views: ${video.views}`}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles["see-all-button"]} onClick={handleClick}>
            <button>See all 360° Video (514)</button>
          </div>
        </div>
      </div>
    );
  }
);

VideoGallery.displayName = "VideoGallery";

export default VideoGallery;
