import "./App.css";
import "../Auth/Auth";
import Chat from "../Chat/Chat";
import { ChatInput } from "../ChatInput/ChatInput";
import { SearchUsers } from "../SearchUsers/SearchUsers";
import styled from "@emotion/styled";
import { createContext } from "react";
import { DocumentData } from "firebase/firestore";
import { ProfileInfo } from "../ProfileInfo/ProfileInfo";
import { useStateObserver } from "../../hooks/useStateOberser";
import { ChatList } from "../ChatList/ChatList";
import { ChatHeader } from "../ChatHeader/ChatHeader";
import { ChatRequests } from "../ChatRequests/ChatRequests";

const Container = styled.div({
  display: "flex",
  fontFamily: '"Poppins", sans-serif',
  color: '#ffffff'

});

const LeftContainer = styled.div({
  minWidth: '380px',
  display: "flex", 
  flexDirection: "column",
  padding: '1rem',
  backgroundColor: "#181a1b",
})

const MidContainer = styled.div({
  backgroundColor: "#101112",
  minWidth: '100px',
  height: '100vh',
  position: 'relative',
  flex: 1,
})


export type Data = {
  users: DocumentData[];
  chats: DocumentData[];
};

export const UserContext = createContext<DocumentData>({});


function App() {
  const user = useStateObserver();

  if (user === undefined) return <h1>Loading</h1>;

  return (
    <UserContext.Provider value={user}>
      <Container>
        <LeftContainer>
          <ProfileInfo />
          <ChatRequests />
          <ChatList />
        </LeftContainer>
        <MidContainer>
          <ChatHeader />
          <Chat />
          <ChatInput />
        </MidContainer>
        <SearchUsers />
      </Container>
    </UserContext.Provider>
  );
}

export default App;
