import React from 'react';
import styles from './Modal.module.css';
import Loading from '../../Helper/Loading';
import useFetch from '../../Hooks/useFetch';
import { PHOTO_GET } from '../../api';
import PhotoContent from './PhotoContent';

const Modal = ({ onClose, photo }) => {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id);
    request(url, options);
  }, [request, photo]);

  function handleModalClick(e) {
    e.stopPropagation(); // Impedir que o clique se propague para o conteúdo do modal
  }
  return (
    <div onClick={onClose} className={styles.modal}>
      {error && <p>{error}</p>}
      {loading && <Loading />}
      {data && <PhotoContent dados={data} handleModalClick={handleModalClick}/>}
    </div>
  );
};

export default Modal;
