import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import LostPassword from './Components/Login/LostPassword';
import Register from './Components/Login/Register';
import HomeDashboard from './Components/Account/HomeDashboard';
import Statistics from './Components/Account/Statistics';
import PostPhoto from './Components/Account/PostPhoto';
import Modal from './Components/Feed/Modal';
import { UserStorage } from './UserContext';
import ProtectedRoute from './Helper/ProtectedRoute';
import Photo from './Components/Feed/Photo';
import NotFound from './Components/NotFound';
import UserPerfil from './Components/Feed/UserPerfil';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <UserStorage>
          <div className="AppBody">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/login/perdeu" element={<LostPassword />} />
              <Route path="/login/cadastrar" element={<Register />} />
              <Route path="/conta" element={<ProtectedRoute><HomeDashboard /></ProtectedRoute>} />
              <Route path="/conta/estatisticas" element={<ProtectedRoute><Statistics /></ProtectedRoute>} />
              <Route path="/conta/postar" element={<ProtectedRoute><PostPhoto /></ProtectedRoute>} />
              <Route path="/modal" element={<Modal />} />
              <Route path="/foto/:id" element={<Photo />} />
              <Route path="/perfil/:user" element={<UserPerfil />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
            <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
};

export default App;
