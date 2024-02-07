import React from 'react';
import FeedPhoto from './FeedPhotos';
import Modal from './Modal';
import InfiniteScroll from 'react-infinite-scroll-component';
import useFetch from '../../Hooks/useFetch';
import { PHOTOS_GET } from '../../api';
import PropTypes from 'prop-types';

// Componente para exibir o feed de fotos
const Feed = ({ user }) => {
  const [modalPhoto, setModalPhoto] = React.useState(null); //controlar a imagem modal
  const [page, setPage] = React.useState(1); //controlar a página atual de fotos
  const [hasMore, setHasMore] = React.useState(true); //determinar se há mais fotos para carregar
  const [photos, setPhotos] = React.useState([]); //armazenar o array de fotos
  const { error, request } = useFetch();

  React.useEffect(() => {
    async function fetchPhotos() {
      const total = 6;
      const { url, options } = PHOTOS_GET({ page, total, user });
      const { response, json } = await request(url, options);
      // Se a resposta for OK, verifica se há mais fotos para carregar
      if (response && response.ok) {
        setPhotos((photos) => [...photos, ...json]); // Adiciona as novas fotos
        if (json.length < total) setHasMore(false); // Se não houver mais fotos para carregar, define hasMore como falso
      }
    }
    fetchPhotos();
  }, [request, user, page]);

  const fetchMorePhotos = async () => {
    setPage((prevPage) => prevPage + 1); // Incrementa a página
  };
  if (error) return <p>{error}</p>;
  return (
    <div>
      {/* Exibir modal */}
      {modalPhoto && (
        <Modal photo={modalPhoto} onClose={() => setModalPhoto(null)} />
      )}
      {/* Scroll infinito */}
      <InfiniteScroll
        dataLength={photos.length} // Comprimento atual da lista de fotos
        next={fetchMorePhotos} // Função para carregar mais fotos
        hasMore={hasMore} // Se ainda há mais fotos para carregar
        loader={
          <p
            style={{
              textAlign: 'center',
              marginTop: '2rem',
              marginBottom: '2rem',
              fontStyle: 'italic',
            }}
          >
            {' '}
            Carregando mais fotos...
          </p>
        }
      >
        {/* Componente para exibir fotos do feed */}
        <FeedPhoto
          key={photos}
          user={user}
          photos={photos}
          setModalPhoto={setModalPhoto}
        />
      </InfiniteScroll>
    </div>
  );
};
// Definir as propriedades do componente
Feed.defaultProps = {
  user: 0,
};
Feed.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired,
  ]),
};
export default Feed;
