import React from 'react';
import HeaderDashboard from './HeaderDashboard';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './PostPhoto.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import useFetch from '../../Hooks/useFetch';
import { PHOTO_POST } from '../../api';
import { useNavigate } from 'react-router-dom';
import Head from '../../Helper/Head';

const schema = yup
  .object({
    nome: yup.string().required('Nome obrigatório'),
    peso: yup.string().required('Peso obrigatório'),
    idade: yup.string().required('Idade obrigatório'),
  })
  .required();

const PostPhoto = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [nome, setNome] = React.useState('');
  const [peso, setPeso] = React.useState('');
  const [idade, setIdade] = React.useState('');
  const [img, setImg] = React.useState({});
  const { error, loading, request, data } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) {
      navigate('/conta');
    }
  }, [data, navigate]);

  //Manipula o evento de envio do formulário
  function handlePost() {
    // Cria um novo objeto FormData para armazenar os dados do formulário
    const formData = new FormData();
    formData.append('img', img.raw);
    formData.append('nome', nome);
    formData.append('peso', peso);
    formData.append('idade', idade);

    const token = window.localStorage.getItem('token');
    const { url, options } = PHOTO_POST(formData, token);
    // Faz uma requisição usando a URL e as opções obtidas da função PHOTO_POST
    request(url, options);
  }

  //Função para lidar com a mudança de entrada de imagem
  function handleImg({ target }) {
    // Define a visualização da imagem e os dados brutos
    setImg({
      preview: URL.createObjectURL(target.files[0]), // Cria uma URL de visualização a partir do arquivo selecionado
      raw: target.files[0], // Define os dados brutos do arquivo
    });
  }

  return (
    <>
      <Head title="Poste sua foto" />
      <HeaderDashboard title="Poste sua foto" />
      <section className={`${styles.main} container dashboardMain efeito`}>
        <form className={styles.mainForm} onSubmit={handleSubmit(handlePost)}>
          {/* Nome */}
          <label htmlFor="nome">Nome</label>
          <Input
            register={register}
            id="nome"
            type="text"
            value={nome}
            onChange={({ target }) => setNome(target.value)}
          />
          <p className="messageForm">{errors.nome?.message}</p>

          {/* Peso */}
          <label htmlFor="peso">
            Peso <span>(kg)</span>
          </label>
          <Input
            register={register}
            type="number"
            id="peso"
            value={peso}
            onChange={({ target }) => setPeso(target.value)}
          />
          <p className="messageForm">{errors.peso?.message}</p>

          {/* Idade */}
          <label htmlFor="idade">Idade</label>
          <Input
            register={register}
            type="number"
            id="idade"
            value={idade}
            onChange={({ target }) => setIdade(target.value)}
          />
          <p className="messageForm">{errors.idade?.message}</p>

          {/* File */}
          <input
            className={styles.inputFile}
            type="file"
            name="img"
            id="img"
            onChange={handleImg}
          />

          {loading ? (
            <Button name="Enviando..." disabled />
          ) : (
            <Button name="Enviar" />
          )}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        {/* Cria uma visualização da imagem */}
        <div>
          {img.preview && (
            <div
              className={styles.preview}
              style={{ backgroundImage: `url('${img.preview}')` }}
            ></div>
          )}
        </div>
      </section>
    </>
  );
};

export default PostPhoto;
