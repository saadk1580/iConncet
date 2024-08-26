import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App/App';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../Auth/Auth';
import { useNavigate } from 'react-router';
import { Container, Chats, Chat, PorfileImg, DisplayName } from './ChatList.styles';
import { Header } from '../Header/Header';
import { PersonAddOutline } from '@emotion-icons/evaicons-outline';

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

  const chatsArr = chats && Object.entries(chats);

  return (
    <Container>
      <Header arrow={false}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0 0.5em' }}>
          <h1>Chats</h1>
          <PersonAddOutline size={30} style={{ cursor: 'pointer' }} onClick={() => navigate('/chats/add')} />
        </div>
      </Header>

      <Chats>
        {chatsArr ? (
          chatsArr.map(([chatId, chat]) => (
            <Chat key={chatId} onClick={() => navigate(`/chats/${chatId}`)}>
              <PorfileImg src={chat.participants.photoURL} width={40} height={40} />
              <DisplayName>{chat.participants.displayName}</DisplayName>
            </Chat>
          ))
        ) : (
          <p style={{ padding: '0 0.5em' }}>You don't have any active chats. Add friends to start chatting.</p>
        )}
      </Chats>
    </Container>
  );
};
