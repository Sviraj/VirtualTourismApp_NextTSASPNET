import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";

const Callback: React.FC = () => {
  const router = useRouter();
  const hasNavigated = useRef<boolean>(false); // Ref does not cause re-renders

  useEffect(() => {
    if (hasNavigated.current) return; // Prevent duplicate execution

    // Extract token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const expiresIn = urlParams.get("expiresIn");

    console.log("Token received:", token);
    console.log("Received expires time:", expiresIn);

    if (expiresIn) {
      // For token expiration
      const expirationTime =
        new Date().getTime() + parseInt(expiresIn, 10) * 1000;
      localStorage.setItem("tokenExpiration", expirationTime.toString());
      console.log("Expiration Time:", expirationTime);
    }

    if (token) {
      // Store the token securely
      localStorage.setItem("authToken", token);

      console.log("Navigating to /home");
      hasNavigated.current = true; // Mark as navigated
      router.push("/");
    } else {
      console.log("Navigating to /login");
      alert("Authentication failed. Please try again.");
      hasNavigated.current = true; // Mark as navigated
      router.push("/login");
    }
  }, [router]);

  return <div>Processing...</div>;
};

export default Callback;
