import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';

const HeaderDashboard = ({ title }) => {
  //uso do memo para memorizar os icones
  const icons = useMemo(
    () => [
      { icon: 'fa-house', to: '/conta' },
      { icon: 'fa-chart-simple', to: '/conta/estatisticas' },
      { icon: 'fa-plus fa-lg', to: '/conta/postar' },
    ],
    [],
  );
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedIcon, setSelectionIcon] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data, userLogout } = React.useContext(UserContext);

  // Define o estado selectedIcon com base na localização atual
  useEffect(() => {
    const currentIcon = icons.findIndex(
      (icon) => icon.to === location.pathname,
    );
    setSelectionIcon(currentIcon);
  }, [location, icons]);

  // Manipula o evento de clique nos ícones
  function handleIconClick(to) {
    if (to === '/login') {
      if (data) {
        userLogout();
      } else {
        navigate(to);
      }
    } else {
      navigate(to);
    }
    setMobileMenuOpen(false); // Fechar o menu mobile ao clicar
  }

  function handleMobileMenuClick() {
    setMobileMenuOpen(!mobileMenuOpen);
  }
  return (
    <section className="container">
      <div className="dashboardHeader">
        {/* Title */}
        <h1 className="title">
          <span></span>
          {title}
        </h1>

        {/* Icones */}
        <nav className="dashboardIcons">
          {icons.map((item, index) => (
            <Link
              key={item.icon}
              to={item.to}
              onClick={() => handleIconClick(item.to)}
            >
              <span
                className={`${
                  selectedIcon === index ? 'dashboardIcon selected' : ''
                } `}
              >
                <i className={`fa-solid ${item.icon}`}></i>
              </span>
            </Link>
          ))}
          {/* Icone de logout */}
          {data && (
            <Link to="/login" onClick={() => handleIconClick('/login')}>
              <span>
                <i className={`fa-solid fa-right-from-bracket`}></i>
              </span>
            </Link>
          )}
        </nav>
        {/* icone para abrir/fechar o menu mobile */}
        <div
          className={`mobileMenuIcon ${
            mobileMenuOpen ? 'mobileMenuIconActive' : ''
          } `}
          onClick={handleMobileMenuClick}
        >
          <i className={`fa-solid fa-bars`}></i>
        </div>

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <div className="mobileMenu">
            <ul>
              {icons.map((item) => (
                <li key={item.icon}>
                  <Link to={item.to} onClick={() => handleIconClick(item.to)}>
                    <i className={`fa-solid ${item.icon}`}></i>
                  </Link>
                </li>
              ))}
              {data && (
                <Link to="/login" onClick={() => handleIconClick('/login')}>
                  <span>
                    <i className={`fa-solid fa-right-from-bracket`}></i>
                  </span>
                </Link>
              )}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeaderDashboard;
