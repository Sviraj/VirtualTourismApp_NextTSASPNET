import React from "react";
import styles from "../../styles/Subscription.module.css"; // Import CSS module

const SubscriptionPlans: React.FC = () => {
  return (
    <div className={styles["subscription-container"]}>
      <h1 className={styles["main-title"]}>Upgrade your plan</h1>

      <div className={styles["plan-toggle"]}>
        <button className={`${styles["toggle-btn"]} ${styles["active"]}`}>Personal</button>
        <button className={styles["toggle-btn"]}>Business</button>
      </div>

      <div className={styles["plans-grid"]}>
        {/* Free Plan */}
        <div className={styles["plan-card"]}>
          <h2 className={styles["plan-name"]}>Free</h2>
          <div className={styles["price"]}>
            <span className={styles["currency"]}>$</span>
            <span className={styles["amount"]}>0</span>
            <span className={styles["period"]}>USD/month</span>
          </div>
          <p className={styles["plan-description"]}>
            Can Access All the free 360 photos and videos
          </p>
          <button className={`${styles["plan-button"]} ${styles["disabled"]}`}>
            Your current plan
          </button>
          <ul className={styles["features-list"]}>
            <li>Access to free 360 images</li>
            <li>Standard photo Grallary</li>
            <li>Access to free videos</li>
            <li>Limited access to watch 360 photos and videos</li>
            <li>Experienced Limited</li>
          </ul>
          <div className={styles["plan-footer"]}>
            <a href="#" className={styles["help-link"]}>
              Have an existing plan? See billing help
            </a>
          </div>
        </div>

        {/* Plus Plan */}
        <div className={`${styles["plan-card"]} ${styles["popular"]}`}>
          <div className={styles["popular-tag"]}>POPULAR</div>
          <h2 className={styles["plan-name"]}>Plus</h2>
          <div className={styles["price"]}>
            <span className={styles["currency"]}>$</span>
            <span className={styles["amount"]}>20</span>
            <span className={styles["period"]}>USD/month</span>
          </div>
          <p className={styles["plan-description"]}>
            Level up creativity with expanded access 360 images / Videos
          </p>
          <button className={`${styles["plan-button"]} ${styles["primary"]}`}>
            Get Plus
          </button>
          <ul className={styles["features-list"]}>
            <li>Everything in Free</li>
            <li>Extended limits on watching 360 images and videos</li>
            <li>Access to advanced videos and images</li>
            <li>Limited access to photo gallery</li>
            <li>Opportunities to test new features</li>
            <li>Allow access to high quality videos / images</li>
            <li>Limited access to video duration</li>
          </ul>
          <div className={styles["plan-footer"]}>
            <a href="#" className={styles["help-link"]}>
              Limits apply
            </a>
          </div>
        </div>

        {/* Pro Plan */}
        <div className={styles["plan-card"]}>
          <h2 className={styles["plan-name"]}>Pro</h2>
          <div className={styles["price"]}>
            <span className={styles["currency"]}>$</span>
            <span className={styles["amount"]}>200</span>
            <span className={styles["period"]}>USD/month</span>
          </div>
          <p className={styles["plan-description"]}>
            Get the best of experience with the highest level of access
          </p>
          <button className={`${styles["plan-button"]} ${styles["secondary"]}`}>
            Get Pro
          </button>
          <ul className={styles["features-list"]}>
            <li>Everything in Plus</li>
            <li>Unlimited access to 360 photos and videos</li>
            <li>Higher limits for video and 360 images</li>
            <li>Access to unlimited user experience</li>
            <li>Extended access to images and videos</li>
          </ul>
          <div className={styles["plan-footer"]}>
            <a href="#" className={styles["help-link"]}>
              I need help with a billing issue
            </a>
            <p className={styles["footnote"]}>
              Unlimited user experience available. Learn more
            </p>
          </div>
        </div>
      </div>

      <div className={styles["enterprise-section"]}>
        <p>Need more capabilities for your business?</p>
        <a href="#" className={styles["enterprise-link"]}>
          See the user Guideline
        </a>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
