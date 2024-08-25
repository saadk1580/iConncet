import { useContext, useEffect, useState } from "react";
import { getChatMembers, getUserDetails } from "../../utils/requests";
import { DocumentData, collection, doc, getDoc } from "firebase/firestore";
import styled from "@emotion/styled";
import { db } from "../Auth/Auth";
import { UserContext } from "../App/App";
import { useParams } from "react-router";

export const Container = styled.div({
  display: "flex",
  top: 0,
  alignItems: 'center',
  paddingBottom: "5px",
  backgroundColor: "#101112",
  borderBottom: '1px solid #333333',
  padding: '1em',
  position: 'absolute',
  height: '73px',
  left: 0,
  right: 0,
  
  '> img': {
    marginRight: '1em',
    borderRadius: '50%'
  },

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
      {user.photoURL && <img src={user.photoURL} width={40} />}
      <h3 style={{ color: "white" }}>{user.displayName}</h3>
    </Container>
  );
};
