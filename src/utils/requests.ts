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
export const getChatMembers = async () => {
  const chatId = sessionStorage.getItem("chatId");

  const docRef = doc(db, 'chats', chatId ?? '')

  const docSnap = await getDoc(docRef)

  return docSnap.data()?.members
}

//**********************************//
export const sendChatRequest = async (receiverUserData: DocumentData, requesterUserData: DocumentData) => {
  const requestId = uuidv4();
  const { uid } = receiverUserData;
  const { displayName, photoURL } = requesterUserData
  const receiverUserRef = doc(db, "users", uid);

  await setDoc(receiverUserRef, {
    chatRequestsRecieved: {
      [requestId]: {
        uid: requesterUserData.uid,
        displayName,
        photoURL,
        createdAt: new Date().toDateString(),
      },
    },
  }, {merge: true});

  await updateDoc(doc(db, "users", requesterUserData.uid), {
    chatRequestsSent: {
      [requestId]: {
        uid,
        createdAt: new Date().toDateString(),
      },
    },
  });
};

//**********************************//
export const acceptChatRequest = async (chatRequest: DocumentData, currentUser: DocumentData, requestId: string) => {
  const newChatUUID = uuidv4();

  const requesterUserRef = doc(db, "users", chatRequest.uid);

  const v1 = `chatRequestsRecieved.${requestId}`
  const v2 = `chatRequestsSent.${requestId}`

  await updateDoc(requesterUserRef, {
    chatIds: arrayUnion(newChatUUID),
    [v2]: deleteField(),
  });

  await updateDoc(doc(db, "users", currentUser.uid), {
    chatIds: arrayUnion(newChatUUID),
    [v1]: deleteField(),
  });

  const chatDocumentRef = doc(db, "chats", newChatUUID);

  await setDoc(chatDocumentRef, {
    members: [chatRequest.uid, currentUser.uid],
  });

  await addDoc(collection(db, `chats/${newChatUUID}/messages`), {});
};

//**********************************//
export const getChatData = async (chatId: string) => {
  sessionStorage.setItem("chatId", chatId);

  const docRef = await getDoc(doc(db, "chats", chatId));

  const messagesdocRef = collection(db, `chats/${chatId}/messages`);
  const messagesDocSnap = await getDocs(messagesdocRef);

  const messages = messagesDocSnap.docs.map((doc) => doc.data());

  const participants = docRef.data();

  return { messages, participants };
};

//**********************************//
export const sendMessage = async (message: string, uid: string) => {
  const chatUid = sessionStorage.getItem("chatId");

  chatUid &&
    (await addDoc(collection(db, `chats/${chatUid}/messages`), {
      text: message,
      uid,
      createdAt: serverTimestamp(),
    }));
};
