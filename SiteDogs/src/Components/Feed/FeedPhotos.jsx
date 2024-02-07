import React from 'react';
import styles from './FeedPhotos.module.css';
import useFetch from '../../Hooks/useFetch';
import FeedPhotoItem from './FeedPhotoItem';

// Componente para exibir um feed de fotos
const FeedPhoto = ({ setModalPhoto, photos }) => {
  const { error } = useFetch();

  if (error) return <p>{error}</p>;
  // Exibir feed de fotos
  return (
    <section>
      <div className={`${styles.home} container efeito`}>
        <ul className={styles.ulFeed}>
          {photos &&
            photos.map((photo) => (
              <FeedPhotoItem
                key={photo.id}
                photo={photo}
                setModalPhoto={setModalPhoto}
              />
            ))}
        </ul>
      </div>
    </section>
  );
};

export default FeedPhoto;
