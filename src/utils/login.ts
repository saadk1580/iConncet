import { auth } from "../components/Auth/Auth";
import { GoogleAuthProvider, signInWithCredential, signInWithRedirect } from "firebase/auth";

export const login = () => {
  var provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
};

export const signInWithToken = () => {
  var credential = GoogleAuthProvider.credential(localStorage.getItem("token"));

  signInWithCredential(auth, credential);
};
