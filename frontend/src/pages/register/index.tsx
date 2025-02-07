import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Register.module.css";
import Link from "next/link";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const validatePassword = (password: string): string => {
    const minLength = /.{6,}/;
    const hasNonAlphanumeric = /[^a-zA-Z0-9]/;
    const hasLowercase = /[a-z]/;
    const hasUppercase = /[A-Z]/;

    if (!minLength.test(password))
      return "Password must be at least 6 characters long.";
    if (!hasNonAlphanumeric.test(password))
      return "Password must contain at least one non-alphanumeric character.";
    if (!hasLowercase.test(password))
      return "Password must contain at least one lowercase letter.";
    if (!hasUppercase.test(password))
      return "Password must contain at least one uppercase letter.";
    return "";
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = validatePassword(password);

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await fetch("https://localhost:7234/api/Auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error("Registration failed or server error");

      alert("Registration successful! Please log in.");
      router.push("/"); // Navigate to the home page
    } catch (error) {
      console.error("Registration error:", error);
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className={styles["register-container"]}>
      <form className={styles["register-form"]} onSubmit={handleRegister}>
        <h2 className={styles["form-title"]}>Create Your Account</h2>
        <div className={styles["form-group"]}>
          <label htmlFor="username" className={styles["form-label"]}>
            Email Address
          </label>
          <input
            type="email"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your email"
            required
            className={styles["form-input"]}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="password" className={styles["form-label"]}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className={styles["form-input"]}
          />
        </div>
        {error && <p className={styles["error-message"]}>{error}</p>}
        <button type="submit" className={styles["submit-button"]}>
          Register
        </button>
        <p className={styles["login-link"]}>
          Already have an account? 
          <Link href="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
