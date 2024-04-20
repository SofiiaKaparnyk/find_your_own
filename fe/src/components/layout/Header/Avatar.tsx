import { Avatar, Tooltip } from 'antd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from 'context/AuthProvider';

export default function UserAvatar() {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <Tooltip title={user.email || ''}>
          <Avatar
            style={{ border: '2px solid white', background: 'none' }}
            alt="User Avatar"
            src={`http://127.0.0.1:8000${user.image}`}
          />
        </Tooltip>
      ) : (
        <Avatar
          style={{ minWidth: '32px', height: '32px', display: 'block' }}
          icon={<AccountCircleIcon sx={{ width: '32px', height: '32px' }} />}
        />
      )}
    </>
  );
}
