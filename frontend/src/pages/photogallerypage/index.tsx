import { imageSliderPhotos } from "../../utiles/image-slider-photos";
import styles from "../../styles/photogallerypage.module.css";
import { useState } from "react";
import ImageSlider from "@/components/ImageSlider";

interface ImageSliderPhoto {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
}
const PhotogalleryPage: React.FC = () => {
  return(
    <div className={styles["container"]}>
      <h1>Photo Gallery</h1>
      <ImageSlider />
    </div>
  );
};

export default PhotogalleryPage;
