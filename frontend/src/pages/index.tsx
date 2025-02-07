import PhotoGallery from "@/components/PhotoGallery";
import Navbar from "../components/Navbar";
import Carousel from "@/components/Carousel";
import VideoGallery from "@/components/VideoGallery";
import NormalPhotoGallery from "@/components/NormalPhotoGallery";
import Footer from "@/components/Footer";
import { useRef } from "react";

const HomePage = () => {

  // Correctly type the useRef as RefObject<HTMLElement>
  const photoGalleryRef = useRef<HTMLElement | null>(null);
  const videoGalleryRef = useRef<HTMLElement | null>(null);
  const normalPhotoGalleryRef = useRef<HTMLElement | null>(null);

  // Add scroll function
  const scrollToPhotoGallery = () => {
    photoGalleryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

   // Add scroll function
   const scrollToVideoGallery = () => {
    videoGalleryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Add normal photo gallery scroll function
  const scrollNormalPhotoGallery = () => {
    normalPhotoGalleryRef.current?.scrollIntoView({ behavior: "smooth"});
  }

  return (
    <div>
      <Navbar
        onPhotoClick={scrollToPhotoGallery}
        onVideoClick={scrollToVideoGallery}
        onPhotoGalleryClick={scrollNormalPhotoGallery}
      />
      <Carousel />
      <section ref={photoGalleryRef}>
        <PhotoGallery />
      </section>
      <section ref={videoGalleryRef}>
        <VideoGallery />
      </section>
      <section ref={normalPhotoGalleryRef}>
        <NormalPhotoGallery />
      </section>
      <Footer/>
    </div>
  );
};

export default HomePage;
