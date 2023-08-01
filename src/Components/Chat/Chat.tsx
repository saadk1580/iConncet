import { useState, useRef, useEffect, useContext } from "react";
import { DocumentData, Timestamp, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import "./Chat.css";
import { Container, Image, Message, Date, Name, MessageBox, Text, InnerContainer, MessageContainer } from "./Styles";
import { db } from "../Auth/Auth";
import { UserContext } from "../App/App";

type Message = {
  text: string;
  createdAt: string;
  name: string;
  uid: string;
  imageUrl: string;
};

const formatDate = (timestamp?: Timestamp) => {
  if (!timestamp) return "";
  const date = timestamp.toDate();
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

const Chat = () => {
  const dummy = useRef<HTMLDivElement>(null);
  const user = useContext(UserContext);

  const [participants, setParticipants] = useState<DocumentData>();
  const [messages, setMessages] = useState<DocumentData>();
  const chatId = sessionStorage.getItem("chatId");

  useEffect(() => {
    const q = query(collection(db, `chats/${chatId}/messages`), orderBy("createdAt"));
    chatId &&
      onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((chat) => {
          dummy.current && dummy.current.scrollIntoView({ behavior: "instant" });

          return chat.data();
        });
        setMessages(data);
      });
  }, []);


  return (
    <Container>
      {messages &&
        messages.map((message: Message, idx: number) => {
          const date = formatDate();
          const prevDate = idx !== 0 ? formatDate() : "";

          return (
            <InnerContainer ref={dummy}>
              <Date>{idx === 0 || date !== prevDate ? date : ""}</Date>
              <MessageContainer role={message.uid === user?.uid ? "sent" : "received"}>
                {message.uid === "efg" && <Name>{message.name}</Name>}
                <MessageBox>
                  <Message>
                    <Text>{message.text}</Text>
                    {message.imageUrl !== null ?? (
                      <a href={message.imageUrl} target="_blank">
                        <Image src={message.imageUrl} />
                      </a>
                    )}
                  </Message>
                </MessageBox>
              </MessageContainer>
            </InnerContainer>
          );
        })}
    </Container>
  );
};

export default Chat;
