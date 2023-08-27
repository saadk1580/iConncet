import { useEffect, useState } from "react";
import "firebase/auth";
import { GoogleAuthProvider, User, onAuthStateChanged, signInWithRedirect, signOut } from "firebase/auth";
import { auth, db } from "../Auth/Auth";
import { doc, setDoc } from "firebase/firestore";
import { getUserDetails } from "../../utils/requests";
import { Container, Heading, LoginBtn, ImgIcon } from "./Login.styles";
import { redirect } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>();

  onAuthStateChanged(auth, async (user) => {
    setUser(user);
  });

  const { uid, email, displayName, phoneNumber, photoURL, emailVerified } = user ?? {};

  useEffect(() => {
    const addUser = async () => {
      if (uid) {
        const docRef = doc(db, "users", uid);
        const checkUser = await getUserDetails(uid);

        !checkUser &&
          (await setDoc(docRef, {
            uid,
            displayName,
            email,
            phoneNumber,
            photoURL,
            emailVerified,
            chatRequestsSent: {},
            chatRequestsRecieved: {},
            chats: {},
          }));
      }
      navigate('/chats')
    };

    user && addUser();
    
  }, [user]);

  return (
    <Container>
      <Heading>Welcome</Heading>
      <LoginBtn onClick={() => signInWithRedirect(auth, provider)}>
        <ImgIcon src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width={25} />
        Login with Google
      </LoginBtn>
    </Container>
  );
}
