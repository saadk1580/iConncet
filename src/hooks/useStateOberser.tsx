import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../components/Auth/Auth";
import { DocumentData } from "firebase/firestore";
import { getUserDetails } from "../utils/requests";

export const useStateObserver = () => {
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<DocumentData>();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      const data = await getUserDetails(user?.uid);
      setUserDetails(data);

      setLoading(false); // Set loading to false once we have a response
    });

    return () => unsub();
  }, []);

  return { userDetails, loading };
};
