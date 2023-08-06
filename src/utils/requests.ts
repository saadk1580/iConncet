import { User } from "firebase/auth";
import { db } from "../components/Auth/Auth";
import { DocumentData, addDoc, arrayRemove, arrayUnion, collection, deleteField } from "firebase/firestore";
import { doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const users = collection(db, "users");

//**********************************//
export const fetchUsersList = async () => {
  const snapshot = await getDocs(users);
  const usersList = snapshot.docs.map((doc) => doc.data());
  return usersList;
};

//**********************************//
export const getUserDetails = async (userId?: string) => {
  if (userId) {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    return docSnap.data();
  }
};

//**********************************//
export const getChatMembers = async (chatId: string) => {
  const docRef = doc(db, "chats", chatId ?? "");

  const docSnap = await getDoc(docRef);

  return docSnap.data()?.members;
};

//**********************************//
export const sendChatRequest = async (receiverUserData: DocumentData, requesterUserData: DocumentData) => {
  const requestId = uuidv4();
  const { uid } = receiverUserData;
  const { displayName, photoURL } = requesterUserData;
  const receiverUserRef = doc(db, "users", uid);

  await setDoc(
    receiverUserRef,
    {
      chatRequestsRecieved: {
        [requestId]: {
          uid: requesterUserData.uid,
          displayName,
          photoURL,
          createdAt: new Date().toDateString(),
        },
      },
    },
    { merge: true }
  );

  await setDoc(
    doc(db, "users", requesterUserData.uid),
    {
      chatRequestsSent: {
        [requestId]: {
          uid,
          createdAt: new Date().toDateString(),
        },
      },
    },
    { merge: true }
  );
};

//**********************************//
export const respondChatRequest = async (chatRequest: DocumentData, currentUser: DocumentData, requestId: string, response: boolean) => {
  const newChatUUID = uuidv4();

  const requesterUserRef = doc(db, "users", chatRequest.uid);
  const currentUserRef = doc(db, "users", currentUser.uid);

  const v1 = `chatRequestsRecieved.${requestId}`;
  const v2 = `chatRequestsSent.${requestId}`;

  if (response) {
    await setDoc(
      requesterUserRef,
      {
        chats: {
          [newChatUUID]: {
            participants: {
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
              uid: currentUser.uid,
            },
          },
        },
      },
      { merge: true }
    );

    await setDoc(
      currentUserRef,
      {
        chats: {
          [newChatUUID]: {
            participants: {
              ...chatRequest,
            },
          },
        },
      },
      { merge: true }
    );
  }

  await updateDoc(requesterUserRef, {
    [v2]: deleteField(),
  });

  await updateDoc(currentUserRef, {
    [v1]: deleteField(),
  });

  const chatDocumentRef = doc(db, "chats", newChatUUID);

  await setDoc(chatDocumentRef, {
    members: [chatRequest.uid, currentUser.uid],
  });

  await addDoc(collection(db, `chats/${newChatUUID}/messages`), {});
};

export const declineChatRequest = () => {};

//**********************************//
export const getChatData = async (chatId: string) => {
  const docRef = await getDoc(doc(db, "chats", chatId));

  const messagesdocRef = collection(db, `chats/${chatId}/messages`);
  const messagesDocSnap = await getDocs(messagesdocRef);

  const messages = messagesDocSnap.docs.map((doc) => doc.data());

  const participants = docRef.data();

  return { messages, participants };
};

//**********************************//
export const sendMessage = async (message: string, uid: string, chatId?: string) => {
  await addDoc(collection(db, `chats/${chatId}/messages`), {
    text: message,
    uid,
    createdAt: serverTimestamp(),
  });
};
