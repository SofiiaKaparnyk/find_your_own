import { NavLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LockIcon from '@mui/icons-material/Lock';
import MapIcon from '@mui/icons-material/Map';
import SettingsIcon from '@mui/icons-material/Settings';
import EventIcon from '@mui/icons-material/Event';
import './navMenu.css';
import { Layout } from 'antd';

const items = [
  {
    key: 'Account',
    icon: (
      <NavLink to={'/account'}>
        <PersonIcon />
      </NavLink>
    ),
  },
  {
    key: 'Map',
    icon: (
      <NavLink to={'/map'}>
        <MapIcon />
      </NavLink>
    ),
  },
  {
    key: 'Event calendar',
    icon: (
      <NavLink to={'/event-calendar'}>
        <EventIcon />
      </NavLink>
    ),
  },
  {
    key: 'Settings',
    icon: (
      <NavLink to={'/settings'}>
        <SettingsIcon />
      </NavLink>
    ),
    children: [
      {
        label: 'General',
        key: 'general',
        icon: (
          <NavLink to={'/settings/general'}>
            <AccountBoxIcon />
          </NavLink>
        ),
      },
      {
        label: 'Security',
        key: 'security',
        icon: (
          <NavLink to={'settings/security'} title="Settings">
            <LockIcon />
          </NavLink>
        ),
      },
      {
        label: 'Location',
        key: 'Location',
        icon: (
          <NavLink to={'settings/location'}>
            <LocationOnIcon />
          </NavLink>
        ),
      },
    ],
  },
];

export default function Footer() {
  return (
    <Layout.Footer style={{ padding: 0 }}>
      <ul className="top-menu-list">
        {items.map((item) => {
          return (
            <li key={item.key} title={item.key} className="top-menu-list-item">
              {item.icon}
            </li>
          );
        })}
      </ul>
    </Layout.Footer>
  );
}
