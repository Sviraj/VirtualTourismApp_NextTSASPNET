import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Login.module.css";
import API_CONFIG from "../api/apiConfig";
import Link from "next/link";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(API_CONFIG.getFullUrl("auth") + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials or server error");
      }

      // Store token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.userName);

      // Set token expiration
      const expirationTime = new Date().getTime() + data.expiresIn * 1000;
      localStorage.setItem("tokenExpiration", expirationTime.toString());

      router.push("/"); // Navigate to the home page
    } catch (error) {
      console.error("login error", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://localhost:7234/api/Auth/google-login";
  };

  return (
    <div className={styles["login-container"]}>
      <form className={styles["login-form"]} onSubmit={handleLogin}>
        <h2>Login</h2>

        {error && <div className={styles["error-message"]}>{error}</div>}

        <div className={styles["form-group"]}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            autoComplete="email"
          />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            autoComplete="current-password"
          />
        </div>

        <Link href="/forgot-password" className={styles["forgot-pw-link"]}>
          Forget Password
        </Link>

        <button
          type="submit"
          className={styles["btn-primary"]}
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Login"}
        </button>

        <p className={styles["login-link"]}>
        Don&apos;t have an account?{" "}
          <Link href="/register">Create Account</Link>
        </p>

        <div className={styles["divider"]}>OR</div>

        <div className={styles["google-login"]}>
          <button
            type="button"
            className={styles["btn-google"]}
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            Sign in with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
