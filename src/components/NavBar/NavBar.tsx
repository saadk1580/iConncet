import { signOut } from 'firebase/auth';
import { auth } from '../Auth/Auth';
import { LoginOutlined, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router';

export const NavigationBar = () => {
  const navigate = useNavigate();
  return (
    <div style={{ width: '100%', height: '50px', borderTop: '1px solid #ffffff', justifyContent: 'space-around', display: 'flex', paddingTop: '1em' }}>
      <Person fontSize={'large'} onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }} />
      <LoginOutlined fontSize={'large'} onClick={() => signOut(auth)} style={{ cursor: 'pointer' }} />
    </div>
  );
};
