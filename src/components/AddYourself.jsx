import React, { useState, useCallback, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import styles from "../assets/css/profile.module.css";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const videoConstraints = {
  width: 600,
  height: 300,
  facingMode: 'user',
};

const Profile = () => {
  const [picture, setPicture] = useState(null);
  const [nameInput, setNameInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [formReset, setFormReset] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    const pictureBlob = dataURLtoBlob(pictureSrc);
    setPicture(pictureBlob);
  }, []);

  const retakePhoto = () => {
    setPicture(null);
    setNameInput('');
  };

  const handleNameChange = (e) => {
    setNameInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!picture) {
      console.log('No picture available to submit.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('image', picture, 'image.jpg');
    formData.append('name', nameInput);

    try {
      const response = await axios.post('http://13.42.98.127:8015/add_image', formData);

      if (response.status === 200) {
        toast.success('Image and text sent to the server successfully.', {
          onClose: () => {
            setFormReset(true);
            setFormSubmitted(true);
          },
        });
      } else {
        toast.error('Failed to send the image and text to the server.');
      }
    } catch (error) {
      toast.error('Error occurred while sending the image and text to the server:');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formReset) {
      setFormReset(false);
      setPicture(null);
      setNameInput('');
    }
  }, [formReset]);

  useEffect(() => {
    if (formSubmitted) {
      setFormSubmitted(false);
    }
  }, [formSubmitted]);
  
  function dataURLtoBlob(dataURL) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  return (
    <div className={styles.container}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <div className={styles.content}>
          {picture === null ? (
            <Webcam
              audio={false}
              height={300}
              ref={webcamRef}
              width={600}
              screenshotFormat="image/jpg"
              videoConstraints={videoConstraints}
            />
          ) : (
            <img src={URL.createObjectURL(picture)} alt="Captured" />
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {picture !== null && (
            <input
              style={{
                padding: "10px",
                margin: "3px",
                fontSize: "14px",
                width: "80%",
              }}
              type="text"
              value={nameInput}
              onChange={handleNameChange}
              placeholder="Enter text"
              required
            />
          )}
          {picture !== null && (
            <div>
              <button
                onClick={retakePhoto}
                style={{
                  padding: "10px 40px",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "rgb(0, 0, 143)",
                  color: 'white',
                  marginRight: "20px"
                }}
              >
                Retake
              </button>
              <button
                type="submit"
                style={{
                  padding: "10px 40px",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "rgb(0, 0, 143)",
                  color: 'white',
                  margin: "10px 0",
                }}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Submit'}
              </button>
            </div>
          )}
          {picture === null && (
            <button
              onClick={capture}
              style={{
                padding: "10px 40px",
                border: "none",
                borderRadius: "8px",
                backgroundColor: "rgb(0, 0, 143)",
                color: 'white',
                margin: "10px",
              }}
            >
              Capture
            </button>
          )}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Profile;
