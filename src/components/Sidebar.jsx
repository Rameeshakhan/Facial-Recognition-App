import React, { useState } from 'react';
import styles from '../assets/css/sidebar.module.css';
import logo from "../assets/images/logo.png";
import wallpaper from "../assets/images/wallpaper.jpg"
import AddYourself from "./AddYourself";
import GetYourDetails from './GetYourDetails';

const Sidebar = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleAddBtn = () => {
    setActiveButton('add');
  };

  const handleVerifyBtn = () => {
    setActiveButton('verify');
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>
      {activeButton === null && (
        <div className={styles.centerContent}>
          {/* <img src={wallpaper} alt="Placeholder" className={styles.placeholderImage} /> */}
          <p className={styles.centerText}>Welcome to our revolutionary AI-integrated application, where you'll embark on a fascinating journey of personal recognition. By adding your photograph and name, our advanced system saves your data and undergoes continuous training to recognize your unique identity. When it's time to verify, simply capture a photo of yourself and let the AI work its magic. Experience the thrill of witnessing our cutting-edge technology decipher your true self, unlocking the secrets of personal recognition like never before.</p>
        </div>
      )}
      <div className={styles.btnClassDiv}>
        <button
          onClick={handleAddBtn}
          className={`${styles.button} ${activeButton === 'add' ? styles.activeButton : ''}`}
        >
          Add Yourself
        </button>
        <button
          onClick={handleVerifyBtn}
          className={`${styles.button} ${activeButton === 'verify' ? styles.activeButton : ''}`}
        >
          Verify Yourself
        </button>
      </div>
      <div className={styles.contentDiv}>
        {activeButton === 'add' && <AddYourself />}
        {activeButton === 'verify' && <GetYourDetails />}
      </div>
    </div>
  );
};

export default Sidebar;
