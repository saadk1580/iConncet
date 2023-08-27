import { useState, useEffect } from 'react';
import { doc, onSnapshot } from '@firebase/firestore';
import { db } from '../components/Auth/Auth';

function useUserChats( uid: string) {
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    const docRef = doc(db, "users", uid);
    const unsub = onSnapshot(docRef, (snapshot) => {
      const data = snapshot.data()?.chats;
      setChats(data);
    });



    return () => unsub(); 
  }, []);

  const participants = Object.entries(chats).map(([_, p]) => p.participants.uid);


  return {chats, participants};
}

export default useUserChats;