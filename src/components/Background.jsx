import React from 'react';
import gif from "../assets/images/linkface.gif";
import { useNavigate } from 'react-router-dom';

const Background = () => {
  const navigate = useNavigate()

  const handleBtn = () => {
    navigate("/app")
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <img
        src={gif}
        alt="Background Image"
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          border: '5px solid gray',
          borderRadius: '10px',
          backgroundColor: 'white',
        }}
      />
      <button
        style={{
          marginTop: '20px',
          padding: '15px 20px',
          border: 'none',
          borderRadius: '10px',
          backgroundColor: 'rgb(183, 43, 66)',
          width: '20%',
          color: 'white',
          transition: 'transform 0.3s ease-in-out',
        }}
        className="hover-effect"
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'white';
          e.target.style.color = 'rgb(183, 43, 66)';
          e.target.style.transform = 'translateY(-5px)';
          e.target.style.border = '2px solid rgb(183, 43, 66) ';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'rgb(183, 43, 66)';
          e.target.style.color = 'white';
          e.target.style.transform = 'translateY(0)';
        }}
        onClick={handleBtn}
      >
        Get Started
      </button>
    </div>
  );
};

export default Background;
