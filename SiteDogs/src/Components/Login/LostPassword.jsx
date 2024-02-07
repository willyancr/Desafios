import React from 'react';
import './LoginGlobal.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../Input/Input';
import Button from '../Button/Button';
import useFetch from '../../Hooks/useFetch';
import { PASSWORD_LOST } from '../../api';
import Head from '../../Helper/Head';

const schema = yup
  .object({
    email: yup.string().required('Digite seu email'),
  })
  .required();

const LostPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [email, setEmail] = React.useState('');
  const { error, loading, request, data } = useFetch();

  async function onSubmit() {
    if (email) {
      const { url, options } = PASSWORD_LOST({
        email,
        url: 'http://localhost:5173/login/perdeu',
      });
      await request(url, options);
    }
  }
  return (
    <section className="login">
      <Head title="Perdeu a senha?" />
      <div>
        <img
          src="../image/dog_login.png"
          alt=""
          className="responsiveImageLogin"
        />
      </div>
      {data ? (
        <p style={{ color: 'green' }}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="loginForm efeito">
          <h1 className="title">
            <span></span>Perdeu a senha?
          </h1>

          <label htmlFor="email">Email</label>
          <Input
            register={register}
            id="email"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="messageForm">{errors.email?.message}</p>
          {loading ? (
            <Button name="Solicitando..." disabled />
          ) : (
            <Button name="Recuperar" type="submit" />
          )}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      )}
    </section>
  );
};

export default LostPassword;
