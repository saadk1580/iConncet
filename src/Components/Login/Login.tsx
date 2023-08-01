import { useEffect, useState } from "react";
import "firebase/auth";
import {
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { auth, db } from "../Auth/Auth";
import { doc, setDoc } from "firebase/firestore";

export default function Login() {
  const provider = new GoogleAuthProvider();

  const [user, setUser] = useState<User | null>();

  onAuthStateChanged(auth, async (user) => {
    setUser(user);
  });

  const { uid, email, displayName, phoneNumber, photoURL, emailVerified } =
    user ?? {};

  useEffect(() => {
    const addUser = async () => {
      if (uid) {
        const docRef = doc(db, "users", uid);
        await setDoc(docRef, {
          uid,
          displayName,
          email,
          phoneNumber,
          photoURL,
          chatIds: [],
          emailVerified,
          chatRequests: [],
        });
      }
    };

    user && addUser();
  }, []);

  return (
    <div className="login-page">
      <h1>iConnect</h1>
      <h3>Login</h3>
      <button onClick={() => signInWithRedirect(auth, provider)}>Google</button>
      <button onClick={() => signOut(auth)}>Log out</button>
    </div>
  );
}
