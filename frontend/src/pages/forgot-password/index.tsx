import React, { useState } from "react";
import axios, {AxiosError} from "axios";
import styles from "../../styles/ForgetPassword.module.css"; // Import the CSS module

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>(""); // Type annotation for string
  const [message, setMessage] = useState<string>(""); // Type annotation for string

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload on form submission

    try {
      const response = await axios.post("https://localhost:7234/api/Auth/forgot-password", {
        email,
      });

      console.log("Forgot Password Response", response);
      setMessage("Password reset link has been sent to your email."); // Show success message
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Now TypeScript knows error is an AxiosError
        console.error("Forgot Password Error", error);
        setMessage(error.response?.data || "Something went wrong.");
      } else {
        // Handle any non-Axios errors
        console.error("Unexpected Error", error);
        setMessage("Something went wrong.");
      }
    }
  };

  return (
    <div className={styles["forgot-password-container"]}>
      <h2>Forgot Password</h2>
      <form className={styles["forgot-password-form"]} onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className={styles["email-input"]}
        />
        <button type="submit" className={styles["submit-button"]}>
          Send Reset Link
        </button>
      </form>
      {message && <p className={styles["message"]}>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
