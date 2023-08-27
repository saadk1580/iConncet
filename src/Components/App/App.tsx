import "../Auth/Auth";
import Chat from "../Chat/Chat";
import { ChatInput } from "../ChatInput/ChatInput";
import { SearchUsers } from "../SearchUsers/SearchUsers";
import { createContext, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { useStateObserver } from "../../hooks/useStateOberser";
import { ChatList } from "../ChatList/ChatList";
import { ChatHeader } from "../ChatHeader/ChatHeader";
import { ChatRequests } from "../ChatRequests/ChatRequests";
import { LeftContainer, MidContainer, Container, LogoutButton, DeleteButton } from "./App.styles";
import { Spinner } from "../Icons/Spinner";
import { signOut } from "firebase/auth";
import { auth } from "../Auth/Auth";
import { Confirm } from "../Confirm/Confirm";

export type Data = {
  users: DocumentData[];
  chats: DocumentData[];
};

export const UserContext = createContext<DocumentData>({});


function App() {
  const { userDetails } = useStateObserver();
  const [hidden, setHiddem] = useState(false)

  if (userDetails === undefined) return <Spinner width={50} color="black" />;


  return (
    <UserContext.Provider value={userDetails}>
      <Container>
        {hidden && <Confirm setHiddem={setHiddem}/>}
        <LeftContainer>
          <ChatRequests />
          <ChatList />
          <LogoutButton onClick={() => signOut(auth)}>Log out</LogoutButton>
          <DeleteButton onClick={() => setHiddem(true)}>Delete Account</DeleteButton>
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
