import { Fragment, useEffect, useState } from 'react';
import 'firebase/auth';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../Auth/Auth';
import { doc, setDoc } from 'firebase/firestore';
import { getUserDetails } from '../../utils/requests';
import { Container, Heading } from './Login.styles';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Spinner } from '../Icons/Spinner';
import { SignInWithGoogle } from '../SignInWithGoogle/SIgnInWithGoogle';

const Main = styled.div({
  width: '100vw',
  height: '100vh',
});

export default function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState(false);

  onAuthStateChanged(auth, async (user) => {
    setUser(user);
    user && setLoading(true);
  });

  const { uid, email, displayName, phoneNumber, photoURL, emailVerified } = user ?? {};

  useEffect(() => {
    const addUser = async () => {
      if (uid) {
        const docRef = doc(db, 'users', uid);
        const checkUser = await getUserDetails(uid);

        !checkUser &&
          (await setDoc(docRef, {
            uid,
            displayName,
            email,
            phoneNumber,
            photoURL,
            emailVerified,
            chatRequestsSent: {},
            chatRequestsRecieved: {},
            chats: {},
          }));
      }
      navigate('/chats');
    };

    user && addUser();
  }, [user]);

  return (
    <Main>
      <Container>
        {!loading ? (
          <Fragment>
            <Heading>Welcome</Heading>
            <SignInWithGoogle />
          </Fragment>
        ) : (
          <Spinner width={100} color="#ffffff" />
        )}
      </Container>
    </Main>
  );
}
