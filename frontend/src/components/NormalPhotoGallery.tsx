import React, { forwardRef, ForwardedRef } from "react";
import styles from "../styles/NormalPhotoGallery.module.css";
import { useRouter } from "next/router";

interface Photo {
  url: string;
  caption: string;
}

const NormalPhotoGallery = forwardRef<HTMLDivElement>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {

    const router = useRouter();
    const photos: Photo[] = [
      {
        url: "https://as1.ftcdn.net/v2/jpg/02/49/82/38/1000_F_249823850_mCxoxfHYPQiQV3DI14QuYSCqYAnfmIdP.jpg",
        caption: "Singapore Flyer and Marina Bay",
      },
      {
        url: "https://media.istockphoto.com/id/2063544198/photo/tropical-rain-forest.jpg?s=612x612&w=0&k=20&c=KjwvmtUhifF-Nkkc0Dm9iQAhHzUASZ9pJebceruknhI=",
        caption: "Sagrada Familia, Barcelona",
      },
      {
        url: "https://media.istockphoto.com/id/2158022704/photo/vacation-in-paradise.jpg?s=2048x2048&w=is&k=20&c=GDDaMqPdfjDri-7frpRKQgu3B8jMe3oPAovZrKE5GwE=",
        caption: "Foloridsa , Australia",
      },
      {
        url: "https://images.unsplash.com/photo-1735767651924-b5b0bc546643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGVjbyUyMHRvdXJpc218ZW58MHx8MHx8fDA%3D",
        caption: "Singapore Flyer and Marina Bay",
      },
      {
        url: "https://media.istockphoto.com/id/1468433582/photo/woman-walking-on-rope-bridge-in-lush-jungles-a.jpg?s=612x612&w=0&k=20&c=mRD_eqhkt2HMMVAxANBJ2ZxtJyoIjpye3BYx6gX81WQ=",
        caption: "Sagrada Familia, Barcelona",
      },
      {
        url: "https://plus.unsplash.com/premium_photo-1664299252185-5d6a0bd34b47?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWNvJTIwdG91cmlzbXxlbnwwfHwwfHx8MA%3D%3D",
        caption: "Foloridsa , Australia",
      },
      {
        url: "https://media.istockphoto.com/id/1985113310/photo/tourists-hiking-on-the-beach.webp?a=1&b=1&s=612x612&w=0&k=20&c=JX1vq9bXX9XDLqrtaYQKslRwwDs3qns0sy6PB2h9LL8=",
        caption: "Singapore Flyer and Marina Bay",
      },
      {
        url: "https://media.istockphoto.com/id/652739792/photo/backpacker-on-suspension-bridge-in-rainforest.webp?a=1&b=1&s=612x612&w=0&k=20&c=jL5vEMjyfYerjtgG7B9EesKqHtIU23HLqpBA6coTxdE=",
        caption: "Sagrada Familia, Barcelona",
      },
      {
        url: "https://media.istockphoto.com/id/1413827915/photo/boat-hut-on-braies-lake-with-seekofel-mount-on-background-colorful-autumn-sunrise-of-italian.webp?a=1&b=1&s=612x612&w=0&k=20&c=Fu8mtYl_FLRh1aYNGvfRZb_gkTz22pXCsurGuofmErc=",
        caption: "Foloridsa , Australia",
      },
      {
        url: "https://images.unsplash.com/photo-1725819276878-1fed0955c35c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGVjbyUyMHRvdXJpc218ZW58MHx8MHx8fDA%3D",
        caption: "Foloridsa , Australia",
      },
      {
        url: "https://cdn.pixabay.com/photo/2016/11/29/04/42/conifers-1867371_640.jpg",
        caption: "Singapore Flyer and Marina Bay",
      },
      {
        url: "https://media.istockphoto.com/id/2063544198/photo/tropical-rain-forest.jpg?s=612x612&w=0&k=20&c=KjwvmtUhifF-Nkkc0Dm9iQAhHzUASZ9pJebceruknhI=",
        caption: "Sagrada Familia, Barcelona",
      },
      {
        url: "https://media.istockphoto.com/id/2158022704/photo/vacation-in-paradise.jpg?s=2048x2048&w=is&k=20&c=GDDaMqPdfjDri-7frpRKQgu3B8jMe3oPAovZrKE5GwE=",
        caption: "Foloridsa , Australia",
      },
      {
        url: "https://cdn.pixabay.com/photo/2021/04/03/12/25/tree-6147402_1280.jpg",
        caption: "Singapore Flyer and Marina Bay",
      },
      {
        url: "https://media.istockphoto.com/id/1468433582/photo/woman-walking-on-rope-bridge-in-lush-jungles-a.jpg?s=612x612&w=0&k=20&c=mRD_eqhkt2HMMVAxANBJ2ZxtJyoIjpye3BYx6gX81WQ=",
        caption: "Sagrada Familia, Barcelona",
      },
      {
        url: "https://cdn.pixabay.com/photo/2016/11/08/05/31/boys-1807545_640.jpg",
        caption: "Singapore Flyer and Marina Bay",
      },
      {
        url: "https://cdn.pixabay.com/photo/2019/10/23/20/40/landscape-4572804_640.jpg",
        caption: "Sagrada Familia, Barcelona",
      },
      {
        url: "https://cdn.pixabay.com/photo/2016/11/21/06/53/beautiful-natural-image-1844362_640.jpg",
        caption: "Foloridsa , Australia",
      },
      {
        url: "https://t4.ftcdn.net/jpg/03/44/51/15/240_F_344511538_wK1Mkf76TtkkKT12JVZAdfXNQrdSs9yf.jpg",
        caption: "Singapore Flyer and Marina Bay",
      },
      {
        url: "https://t3.ftcdn.net/jpg/02/75/90/14/240_F_275901439_DUV0dWPnvFV6D1ead5TqGP5PLUxuzPV2.jpg",
        caption: "Sagrada Familia, Barcelona",
      },
      {
        url: "https://cdn.pixabay.com/photo/2021/04/03/12/25/tree-6147402_1280.jpg",
        caption: "Singapore Flyer and Marina Bay",
      },
      {
        url: "https://media.istockphoto.com/id/1468433582/photo/woman-walking-on-rope-bridge-in-lush-jungles-a.jpg?s=612x612&w=0&k=20&c=mRD_eqhkt2HMMVAxANBJ2ZxtJyoIjpye3BYx6gX81WQ=",
        caption: "Sagrada Familia, Barcelona",
      },
      {
        url: "https://cdn.pixabay.com/photo/2016/11/08/05/31/boys-1807545_640.jpg",
        caption: "Singapore Flyer and Marina Bay",
      },
      {
        url: "https://cdn.pixabay.com/photo/2019/10/23/20/40/landscape-4572804_640.jpg",
        caption: "Sagrada Familia, Barcelona",
      },
      {
        url: "https://media.istockphoto.com/id/1468433582/photo/woman-walking-on-rope-bridge-in-lush-jungles-a.jpg?s=612x612&w=0&k=20&c=mRD_eqhkt2HMMVAxANBJ2ZxtJyoIjpye3BYx6gX81WQ=",
        caption: "Sagrada Familia, Barcelona",
      },
      // Add the rest of your photos here
    ];

    // Function to chunk the array into groups of 5
    const chunkPhotos = (arr: Photo[], size: number): Photo[][] => {
      const chunkedArr: Photo[][] = [];
      for (let i = 0; i < arr.length; i += size) {
        chunkedArr.push(arr.slice(i, i + size));
      }
      return chunkedArr;
    };

    const photoRows = chunkPhotos(photos, 5);

    return (
      <div ref={ref}>
        <div className={styles["gallery-container"]}>
          <h1 className={styles["gallery-title"]}>Photogallery</h1>
          <div className={styles["gallery-rows"]}>
            {photoRows.map((row, rowIndex) => (
              <div key={rowIndex} className={styles["photo-row"]}>
                {row.map((photo, index) => (
                  <div
                    key={`${rowIndex}-${index}`}
                    className={styles["photo-item"]}
                    onClick={() =>
                      router.push({
                          pathname: "/normalImage-viewer",
                          query: { imageUrl: photo.url, caption: photo.caption },
                        })
                    }
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption || `Photo ${rowIndex * 5 + index + 1}`}
                      loading="lazy"
                    />
                    {photo.caption && (
                      <div className={styles["photo-caption"]}>
                        <span className={styles["caption-text"]}>
                          {photo.caption}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className={styles["see-all-button"]}>
            <button>See all Photo ({photos.length})</button>
          </div>
        </div>
      </div>
    );
  }
);

// Set a display name for debugging purposes
NormalPhotoGallery.displayName = "NormalPhotoGallery";

export default NormalPhotoGallery;
