import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import profileImage from "../images/profile.png";
import styles from "../styles/Navbar.module.css";
import TypingLoop from "./Typingloop";
import { Globe } from "lucide-react";

const Navbar: React.FC = ({}) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Check if the current route is '/360image'
  const is360ImageActive = router.pathname === "/image360page";
  const is360VideoActive = router.pathname === "/video360page";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const authtoken = localStorage.getItem("authToken");
    if (authtoken || token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("tokenExpiration");
    setIsAuthenticated(false);
    router.push("/");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const onPhotoClick = () => {
    router.push("/image360page");
  };
  const onVideoClick = () => {
    router.push("/video360page");
  };
  const onPhotoGalleryClick = () => {
    router.push("/photo-gallery");
  };

  return (
    <nav className={styles["navbar"]}>
      <div className={styles["navbar-logo"]} onClick={() => router.push("/")}>
        <Globe size={32} />
        <div className={styles["navbar-title"]}>
          <TypingLoop text="Virtual-Tourism" speed={400} />
        </div>
      </div>

      <ul className={styles["navbar-links"]}>
        <li>
          <button
            className={`${styles["navigation-btn"]} ${
              is360ImageActive ? styles["active"] : ""
            }`}
            onClick={onPhotoClick}
          >
            360 Photo
          </button>
        </li>
        <li>
          <button
            className={`${styles["navigation-btn"]} ${
              is360VideoActive ? styles["active"] : ""
            }`}
            onClick={onVideoClick}
          >
            360 Video
          </button>
        </li>
        <li>
          <button
            className={styles["navigation-btn"]}
            onClick={onPhotoGalleryClick}
          >
            Photogallery
          </button>
        </li>
      </ul>

      <div className={styles["profile-section"]}>
        {!isAuthenticated ? (
          <button
            className={styles["sign-in-btn"]}
            onClick={() => router.push("/login")}
          >
            Sign In
          </button>
        ) : (
          <>
            <Image
              src={profileImage}
              alt="Profile"
              className={styles["profile-icon"]}
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <div className={styles["dropdown-menu"]}>
                <li onClick={() => router.push("/profile")}>Account</li>
                <li onClick={() => router.push("/subscriptionPlans")}>
                  Upgrade Plans
                </li>
                <li onClick={handleLogout}>Logout</li>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
