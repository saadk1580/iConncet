import { fetchUsersList, sendChatRequest } from "../../utils/requests";
import { useContext, useEffect, useMemo, useState } from "react";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { UserContext } from "../App/App";
import { Container, List, ListItem } from "./SearchUsers.styles";
import styled from "@emotion/styled";
import { db } from "../Auth/Auth";
import useUserChats from "../../hooks/useUserChats";

const AddButton = styled.button({
  padding: "5px 10px",
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

  return (
    <Container>
      <h1>Add to chat</h1>
      <List>
        {filteredUsers.map((user) => (
          <ListItem>
            {user.displayName}
            <AddButton onClick={async () => await sendChatRequest(user, currentUser)}>Add</AddButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
