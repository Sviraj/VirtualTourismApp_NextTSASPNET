import styles from "../../styles/photogallerypage.module.css";
import ImageSlider from "@/components/ImageSlider";
import { imageSliderPhotosGallery } from "@/utiles/image-slider-photosGallery";

const PhotogalleryPage: React.FC = () => {
  return (
    <div className={styles["container"]}>
      <ImageSlider />

      <div className={styles["photo-grid"]}>
        {imageSliderPhotosGallery.map((group, groupIndex) => (
          <div key={groupIndex}>
            <div className={styles["photo-card"]}>
              {group.map((photo) => (
                <div key={photo.id} className={styles["photo-cardp"]}>
                  <img src={photo.imageUrl} />
                </div>
              ))}
              <div className={styles["photo-count"]}>3423 photos</div>
              <div className={styles["background-text"]}>
                Best arial panoroma photos view
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotogalleryPage;
