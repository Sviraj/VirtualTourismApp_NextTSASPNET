import React, { forwardRef } from "react";
import { useState } from "react";
import styles from "./../styles/PhotoGallery.module.css";
import { useRouter } from "next/router";

interface Photo {
  id: number;
  title: string;
  views: string;
  imageUrl: string;
}

interface PhotoGalleryProps {
  ref?: React.Ref<HTMLDivElement>;
}

const PhotoGallery = forwardRef<HTMLDivElement, PhotoGalleryProps>((_, ref) => {
  const router = useRouter();
  const [photos] = useState<Photo[]>([
    {
      id: 1,
      title: "Andaman Islands",
      views: "2,975",
      imageUrl:
        "https://as1.ftcdn.net/v2/jpg/01/24/53/86/1000_F_124538688_amRnfhQENBJxMOoOfxP9nUaB3p0phHu7.jpg",
    },
    {
      id: 2,
      title: "Misty morning, Great Wall of China",
      views: "7,703",
      imageUrl:
        "https://as1.ftcdn.net/v2/jpg/02/10/63/94/1000_F_210639467_icLQOnamR82Kjkms824TiF69T3Rb9eih.jpg",
    },
    {
      id: 3,
      title: "The Charyn and the Lunar Canyons in Kazakhstan",
      views: "4,781",
      imageUrl:
        "https://as2.ftcdn.net/v2/jpg/02/86/08/85/1000_F_286088509_GZFeghJcoPjVCLotBR5AgDi3pf1Fjfxp.jpg",
    },
    {
      id: 4,
      title: "Porto Katsiki beach, Lefkada, Greece",
      views: "11,384",
      imageUrl:
        "https://as1.ftcdn.net/v2/jpg/03/22/88/26/1000_F_322882600_y6JbONLD7YLdRrU5LFQReuq8YUwasfgg.jpg",
    },
    {
      id: 5,
      title: "Maldives - Paradise Islands, part III",
      views: "9,454",
      imageUrl:
        "https://as2.ftcdn.net/v2/jpg/02/86/08/85/1000_F_286088509_GZFeghJcoPjVCLotBR5AgDi3pf1Fjfxp.jpg",
    },
    {
      id: 6,
      title: "Sahara Desert, Algeria. Part I",
      views: "138,213",
      imageUrl:
        "https://as2.ftcdn.net/v2/jpg/05/00/13/57/1000_F_500135749_Cl1dMNuH7DpSP7kDaHQxIpeQqo8w5n0E.jpg",
    },
    {
      id: 7,
      title: "Marathonisi Island, Greece",
      views: "12,894",
      imageUrl:
        "https://as1.ftcdn.net/v2/jpg/02/49/82/38/1000_F_249823850_mCxoxfHYPQiQV3DI14QuYSCqYAnfmIdP.jpg",
    },
    {
      id: 8,
      title: "Maldives Full Moon",
      views: "13,745",
      imageUrl:
        "https://static.vecteezy.com/system/resources/previews/010/336/929/non_2x/full-seamless-spherical-hdri-panorama-360-degrees-angle-view-on-wooden-pier-near-lake-in-evening-in-equirectangular-projection-with-zenith-ready-vr-ar-virtual-reality-content-photo.jpg",
    },
  ]);

  return (
    <div ref={ref}>
      <div className={styles["photo-gallery-container"]}>
        <h1 className={styles["gallery-title"]}>360° Photo</h1>
        <div className={styles["photo-grid"]}>
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={styles["photo-card"]}
              onClick={() =>
                router.push({
                    pathname: "/image-viewer",
                    query: { imageUrl: photo.imageUrl },
                  })
              }
            >
              <div className={styles["photo-content"]}>
                <div className={styles["icon-360"]}>
                  <span>360°</span>
                </div>
                <div className={styles["views-count"]}>
                  <span>views: {photo.views}</span>
                </div>
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className={styles["photo-image"]}
                />
                <div className={styles["photo-title"]}>
                  <h3>{photo.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles["see-all-button"]}>
          <button>See all 360° Photo (514)</button>
        </div>
      </div>
    </div>
  );
});

export default PhotoGallery;
