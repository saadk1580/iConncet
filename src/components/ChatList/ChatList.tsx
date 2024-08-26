import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App/App';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../Auth/Auth';
import { useNavigate } from 'react-router';
import { Container, Chats, Chat, PorfileImg, DisplayName, Title } from './ChatList.styles';
import { Header } from '../Header/Header';
import { Person2Outlined, PersonOffRounded, PersonOutlineRounded } from '@mui/icons-material';
import { PersonOutline } from '@emotion-icons/evaicons-outline';

export const ChatList = () => {
  const navigate = useNavigate();

  const [chats, setChats] = useState<DocumentData[]>();

  const user = useContext(UserContext);

  useEffect(() => {
    const docRef = doc(db, 'users', user.uid);
    const unsub = onSnapshot(docRef, (snapshot) => {
      const data = snapshot.data()?.chats;
      setChats(data);
    });

    return () => unsub();
  }, []);

  return (
    <Container>
      <Header arrow={false}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0 0.5em' }}>
          <h1>Chats</h1>
          <PersonOutline size={30} style={{ cursor: 'pointer' }} />
        </div>
      </Header>
      <Chats>
        {chats &&
          Object.entries(chats).map(([chatId, chat]) => (
            <Chat key={chatId} onClick={() => navigate(`/chats/${chatId}`)}>
              <PorfileImg src={chat.participants.photoURL} width={30} height={30} />
              <DisplayName>{chat.participants.displayName}</DisplayName>
            </Chat>
          ))}
      </Chats>
    </Container>
  );
};
