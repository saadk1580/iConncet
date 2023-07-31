import { auth } from '../components/Auth/Auth'
import { getRedirectResult, GoogleAuthProvider, UserCredential, signInWithCredential, signInWithRedirect, signInWithPopup} from "firebase/auth";


export const login = () => {
  var provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
}


export const signInWithToken = () => {
  var credential = GoogleAuthProvider.credential(
    localStorage.getItem("token")
  );

  signInWithCredential(auth, credential)
};
