export const url = 'https://dogsapi.origamid.dev/json';

//Retorna o objeto de configuração para fazer uma requisição POST para o endpoint de token.
export const TOKEN_POST = (body) => {
  return {
    url: url + '/jwt-auth/v1/token',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
};

// Verifica se o token é valido.
export const TOKEN_VALIDATE_POST = (token) => {
  return {
    url: url + '/jwt-auth/v1/token/validate',
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
};

//Gera um objeto de configuração de requisição GET para recuperar os dados do usuário.
export const USER_GET = (token) => {
  return {
    url: url + '/api/user',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
};

//Gera um objeto de configuração de requisição POST para criar um novo usuário.
export const USER_POST = (body) => {
  return {
    url: url + '/api/user',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
};

export const PHOTO_POST = (formData, token) => {
  return {
    url: url + '/api/photo',
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer' + token,
      },
      body: formData,
    },
  };
};

export const PHOTOS_GET = ({ page, total, user }) => {
  return {
    url: `${url}/api/photo/?_page=${page}&_total=${total}&_user=${user}`,
    options: {
      method: 'GET',
      cache: 'no-store',
    },
  };
};

export const PHOTO_GET = (id) => {
  return {
    url: `${url}/api/photo/${id}`,
    options: {
      method: 'GET',
      cache: 'no-store',
    },
  };
};

export const PHOTO_DELETE = (id) => {
  return {
    url: `${url}/api/photo/${id}`,
    options: {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer' + window.localStorage.getItem('token'),
      },
    },
  };
};

export const COMMENT_POST = (id, body) => {
  return {
    url: `${url}/api/comment/${id}`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + window.localStorage.getItem('token'),
      },
      body: JSON.stringify(body),
    },
  };
};

export const PASSWORD_LOST = (body) => {
  return {
    url: `${url}/api/password/lost`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
};

export const STATS_GET = () => {
  return {
    url: `${url}/api/stats`,
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer' + window.localStorage.getItem('token'),
      },
    },
  };
};
