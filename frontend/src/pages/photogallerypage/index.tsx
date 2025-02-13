import styles from "../../styles/photogallerypage.module.css";
import ImageSlider from "@/components/ImageSlider";

const PhotogalleryPage: React.FC = () => {
  return(
    <div className={styles["container"]}>
      <h1>Photo Gallery</h1>
      <ImageSlider />
    </div>
  );
};

export default PhotogalleryPage;
