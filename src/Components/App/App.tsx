import "./App.css";
import "../Auth/Auth";
import Chat from "../Chat/Chat";
import { ChatInput } from "../ChatInput/ChatInput";
import { SearchUsers } from "../SearchUsers/SearchUsers";
import styled from "@emotion/styled";
import { createContext} from "react";
import { DocumentData } from "firebase/firestore";
import { ProfileInfo } from "../ProfileInfo/ProfileInfo";
import { useStateObserver } from "../../hooks/useStateOberser";
import { ChatList } from "../ChatList/ChatList";
import { ChatHeader } from "../ChatHeader/ChatHeader";

const Container = styled.div({
  display: "flex",
});

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
        <div style={{display: 'flex', flexDirection: 'column'}}>
        <ProfileInfo />
        <ChatList />
        </div>
        <div>
        <ChatHeader />
          <Chat/>
          <ChatInput />
        </div>
        <SearchUsers />
      </Container>
    </UserContext.Provider>
  );
}

export default App;
