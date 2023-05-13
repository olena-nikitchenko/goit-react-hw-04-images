import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ item }) => {
  const [showModal, setShowModal] = useState(false);

  const onModal = () => {
    setShowModal(prevState => !prevState);
  };

  const { webformatURL } = item;

  return (
    <li className={css.Item}>
      <img
        onClick={onModal}
        className={css.Image}
        src={webformatURL}
        alt="img"
      />
      {showModal && <Modal onClose={onModal} image={item} />}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.object,
};

export default ImageGalleryItem;
