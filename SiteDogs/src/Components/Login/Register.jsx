import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { USER_POST } from '../../api';
import { UserContext } from '../../UserContext';
import useFetch from '../../Hooks/useFetch';
import Head from '../../Helper/Head';

const schema = yup
  .object({
    username: yup.string().required('Usuário obrigatório'),
    email: yup.string().email('Email inválido').required('Email obrigatório'),
    password: yup
      .string()
      .required('Senha obrigatória')
      .min(3, 'No mínimo 3 digitos'),
  })
  .required();

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { userLogin } = React.useContext(UserContext);
  const { error, loading, request } = useFetch();

  async function handleRegister() {
    const { url, options } = USER_POST({ username, email, password });
    const { response } = await request(url, options);
    if (response.ok) userLogin(username, password);
  }

  return (
    <section className="login">
      <Head title="Cadastro" />
      <div>
        <img
          src="../image/dog_login.png"
          alt=""
          className="responsiveImageLogin"
        />
      </div>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="loginForm efeito"
      >
        <h1 className="title">
          <span></span>Cadastre-se
        </h1>

        {/* Usuário */}
        <label htmlFor="username">Usuário</label>
        <Input
          register={register}
          type="text"
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <p className="messageForm">{errors.username?.message}</p>

        {/* Email */}
        <label htmlFor="email">Email</label>
        <Input
          register={register}
          type="text"
          id="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <p className="messageForm">{errors.email?.message}</p>

        {/* Senha */}
        <label htmlFor="password">Senha</label>
        <Input
          register={register}
          id="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <p className="messageForm">{errors.password?.message}</p>

        {loading ? (
          <Button name="Cadastrando..." disabled />
        ) : (
          <Button name="Cadastrar" type="submit" />
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </section>
  );
};

export default Register;
