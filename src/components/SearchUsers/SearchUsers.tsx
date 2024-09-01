import { fetchUsersList, sendChatRequest } from '../../utils/requests';
import { useContext, useEffect, useMemo, useState } from 'react';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import { UserContext } from '../App/App';
import { Container, List, ListItem } from './SearchUsers.styles';
import styled from '@emotion/styled';
import { db } from '../Auth/Auth';
import useUserChats from '../../hooks/useUserChats';
import { ChatRequests } from '../ChatRequests/ChatRequests';
import { Header } from '../Header/Header';
import { PorfileImg } from '../ChatList/ChatList.styles';

const AddButton = styled.button({
  padding: '5px 10px',
});

export const SearchUsers = () => {
  const [users, setUsers] = useState<DocumentData[]>([]);
  const currentUser = useContext(UserContext);
  const { participants } = useUserChats(currentUser.uid);

  useEffect(() => {
    const getData = async () => {
      const usersList = await fetchUsersList();
      setUsers(usersList);
    };

    getData();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      if (user.uid !== currentUser.uid && !participants.includes(user.uid)) {
        return user;
      }
    });
  }, [users, currentUser.uid, participants]);
  console.log(filteredUsers);

  return (
    <Container>
      <Header>
        <h1>Add Friends</h1>
      </Header>
      <ChatRequests />
      <h2>Add to chat</h2>
      <List>
        {filteredUsers.map((user) => {
          if (!user.displayName) {
            return;
          }

          return (
            <ListItem>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <PorfileImg src={user.photoURL} width={30} height={30} style={{ marginRight: '1em' }} />
                {user.displayName}
              </div>
              <AddButton onClick={async () => await sendChatRequest(user, currentUser)}>Add</AddButton>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};
