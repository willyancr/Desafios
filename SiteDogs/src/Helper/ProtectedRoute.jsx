import React from 'react';
import { UserContext } from '../UserContext';
import { Navigate } from 'react-router-dom';

//Um componente de rota protegida que só renderiza seus filhos se o usuário estiver logado.
//Se o usuário não estiver logado, ele redireciona para a página de login.
//Se o usuário estiver logado, ele renderiza seus filhos...
const ProtectedRoute = ({ children }) => {
  const { login } = React.useContext(UserContext);
  
  if (login === true) {
    return children;
  } else if (login === false) {
    return <Navigate to="/login" />;
  } else {
    return <></>;
  }
};

export default ProtectedRoute;
