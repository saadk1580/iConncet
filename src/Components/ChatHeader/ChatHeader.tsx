import { useContext, useEffect, useState } from "react";
import { getChatMembers, getUserDetails } from "../../utils/requests";
import { DocumentData, collection, doc, getDoc } from "firebase/firestore";
import styled from "@emotion/styled";
import { db } from "../Auth/Auth";
import { UserContext } from "../App/App";
import { useParams } from "react-router";

export const Container = styled.div({
  display: "flex",
  position: "fixed",
  flexDirection: "column",
  top: 0,
  width: "50vw",
  paddingBottom: "5px",
  backgroundColor: "#101112",
  border: "1px solid white",
});

export const ChatHeader = () => {
  const [user, setUser] = useState<DocumentData>({});

  const { chatId } = useParams()

  const currentUser = useContext(UserContext);

  useEffect(() => {
    const getData = async () => {
      const chatMembers = await getChatMembers(chatId ?? "");
      const userId = chatMembers && chatMembers.filter((member: string) => member !== currentUser.uid)[0];
      const data = await getUserDetails(userId);
      data && setUser(data);
    };
    chatId && getData();
  }, [chatId]);

  return (
    <Container>
      <img src={user.photoURL} width={40} />
      <p style={{ color: "white" }}>{user.displayName}</p>
    </Container>
  );
};
