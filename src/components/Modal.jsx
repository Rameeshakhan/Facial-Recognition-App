import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../assets/css/modal.module.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className={styles['modal-overlay']} />
      <div className={styles['modal-wrapper']}>
        <div className={styles['modal-content']}>
          <button onClick={onClose} className={styles['close-button']}>
            <span className={styles['close-icon']}>&times;</span>
          </button>
          {children}
        </div>
      </div>
    </>,
    document.getElementById('modal-root')
  );
};

export default Modal;
