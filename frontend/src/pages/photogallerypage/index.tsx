import styles from "../../styles/photogallerypage.module.css";
import ImageSlider from "@/components/ImageSlider";

const PhotogalleryPage: React.FC = () => {
  return(
    <div className={styles["container"]}>
      <ImageSlider />
    </div>
  );
};

export default PhotogalleryPage;
