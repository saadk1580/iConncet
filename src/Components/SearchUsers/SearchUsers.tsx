import { fetchUsersList, sendChatRequest } from "../../utils/requests";
import { useContext, useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { UserContext } from "../App/App";
import { Container, List, ListItem } from './SearchUsers.styles'
import styled from "@emotion/styled";

const AddButton = styled.button({
  padding: '5px 10px',
  
})

export const SearchUsers = () => {
  const [users, setUsers] = useState<DocumentData[]>([]);

  const currentUser = useContext(UserContext);

  useEffect(() => {
    const getData = async () => {
      const usersList = await fetchUsersList();
      setUsers(usersList);
    };

    getData();
  }, []);

  return (
    <Container>
      <h1>Add to chat</h1>
      <List>
        {users
          .filter((user) => user.uid !== currentUser.uid)
          .map((user) => (
            <ListItem>
              {user.displayName}
              <AddButton onClick={async () => await sendChatRequest(user, currentUser)}>Add</AddButton>
            </ListItem>
          ))}
      </List>
    </Container>
  );
};
