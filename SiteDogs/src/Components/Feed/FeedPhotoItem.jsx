import React from 'react';
import styles from './FeedPhotos.module.css';

//Componente funcional para renderizar um item de foto no feed
const FeedPhotoItem = ({ photo, setModalPhoto }) => {
  function handleClick() {
    setModalPhoto(photo);
  }
  return (
    <div onClick={handleClick} className={styles.imageDogsFeed}>
      <li>
        <img src={photo.src} alt={photo.title} />
      </li>
      <span className={styles.views}>
        <i className="fa-regular fa-eye" style={{ color: '#fff' }}></i>{' '}
        {photo.acessos}
      </span>
    </div>
  );
};

export default FeedPhotoItem;
