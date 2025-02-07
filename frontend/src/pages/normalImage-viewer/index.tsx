import React from "react";
import { useRouter } from "next/router";
import styles from "../../styles/NormalImageViewer.module.css";

const NormalPhotoViewer: React.FC = () => {
  const router = useRouter();

  // Extract imageUrl and caption from query parameters
  const imageUrl = router.query.imageUrl as string;
  const photocaption = router.query.caption as string;

  if (!imageUrl) {
    return <div className={styles["error-message"]}>No image URL provided</div>;
  }

  return (
    <div className={styles["photo-viewer-container"]}>
      <h1 className={styles["photo-title"]}>{photocaption || "Photo Viewer"}</h1>
      <div className={styles["photo-wrapper"]}>
        <img
          src={imageUrl}
          alt={photocaption}
          className={styles["photo-viewer-image"]}
        />
        <div className={styles["hover-overlay"]}>
        <p>Click &quot;Back&quot; to return</p>
        </div>
      </div>
      <button
        className={styles["back-button"]}
        onClick={() => router.back()}
      >
        Back to Gallery
      </button>
    </div>
  );
};

export default NormalPhotoViewer;
