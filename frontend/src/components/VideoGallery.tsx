import React, { forwardRef } from "react";
import styles from "../styles/VideoGallery.module.css";
import router from "next/router";

// Define the Video type
interface Video {
  title: string;
  views: string;
  image: string;
}

// Define the props type
interface VideoGalleryProps {
  // Add any additional props you might need here
}

// Sample video data
const videos: Video[] = [
  {
    title: "New Year in Moscow. 360° trailer in 8K",
    views: "2,066",
    image:
      "https://media.cntraveler.com/photos/6539da3124725ada6bbacb8c/master/w_1920%2Cc_limit/Amazon-GettyImages-1454581656.jpg",
  },
  {
    title: "Greenland, Land of Ice. Trailer.",
    views: "298",
    image:
      "https://media.istockphoto.com/id/2158986005/photo/coastal-boardwalk-in-singapore-nature-reserve.jpg?s=2048x2048&w=is&k=20&c=Jrt20udohW7T7vNKQ4kchXFXszp16bCfsqAXWiFv6mQ=",
  },
  {
    title: "Ancient town of Fenghuang, China",
    views: "4,002",
    image:
      "https://cdn-v2.theculturetrip.com/610x457/wp-content/uploads/2024/03/eshan-malaviarachchi-z3xo2b2db7q-unsplash.webp",
  },
  {
    title: "Underwater. Seals and Sea Lions",
    views: "7,244",
    image:
      "https://cdn-v2.theculturetrip.com/610x458/wp-content/uploads/2024/03/farhath-firows-vo0mwcg5fjc-unsplash.webp",
  },
  {
    title: "Welcome to the Caribbean",
    views: "5,716",
    image:
      "https://cdn-v2.theculturetrip.com/610x381/wp-content/uploads/2023/07/hendrik-cornelissen-jptt_sau034-unsplash.webp",
  },
  {
    title: "Kremlin, 360° 8K video",
    views: "9,412",
    image:
      "https://cdn-v2.theculturetrip.com/610x458/wp-content/uploads/2024/03/tomas-malik-fhahnf9c0sw-unsplash.webp",
  },
  {
    title: "Underwater Wonders, Red Sea, Egypt",
    views: "10,530",
    image:
      "https://cdn-v2.theculturetrip.com/610x407/wp-content/uploads/2024/03/rowan-heuvel-_5p2o2fdkry-unsplash-1.webp",
  },
  {
    title: "Paris, France. VR photo tour",
    views: "13,067",
    image:
      "https://cdn-v2.theculturetrip.com/610x488/wp-content/uploads/2024/03/birendra-padmaperuma-njelnf_q4uy-unsplash.webp",
  },
  {
    title: "Flower Field Meditation",
    views: "9,277",
    image:
      "https://cdn-v2.theculturetrip.com/610x407/wp-content/uploads/2024/03/leonard-jayawardena-ribai1loozc-unsplash-min.webp",
  },
  {
    title: "Hacha Waterfall, Canaima Lagoon, Venezuela",
    views: "7,779",
    image:
      "https://cdn-v2.theculturetrip.com/610x458/wp-content/uploads/2022/10/sri-lanka-sigiriya-dylan-shaw-smuakwmt8xa-unsplash.webp",
  },
  {
    title: "Lofoten Islands, Norway",
    views: "13,404",
    image:
      "https://media.cntraveler.com/photos/5cb63a091a7e70293bf7094b/master/w_1920%2Cc_limit/Arashiyama-Japan_GettyImages-687644524.jpg",
  },
  {
    title: "Kostroma, Golden Ring of Russia",
    views: "14,200",
    image:
      "https://media.cntraveler.com/photos/5cb63a087b743b471660a8da/master/w_1920%2Cc_limit/Angel-Falls-Venezuela_GettyImages-165513023.jpg",
  },
];

// VideoGallery component with TypeScript support
const VideoGallery = forwardRef<HTMLDivElement, VideoGalleryProps>(
  (props, ref) => {
    return (
      <div ref={ref}>
        <div className={styles["video-gallery-container"]}>
          <h1 className={styles["gallery-title"]}>360° Video</h1>
          <div className={styles["video-gallery"]}>
            {videos.map((video, index) => (
              <div
                className={styles["video-card"]}
                key={index}
                onClick={() =>
                  router.push({
                    pathname: "/video-viewer"
                  })
                }
              >
                <img
                  src={video.image}
                  alt={video.title}
                  className={styles["video-image"]}
                />
                <div className={styles["video-info"]}>
                  <h3>{video.title}</h3>
                  <p>{`Views: ${video.views}`}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles["see-all-button"]}>
            <button>See all 360° Video (514)</button>
          </div>
        </div>
      </div>
    );
  }
);

export default VideoGallery;
