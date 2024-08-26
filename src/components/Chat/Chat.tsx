import { useState, useRef, useEffect, useContext, FC } from 'react';
import { DocumentData, Timestamp, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Container, Image, Message, Date, Name, MessageBox, Text, Section, MessageContainer } from './Chat.styles';
import { db } from '../Auth/Auth';
import { UserContext } from '../App/App';
import { useParams } from 'react-router';

type Message = {
  text: string;
  createdAt: string;
  name: string;
  uid: string;
  imageUrl: string;
};

const formatDate = (timestamp?: Timestamp) => {
  if (!timestamp) return '';
  const date = timestamp.toDate();
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

const Chat = () => {
  const dummy = useRef<HTMLDivElement>(null);
  const user = useContext(UserContext);
  const { chatId } = useParams();

  const [messages, setMessages] = useState<DocumentData[]>([]);

  useEffect(() => {
    const q = query(collection(db, `chats/${chatId}/messages`), orderBy('createdAt'));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((chat) => chat.data());
      setMessages(data);
      dummy.current?.scrollIntoView({ behavior: 'instant' });
    });

    window.scrollTo(0, document.body.scrollHeight);
    return () => unsub();
  }, [chatId]);

  return (
    <Container>
      <div style={{ padding: '1em' }}>
        {messages.map((message: any, idx: number) => {
          const date = formatDate(message.createdAt); // Assuming you have a formatDate function
          const prevDate = idx !== 0 ? formatDate(messages[idx - 1].createdAt) : '';

          return (
            <Section ref={dummy} key={idx}>
              <Date>{idx === 0 || date !== prevDate ? date : ''}</Date>
              <MessageContainer role={message.uid === user?.uid ? 'sent' : 'received'}>
                <MessageBox>
                  <Message>
                    <Text>{message.text}</Text>
                    {message.imageUrl ? (
                      <a href={message.imageUrl} target="_blank" rel="noopener noreferrer">
                        <Image src={message.imageUrl} />
                      </a>
                    ) : null}
                  </Message>
                </MessageBox>
              </MessageContainer>
            </Section>
          );
        })}
      </div>
    </Container>
  );
};

export default Chat;
