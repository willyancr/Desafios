import React from 'react';
import styles from './Modal.module.css';
import { Link } from 'react-router-dom';
import PhotoComment from './PhotoComment';
import { UserContext } from '../../UserContext';
import PhotoDelete from './PhotoDelete';

// Este componente renderiza o conteúdo da foto com modal e detalhes
const PhotoContent = ({ handleModalClick, dados }) => {
  const { photo, comments } = dados;
  const { data } = React.useContext(UserContext);

  return (
    <div onClick={handleModalClick} className={styles.modalContainer}>
      {/* Imagem */}
      <div className={styles.modalImg}>
        <img src={photo.src} alt={photo.title} />
      </div>
      {/* Infos da imagem */}
      <div className={styles.modalForm}>
        {/* Visualizacoes e autor */}
        <p className={styles.modalViews}>
          {data && data.username === photo.author ? (
            <PhotoDelete id={photo.id} />
          ) : (
            <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
          )}
          <span>
            <i className="fa-regular fa-eye"></i> {photo.acessos}
          </span>
        </p>
        {/* Titulo */}
        <h1>
          <Link to={`/foto/${photo.id}`} className={styles.modalTitle}>
            <span></span>
            {photo.title}
          </Link>
        </h1>
        {/* Peso e Idade */}
        <ul className={styles.modalDogInfos}>
          <li>| {photo.peso} kg</li>
          <li>
            |{' '}
            {+photo.idade === 1 ? `${photo.idade} ano` : `${photo.idade} anos`}
          </li>
        </ul>
      </div>
      {/* Componente de comentarios */}
      <PhotoComment id={photo.id} comments={comments} />
    </div>
  );
};

export default PhotoContent;
