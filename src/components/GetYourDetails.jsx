import React, { useState, useCallback, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import Modal from './Modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const videoConstraints = {
  width: 600,
  height: 300,
  facingMode: 'user',
};

const GetYourDetails = () => {
  const [picture, setPicture] = useState(null);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const webcamRef = useRef(null);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    window.location.reload();
  };

  const capture = useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
    setModal(false);
  }, []);

  const retakePhoto = () => {
    setPicture(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!submitButtonClicked) {
      return;
    }

    setLoading(true);

    const convertedPicture = await fetch(picture)
      .then((res) => res.blob())
      .catch((error) => {
        console.log('Error occurred while converting picture to Blob:', error);
        return null;
      });

    if (convertedPicture === null) {
      console.log('Failed to convert picture to Blob.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('image', convertedPicture);
    try {
      const response = await axios.post('http://13.42.98.127:8015/faceVer', formData);
      if (response.status === 200) {
        // if(response.data.name){
        //   openModal();
        //   setName(response.data.name);
        // }
        // else{
        //   toast.error("Unable to recognize the face")
        // }
        openModal();
      } else {
        toast.error('Failed to send the image to the server.');
      }
    } catch (error) {
      toast.error('Error occurred while sending the image to the server:', error);
    } finally {
      setLoading(false);
      setSubmitButtonClicked(false);
    }
  };

  useEffect(() => {
    if (submitButtonClicked && !loading && modal) {
      setPicture(null);
      setName('');
    }
  }, [submitButtonClicked, loading, modal]);


  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onSubmit={handleSubmit}
        >
          <div>
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
              <img src={picture} alt="Captured" />
            )}
          </div>
          <div>
            {picture !== null ? (
              <>
                <button
                  onClick={retakePhoto}
                  style={{
                    padding: '10px 40px',
                    border: 'none',
                    borderRadius: '8px',
                    backgroundColor: 'rgb(0, 0, 143)',
                    color: 'white',
                    margin: '10px',
                  }}
                >
                  Retake
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 40px',
                    border: 'none',
                    borderRadius: '8px',
                    backgroundColor: 'rgb(0, 0, 143)',
                    color: 'white',
                    margin: '10px',
                  }}
                  disabled={loading || !picture}
                  onClick={() => setSubmitButtonClicked(true)}
                >
                  {loading ? 'Loading...' : 'Submit'}
                </button>
              </>
            ) : (
              <button
                onClick={capture}
                style={{
                  padding: '10px 40px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: 'rgb(0, 0, 143)',
                  color: 'white',
                  margin: '10px',
                }}
              >
                Capture
              </button>
            )}
          </div>
        </form>
      </div>
      {modal && (
        <Modal isOpen={modal} onClose={closeModal}>
          <h2>Face Successfully Recognized</h2>
          <br />
          <p>Name: {name}</p>
        </Modal>
      )}
      <ToastContainer />
    </>
  );
};

export default GetYourDetails;
