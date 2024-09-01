import { useContext, useState } from 'react';
import { Container, ProfileImg } from './ProfileInfo.Styles';
import { UserContext } from '../App/App';
import { Header } from '../Header/Header';
import { DeleteButton } from '../App/App.styles';
import { Confirm } from '../Confirm/Confirm';

export const ProfileInfo = () => {
  const [status, setStatus] = useState('Active');

  const [hidden, setHiddem] = useState(false);

  const user = useContext(UserContext);

  const { displayName, photoURL, email } = user ?? {};

  return (
    <>
      {hidden && <Confirm setHiddem={setHiddem} />}

      <Container className="user-status">
        <Header>
          <h1>Profile</h1>
        </Header>
        {photoURL && <ProfileImg width={50} src={photoURL} className="user-status-img" />}
        <h2>{displayName}</h2>
        <p>Email: {email}</p>
        <DeleteButton onClick={() => setHiddem(true)}>Delete Account</DeleteButton>
      </Container>
    </>
  );
};
