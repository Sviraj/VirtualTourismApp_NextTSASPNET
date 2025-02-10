import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import {
  Loader2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Fullscreen,
  Play,
  Pause,
} from "lucide-react";
import styles from "../styles/Image360Viewer.module.css";

interface Viewer360Props {
  imageUrl: string;
  height?: string;
  controlsTheme?: "light" | "dark";
  showControls?: boolean;
  initialAutoRotate?: boolean;
}

const Viewer360: React.FC<Viewer360Props> = ({
  imageUrl,
  height = "400px",
  controlsTheme = "light",
  showControls = true,
  initialAutoRotate = false,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(
    initialAutoRotate
  );
  const [loadingProgress, setLoadingProgress] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const loadingManager = new THREE.LoadingManager();
    loadingManager.onProgress = (_, itemsLoaded, itemsTotal) => {
      const progress = (itemsLoaded / itemsTotal) * 100;
      setLoadingProgress(progress);
    };
    loadingManager.onError = (url) => {
      setError(`Error loading texture: ${url}`);
      setIsLoading(false);
    };

    const textureLoader = new THREE.TextureLoader(loadingManager);
    textureLoader.load(
      imageUrl,
      (texture) => {
        const geometry = new THREE.SphereGeometry(500, 60, 40);
        geometry.scale(-1, 1, 1);

        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });

        const sphere = new THREE.Mesh(geometry, material);
        sphereRef.current = sphere;
        scene.add(sphere);
        setIsLoading(false);
      },
      undefined,
      (err) => {
        setError(`Failed to load 360° image: ${err}`);
        setIsLoading(false);
      }
    );

    camera.position.set(0, 0, 0.1);
    camera.updateProjectionMatrix();

    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = true;
    controls.minDistance = 300;
    controls.maxDistance = 700;
    controls.maxPolarAngle = Math.PI;
    controls.minPolarAngle = 0;
    controls.enablePan = false;
    controls.autoRotate = initialAutoRotate;
    controls.autoRotateSpeed = 0.5;

    const handleResize = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameId) cancelAnimationFrame(frameId);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      if (sphereRef.current) {
        sphereRef.current.geometry.dispose();
        //sphereRef.current.material.dispose();
        if ((sphereRef.current.material as THREE.MeshBasicMaterial).map) {
          (sphereRef.current.material as THREE.MeshBasicMaterial).map?.dispose();
        }
      }
    };
  }, [imageUrl, initialAutoRotate]);

  const handleZoomIn = () => {
    if (cameraRef.current) {
      cameraRef.current.fov = Math.max(cameraRef.current.fov - 5, 10);
      cameraRef.current.updateProjectionMatrix();
    }
  };

  const handleZoomOut = () => {
    if (cameraRef.current) {
      cameraRef.current.fov = Math.min(cameraRef.current.fov + 5, 75);
      cameraRef.current.updateProjectionMatrix();
    }
  };

  const handleReset = () => {
    if (controlsRef.current && cameraRef.current) {
      controlsRef.current.reset();
      cameraRef.current.position.set(0, 0, 0.1);
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const toggleAutoRotate = () => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = !controlsRef.current.autoRotate;
      setIsAutoRotating(!isAutoRotating);
    }
  };

  return (
    <div className={styles["viewer360-container"]} style={{ height }}>
      <div
        ref={containerRef}
        className={styles["viewer360-canvas-container"]}
      >
        {isLoading && (
          <div className={styles["viewer360-loading"]}>
            <Loader2 className={styles["viewer360-spinner"]} />
            <div className={styles["viewer360-progress"]}>
              {loadingProgress.toFixed(0)}%
            </div>
          </div>
        )}
        {error && (
          <div className={styles["viewer360-error"]}>
            <p>{error}</p>
          </div>
        )}
        {showControls && (
          <div className={`${styles["viewer360-controls"]} ${controlsTheme}`}>
            <button
              onClick={handleZoomIn}
              title="Zoom In"
              className={styles["viewer360-button"]}
            >
              <ZoomIn className={styles["viewer360-icon"]} />
            </button>
            <button
              onClick={handleZoomOut}
              title="Zoom Out"
              className={styles["viewer360-button"]}
            >
              <ZoomOut className={styles["viewer360-icon"]} />
            </button>
            <button
              onClick={handleReset}
              title="Reset View"
              className={styles["viewer360-button"]}
            >
              <RotateCcw className={styles["viewer360-icon"]} />
            </button>
            <button
              onClick={toggleAutoRotate}
              title={isAutoRotating ? "Stop Rotation" : "Start Rotation"}
              className={styles["viewer360-button"]}
            >
              {isAutoRotating ? (
                <Pause className={styles["viewer360-icon"]} />
              ) : (
                <Play className={styles["viewer360-icon"]} />
              )}
            </button>
            <button
              onClick={handleFullscreen}
              title="Toggle Fullscreen"
              className={styles["viewer360-button"]}
            >
              <Fullscreen className={styles["viewer360-icon"]} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Viewer360;
