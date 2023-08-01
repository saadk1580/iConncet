import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App/App";
import { getChatData } from "../../utils/requests";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import styled from "@emotion/styled";
import { db } from "../Auth/Auth";

const Container = styled.div({
  maxWidth: '300px',
})

export const ChatList = () => {
  const [chats, setChats] = useState<DocumentData>();

  const user = useContext(UserContext);

  const { uid } = user;

  useEffect(() => {
    const docRef = doc(db, "users", uid);
    onSnapshot(docRef, (snapshot) => {
      const data = snapshot.data()?.chatIds
      setChats(data);
    });
  }, [])

  return (
    <Container>
      <div className="group-chats">
        <h1 className="groups-title">
          {/* <ExpandMoreIcon />  */}
          CHATS
        </h1>
        <ul>
          { chats && chats.map((chat: string) => (
            <li onClick={() => getChatData(chat)}>{JSON.stringify(chat)}</li>
          ))}
        </ul>
      </div>
      <div>
        <div className="group-members-container">
          {/* <p style={{ marginLeft: "10px" }}>{eventName.toUpperCase()}</p> */}
          <div className="group-members"></div>
        </div>
      </div>
    </Container>
  );
};
