import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { respondChatRequest } from "../../utils/requests";
import styled from "@emotion/styled";
import { UserContext } from "../App/App";
import { db } from "../Auth/Auth";
import { Container, Img, List, ListItem, ResponseBtns, Right, Button } from "./ChatRequests.styles";



export const ChatRequests = () => {
  const [requests, setRequests] = useState<DocumentData>();

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

  const reqs = Object.entries(requests ?? {});

  return (
    <Container>
      <h1>REQUESTS</h1>
      <List>
        {reqs.length ? (
          reqs.map(([reqId, receiver]) => {
            return (
              <ListItem>
                <Right>
                  <Img src={receiver.photoURL} />
                  <p>{receiver.displayName}</p>
                </Right>
                <ResponseBtns>
                  <Button role="accept" onClick={() => respondChatRequest(receiver, currentUser, reqId, true)}>
                    Accept
                  </Button>
                  <Button onClick={() => respondChatRequest(receiver, currentUser, reqId, false)}>Decline</Button>
                </ResponseBtns>
              </ListItem>
            );
          })
        ) : (
          <p>No chat requests</p>
        )}
      </List>
    </Container>
  );
};
