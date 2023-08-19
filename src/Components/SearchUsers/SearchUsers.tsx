import { fetchUsersList, sendChatRequest} from "../../utils/requests";
import { useContext, useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { UserContext } from "../App/App";
import { ChatRequests } from "../ChatRequests/ChatRequests";
import styled from "@emotion/styled";
import { mq } from "../../utils/breakpoints";

const Container = styled.div({
  minWidth: '300px',
  backgroundColor: "#181a1b",

  '> input': {
    padding: '0.5rem',
    borderRadius: '10px',
    margin: '1rem',
    width: '15vw'
  }
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
      <input placeholder="Search Chatters" />
      <ul>
        {users.filter((user) => user.uid !== currentUser.uid).map((user) => (
          <>
          <li>{user.displayName}</li>
          <button onClick={async () => await sendChatRequest(user, currentUser)}>Add</button>
          </>
        ))}
      </ul>
    </Container>
  );
};
