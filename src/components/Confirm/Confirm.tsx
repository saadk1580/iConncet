import { FC, useContext } from "react";
import { Button, Buttons, ConfirmWindow, Container, Heading, List, ListItem } from "./Confirm.styles";
import { UserContext } from "../App/App";
import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../Auth/Auth";
import { signOut } from "firebase/auth";



export const Confirm: FC<{setHiddem:  React.Dispatch<React.SetStateAction<boolean>>}> = ({setHiddem}) => {

  const user = useContext(UserContext)
  const handleDeleteAccount = async () => {
    console.log(user.uid)
    await deleteDoc(doc(db, 'users', user.uid))
    signOut(auth)
  }


  return (
    <Container>
      <ConfirmWindow>
        <Heading>Are you sure? this cannot be undone.</Heading>
        <List>
          <ListItem>This will delete all your accound data</ListItem>
          <ListItem>You will lose all your chats</ListItem>
          <ListItem>This will not delete your chats with others</ListItem>
        </List>
        <Buttons>
          <Button onClick={handleDeleteAccount} bg="#f04e64" color="white">
            Yes, delete
          </Button>
          <Button bg="white" onClick={() => setHiddem(false)}>Cancel and keep chatting</Button>
        </Buttons>
      </ConfirmWindow>
    </Container>
  );
};
