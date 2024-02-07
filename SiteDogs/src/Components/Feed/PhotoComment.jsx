import React from 'react';
import styles from './Modal.module.css';
import { COMMENT_POST } from '../../api';
import { UserContext } from '../../UserContext';
import useFetch from '../../Hooks/useFetch';
import { Link } from 'react-router-dom';

//Componente para exibição e adição de comentários a uma foto
const PhotoComment = ({ id, comments }) => {
  const [comment, setComment] = React.useState(''); // Estado para os novos comentários
  const [commentsList, setCommentsList] = React.useState(() => comments); // Estado para a lista de comentários
  const commentSection = React.useRef(null); // Ref para a lista de comentários
  const { login } = React.useContext(UserContext);

  const { request } = useFetch();

  React.useEffect(() => {
    commentSection.current.scrollTop = commentSection.current.scrollHeight; // Rolagem automática da lista de comentários
  }, [commentsList]);

  // Função de envio para adicionar novos comentários
  async function handleSubmit(e) {
    e.preventDefault();
    const { url, options } = COMMENT_POST(id, { comment });
    const { response, json } = await request(url, options);
    if (response.ok) {
      setCommentsList((comments) => [...comments, json]); // Atualiza a lista de comentários com o novo comentário
      setComment('');
    }
  }
  return (
    <>
      {/* Exibe comentários */}
      <ul ref={commentSection} className={styles.modalComments}>
        {commentsList.map((comment) => (
          <>
            <li key={comment.comment_ID}>
              <b>{comment.comment_author}:</b>
              <span>{comment.comment_content}</span>
            </li>
          </>
        ))}
      </ul>

      {/* Exibe input de comentário */}
      {login ? (
        <form onClick={handleSubmit} className={styles.modalSendMsg}>
          <textarea
            name="comment"
            id="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            placeholder="Comente..."
          ></textarea>
          <button>
            <i className="fa-solid fa-square-arrow-up-right fa-2xl"></i>
          </button>
        </form>
      ) : (
        <form className={styles.modalSendMsg}>
          <textarea
            placeholder="Faça o login para comentar..."
            disabled
          ></textarea>
          <Link to="/login">
            <button>
              <i className="fa-solid fa-user fa-2xl"></i>
            </button>
          </Link>
        </form>
      )}
    </>
  );
};

export default PhotoComment;
