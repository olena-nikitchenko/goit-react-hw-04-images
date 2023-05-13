import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const ModalRoot = document.querySelector('#ModalRoot');

const Modal = ({ image, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const onKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const onOverlayClose = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const { largeImageURL } = image;

  return createPortal(
    <div onClick={onOverlayClose} className={css.Overlay}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="img" />
      </div>
    </div>,
    ModalRoot
  );
};

Modal.propTypes = {
  image: PropTypes.object,
  onClose: PropTypes.func,
};

export default Modal;
