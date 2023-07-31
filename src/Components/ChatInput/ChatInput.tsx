import Filter from "bad-words";
import PhotoIcon from "@mui/icons-material/Photo";
import ClearIcon from "@mui/icons-material/Clear";
// @ts-ignore
import InputEmoji from "react-input-emoji";
import { Container, Icons, InputContainter } from "./Styles";
import { sendMessage } from "../../utils/requests";
import { useContext, useState } from "react";
import { UserContext } from "../App/App";


const badWordCheck = (text: string) => {
  const badWords = new Filter();
  // badWords.isProfane(text)
  //   ? sendMessage(badWords.clean(text))
  //   : sendMessage(text);
};

export const ChatInput = () => {
  const user = useContext(UserContext)
  const [message, setMessage] = useState<string>('')
  return (
    <Container>
      <Icons>
        <p onClick={() => {}}>
          <ClearIcon 
            style={{
              width: "25px",
              height: "25px",
            }}
          />
        </p>
        <img src="abc" width={50} />
      </Icons>

      <InputContainter className="send-cont-inside">
        <InputEmoji
          onChange={(text: string) => {
            setMessage(text)
          }}
          onEnter={(ev: Event) => {
            sendMessage(message, user?.uid)
          }}
          cleanOnEnter
          value=""
          placeholder="Your message"
          className="msg-input"
        />

        <label className="picture-sub-btn">
          <PhotoIcon style={{ height: "25px", width: "25px" }} />
        </label>
        <input
          type="file"
          id="file"
          className="file-input"
          accept="image/png, image/gif, image/jpeg, image/svg"
          onChange={async (e) => {
            // const file = e.target.files[0];
            // const storageRef = storage;
            // const fileRef = storageRef.child(file.name);
            // await fileRef.put(file);
            // setFileUrl(await fileRef.getDownloadURL());
          }}
        />
      </InputContainter>
    </Container>
  );
};
