import PhotoGallery from "@/components/PhotoGallery";
import Navbar from "../components/Navbar";
import Carousel from "@/components/Carousel";
import VideoGallery from "@/components/VideoGallery";
import NormalPhotoGallery from "@/components/NormalPhotoGallery";

const HomePage = () => {

  return (
    <div>
      <Navbar />
      <Carousel />
      <section>
        <PhotoGallery />
      </section>
      <section>
        <VideoGallery />
      </section>
      <section>
        <NormalPhotoGallery />
      </section>
    </div>
  );
};

export default HomePage;
