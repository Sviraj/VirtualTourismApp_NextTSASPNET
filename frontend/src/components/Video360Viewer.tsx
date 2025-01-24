import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import styles from "../styles/Video360Viewer.module.css";

interface Video360ViewerProps {
  videoSrc: string; // URL of the 360-degree video
  height?: string; // Height of the viewer container
  enableControls?: boolean; // Toggle OrbitControls
  autoPlay?: boolean; // Auto-play the video
}

const Video360Viewer: React.FC<Video360ViewerProps> = ({
  videoSrc,
  height = "500px",
  enableControls = true,
  autoPlay = true,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create Scene, Camera, and Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    cameraRef.current = camera; // Save camera reference
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create Video Element
    const video = document.createElement("video");
    video.src = videoSrc;
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    if (autoPlay) video.play().catch(() => setError("Failed to play video"));
    videoRef.current = video;

    const videoTexture = new THREE.VideoTexture(video);

    // Create Sphere Geometry
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ map: videoTexture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Position Camera
    camera.position.set(0, 0, 0.1);

    // Add Orbit Controls for Interaction
    let controls: OrbitControls | null = null;
    if (enableControls) {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.rotateSpeed = 0.5;
    }

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls?.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize Handling
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };
    window.addEventListener("resize", handleResize);

    // Cleanup on Component Unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      video.pause();
      video.src = ""; // Release video resource
    };
  }, [videoSrc, autoPlay, enableControls]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => setError("Failed to play video"));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  const handleZoomIn = () => {
    if (cameraRef.current) {
      cameraRef.current.fov = Math.max(cameraRef.current.fov - 5, 20); // Minimum FOV is 20
      cameraRef.current.updateProjectionMatrix();
    }
  };

  const handleZoomOut = () => {
    if (cameraRef.current) {
      cameraRef.current.fov = Math.min(cameraRef.current.fov + 5, 100); // Maximum FOV is 100
      cameraRef.current.updateProjectionMatrix();
    }
  };

  return (
    <div className={styles["viewer-container"]} style={{ height }}>
      <div ref={containerRef} className={styles["viewer-3d"]} />
      {error && <p className={styles["error-message"]}>{error}</p>}
      <div className={styles["controls"]}>
        <button onClick={togglePlayPause} className={styles["control-button"]}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={toggleFullscreen} className={styles["control-button"]}>
          Fullscreen
        </button>
        <button onClick={handleZoomIn} className={styles["control-button"]}>
          Zoom In
        </button>
        <button onClick={handleZoomOut} className={styles["control-button"]}>
          Zoom Out
        </button>
      </div>
    </div>
  );
};

export default Video360Viewer;
