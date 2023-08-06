import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../components/Auth/Auth";
import { DocumentData } from "firebase/firestore";
import { getUserDetails } from "../utils/requests";

export const useStateObserver = () => {
  const [user, setUser] = useState<User | null>();
  const [userDetails, setUserDetails] = useState<DocumentData>();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user_) => setUser(user_));

    return () => unsub();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const data = await getUserDetails(user?.uid);
      setUserDetails(data);
    };
    getData();
  }, [user]);

  return userDetails;
};
