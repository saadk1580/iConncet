import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { acceptChatRequest } from "../../utils/requests";
import styled from "@emotion/styled";
import { UserContext } from "../App/App";
import { db } from "../Auth/Auth";

export const ChatRequests = () => {
  const [requests, setRequests] = useState<DocumentData>();

  const Container = styled.div({});

  const currentUser = useContext(UserContext);

  const { uid } = currentUser;

  useEffect(() => {
    const docRef = doc(db, "users", uid);
    onSnapshot(docRef, (snapshot) => {
      const data = snapshot.data()?.chatRequestsRecieved;
      setRequests(data);
    });
  }, []);

  return (
    <Container>
      <h1>Chat Requests</h1>
      <ul>
        {requests &&
          Object.entries(requests).map(([reqId, receiver]) => {
            return (
              <li>
                <img src={receiver.photoURL} width={20} />
                {receiver.displayName}
                <button onClick={() => acceptChatRequest(receiver, currentUser, reqId)}>Accept</button>
              </li>
            );
          })}
      </ul>
    </Container>
  );
};
