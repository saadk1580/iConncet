import PhotoIcon from "@mui/icons-material/Photo";
import ClearIcon from "@mui/icons-material/Clear";
// @ts-ignore
import InputEmoji from "react-input-emoji";
import { Container, Icons, InputContainter, ImgIngput, ImageIconLabel } from "./ChatInput.styles";
import { sendMessage } from "../../utils/requests";
import { useContext, useState } from "react";
import { UserContext } from "../App/App";
import { useParams } from "react-router";
import { storage } from "../Auth/Auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const ChatInput = () => {
  const { chatId } = useParams();
  const user = useContext(UserContext);
  const [message, setMessage] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string | null>();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `images/${chatId}/${file.name}`);
      uploadBytes(storageRef, file).then(() => {
        console.log("Image uploaded successfully!");
        getDownloadURL(storageRef).then((url) => setFileUrl(url));
      });
    }
  };

  return (
    <Container>
      {fileUrl && (
        <Icons>
          <p onClick={() => setFileUrl(null)}>
            <ClearIcon />
          </p>
          <img src={fileUrl} width={30} height={30} />
        </Icons>
      )}

      <InputContainter>
        <InputEmoji
          onChange={setMessage}
          onEnter={() => {
            message.length && sendMessage(message, user?.uid, chatId, fileUrl);
            setFileUrl(null);
          }}
          cleanOnEnter
          value={message}
          placeholder="Your message"
          className="msg-input"
        />

        <ImgIngput id="file-input" type="file" accept="image/png, image/gif, image/jpeg, image/svg" onChange={handleFileUpload} />
        <ImageIconLabel htmlFor="file-input">
          <PhotoIcon />
        </ImageIconLabel>
      </InputContainter>
    </Container>
  );
};
