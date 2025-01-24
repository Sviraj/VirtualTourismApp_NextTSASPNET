import PhotoGallery from "@/components/PhotoGallery";
import Navbar from "../components/Navbar";
import Carousel from "@/components/Carousel";
import VideoGallery from "@/components/VideoGallery";
import NormalPhotoGallery from "@/components/NormalPhotoGallery";
import Footer from "@/components/Footer";
import { useRef } from "react";


const images = [
    "https://images.unsplash.com/photo-1499336315816-097655dcfbda?q=80&w=2447&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1501082183835-b7b33db89c3f?q=80&w=2320&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1706984193600-dfcd49077c87?q=80&w=2305&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

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
      <Carousel images={images}/>
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
