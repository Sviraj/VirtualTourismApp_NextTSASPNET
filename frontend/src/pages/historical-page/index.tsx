import React from "react";
import styles from "../../styles/Video360page.module.css";

const VideoPage360: React.FC = () => {
  return (
    <div className={styles["video360-container"]}>
      <div className={styles["video-content"]}>
        <h1 className={styles["gallery-title"]}>Historical Presarvation</h1>
        <video
          src="/videos/vinura-video.mp4"
          className={styles["video-element"]}
          controls
        />
      </div>
    </div>
  );
};

export default VideoPage360;
