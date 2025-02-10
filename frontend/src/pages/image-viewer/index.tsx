import React from "react";
import { useRouter } from "next/router";
import Viewer360 from "../../components/Image360Viewer";
import styles from "../../styles/image-viewer-page.module.css";

const ImageViewerPage: React.FC = () => {
  const router = useRouter();

  // Extract imageUrl from query parameters or fallback to an empty string
  const imageUrl = router.query.imageUrl as string;

  if (!imageUrl) {
    return <div>No image URL provided</div>;
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <h3>World / Europe / Greece / Kefalonia, Greece</h3>
      </div>
      <div className={styles["viewer-container"]}>
        <Viewer360
          imageUrl={imageUrl}
          controlsTheme="dark" // optional: 'light' or 'dark'
          showControls={true} // optional
          initialAutoRotate={true} // optional
        />
      </div>
      <div>
        <button className={styles["button"]}>Buy</button>
      </div>
    </div>
  );
};

export default ImageViewerPage;
