import React from "react";
import { useRouter } from "next/router";
import Viewer360 from "../../components/Viewer360";

const ImageViewerPage: React.FC = () => {
  const router = useRouter();

  // Extract imageUrl from query parameters or fallback to an empty string
  const imageUrl = router.query.imageUrl as string;

  if (!imageUrl) {
    return <div>No image URL provided</div>;
  }

  return (
    <Viewer360
      imageUrl={imageUrl}
      height="600px" // optional
      controlsTheme="light" // optional: 'light' or 'dark'
      showControls={true} // optional
      initialAutoRotate={false} // optional
    />
  );
};

export default ImageViewerPage;
