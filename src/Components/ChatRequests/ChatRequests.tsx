import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { respondChatRequest } from "../../utils/requests";
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
    const unsub = onSnapshot(docRef, (snapshot) => {
      const data = snapshot.data()?.chatRequestsRecieved;
      setRequests(data);
    });

    return () => unsub();
  }, []);

  const reqs = Object.entries(requests ?? {})

  return (
    <Container>
      <h1 className="groups-title"> REQUESTS</h1>
      <ul>
        {reqs.length ? 
          reqs.map(([reqId, receiver]) => {
            return (
              <li>
                <img src={receiver.photoURL} width={20} />
                {receiver.displayName}
                <button onClick={() => respondChatRequest(receiver, currentUser, reqId, true)}>Accept</button>
                <button onClick={() => respondChatRequest(receiver, currentUser, reqId, false)}>Decline</button>
              </li>
            );
          }) : <p>No chat requests</p>}
      </ul>
    </Container>
  );
};
