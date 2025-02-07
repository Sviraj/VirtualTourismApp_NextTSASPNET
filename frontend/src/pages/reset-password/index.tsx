import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../../styles/ResetPassword.module.css"; // Import the CSS module

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState<string>(""); // State for new password
  const [confirmPassword, setConfirmPassword] = useState<string>(""); // State for confirm password
  const [message, setMessage] = useState<string>(""); // State for success/error message
  const router = useRouter();

  const { token, email } = router.query;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7234/api/Auth/reset-password",
        {
          token,
          email,
          newPassword,
        }
      );

      console.log("Response data:", response.data);
      setMessage(response.data); // Show success message

      // Redirect to login page after 5 seconds
      setTimeout(() => {
        router.push("/login");
      }, 5000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error
        setMessage(error.response?.data || "An error occurred");
      } else if (error instanceof Error) {
        // General error
        setMessage(error.message);
      } else {
        // Unknown error
        setMessage("An unknown error occurred");
      }
    }
  };

  return (
    <div className={styles["reset-password-container"]}>
      <h2>Reset Password</h2>
      <form className={styles["reset-password-form"]} onSubmit={handleSubmit}>
        <label htmlFor="newPassword">New Password:</label>
        <input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter your new password"
          required
          className={styles["input-field"]}
        />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your new password"
          required
          className={styles["input-field"]}
        />
        <button type="submit" className={styles["submit-button"]}>
          Reset Password
        </button>
      </form>
      {message && <p className={styles["message"]}>{message}</p>}
    </div>
  );
};

export default ResetPassword;
