import React from 'react';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET} from './api';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  //Faz login automaticamente do usuário se um token estiver presente no armazenamento local
  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token'); // Obter o token do armazenamento local
      // Verificar se um token está presente
      if (token) {
        setError(null);
        setLoading(true);
        try {
          // Validar o token
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          // Se a resposta não estiver ok, lançar um erro
          if (!response.ok) throw new Error('Token inválido');
          await getUser(token); // Obter os dados do usuário usando o token
        } catch (error) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, []);

  //Obtém os dados do usuário do servidor usando um token.
  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json); // Atualiza os dados do usuário com o JSON obtido
    setLogin(true); // Define o status de login como true
    console.log(json);
  }
  //Faz a autenticação de um usuário com o nome de usuário e senha fornecidos.
  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      // Obter o token
      const { url, options } = TOKEN_POST({ username, password });
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const { token } = await response.json(); // Faz o parse da resposta JSON para obter o token.
      window.localStorage.setItem('token', token); // Armazena o token no armazenamento local.
      await getUser(token); // Obtém os detalhes do usuário usando o token.
      navigate('/conta'); // Navega para a página da conta.
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  async function userLogout() {
    setData(null);
    setLogin(false);
    setLoading(false);
    setError(null);
    window.localStorage.removeItem('token');
  }

  return (
    <UserContext.Provider
      value={{
        userLogin,
        userLogout,
        data,
        login,
        error,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
