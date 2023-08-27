import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App/App";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { db } from "../Auth/Auth";
import { useNavigate } from "react-router";
import { Container, List, ListItems } from "./ChatList.styles";

type Participants = {
  displayName: string;
  uid: string;
  photoURL: string;
};


export const ChatList = () => {
  const navigate = useNavigate();

  const [chats, setChats] = useState<DocumentData[]>();

  const user = useContext(UserContext);

  const { uid } = user;

  useEffect(() => {
    const docRef = doc(db, "users", uid);
    const unsub = onSnapshot(docRef, (snapshot) => {
      const data = snapshot.data()?.chats;
      setChats(data);
    });

    return () => unsub();
  }, []);

  return (
    <Container>
        <h1>
          CHATS
        </h1>
        <List>
          {chats  &&
            Object.entries(chats).map(([chatId, participants]) => (
              <ListItems key={chatId} onClick={() => navigate(`/chats/${chatId}`)}>
                {participants.participants.displayName}
              </ListItems>
            ))}
        </List>
    </Container>
  );
};
