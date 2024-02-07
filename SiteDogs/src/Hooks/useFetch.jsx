import React from 'react';

const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Realiza uma requisição fetch e atualiza os estados de dados, carregamento e erro de acordo.
  const request = React.useCallback(async (url, options) => {
    let response;
    let json;

    try {
      setError(null); // Limpa quaisquer erros anteriores
      setLoading(true);
      response = await fetch(url, options);
      json = await response.json();
      if (response.ok === false) throw new Error(json.message); // Lança um erro se a resposta não estiver OK
      setData(json); // Atualiza o estado de dados com os dados recebidos
      setLoading(false);
      console.log(json, response);
    } catch (err) {
      json = null;
      setError(err.message);
    } finally {
      setData(json); // Atualiza o estado de dados com o valor final de JSON
      setLoading(false);
      return { response, json };
    }
  }, []);

  return {
    data,
    loading,
    error,
    request,
  };
};

export default useFetch;
