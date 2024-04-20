import { NavLink } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuIcon from '@mui/icons-material/Menu';
import './headerMenu.css';
import { useAuth } from 'context/AuthProvider';
import { useTranslation } from 'react-i18next';

const items = [
  {
    key: 'login',
    label: 'Log in',
    icon: <LoginIcon />,
  },
  {
    key: 'signup',
    label: 'Sign up',
    icon: <PersonAddIcon />,
  },
];

export default function HeaderMenu() {
  const { isAuthenticated, logOut } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="header-menu">
      <button className="header-menu-btn">
        <MenuIcon />
      </button>
      <ul className="header-menu-list">
        {!isAuthenticated &&
          items.map((item) => {
            return (
              <li title={item.key} key={item.key} className="header-menu-list-item">
                <NavLink to={item.key} className="list-link">
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        {isAuthenticated && (
          <li title="Log Out" className="header-menu-list-item">
            <div className="list-link" onClick={logOut}>
              <LogoutIcon />
              <span>{t('appbar.menu.logout')}</span>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}
