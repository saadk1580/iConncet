import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App/App";
import { fetchChatsList, getChatData } from "../../utils/requests";
import { DocumentData } from "firebase/firestore";
import styled from "@emotion/styled";

const Container = styled.div({
  maxWidth: '300px',
})

export const ChatList = () => {
  const [chats, setChats] = useState<string[]>();

  const user = useContext(UserContext);

  useEffect(() => {
    const getChats = async () => {
      const data = await fetchChatsList(user);
      setChats(data)
    }

    getChats()
  }, [])

  return (
    <Container>
      <div className="group-chats">
        <h1 className="groups-title">
          {/* <ExpandMoreIcon />  */}
          CHATS
        </h1>
        <ul>
          { chats && chats.map((chat) => (
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
