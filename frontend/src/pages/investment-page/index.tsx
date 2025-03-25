import React from "react";
import styles from "../../styles/Video360page.module.css";

const VideoPage360: React.FC = () => {
  return (
    <div className={styles["video360-container"]}>
      <div className={styles["video-content"]}>
        <h1 className={styles["gallery-title"]}>Historical Presarvation</h1>
        <video 
          src={`https://drive.google.com/uc?export=download&id=1Ff4nzRo3E_z37zrY5GpSWJSb7NZl8p5C`} 
          className={styles["video-element"]} 
          controls 
        />
      </div>
    </div>
  );
};

export default VideoPage360;
