import { User } from "firebase/auth";
import { db } from "../components/Auth/Auth";
import { DocumentData, addDoc, arrayRemove, arrayUnion, collection} from "firebase/firestore";
import { doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const users = collection(db, "users");
const chats = collection(db, "chats");

//Gets all the users
export const fetchUsersList = async () => {
  const snapshot = await getDocs(users);
  const usersList = snapshot.docs.map((doc) => doc.data());
  return usersList;
};

//Gets all the chats for the curent user
export const fetchChatsList = async (user: User | null) => {
  const docRef = doc(db, "users", user?.uid ?? "");

  const userChats = (await getDoc(docRef)).data()?.chatIds;

  return userChats;
};

//Gett all the chat requests
export const fetchChatRequests = async (uid?: string) => {
  if (uid) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    const data = docSnap.data();
    return data?.chatRequestsRecieved;
  }
};

export const getUserDetails = async (userId?: string) => {
  if (userId) {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    return docSnap.data();
  }
};

// Sends a chat request to specifed user
export const sendChatRequest = async (receiverUserData: DocumentData, requesterUserId?: string) => {
  const { uid, displayName, photoURL } = receiverUserData;
  const receiverUserRef = doc(db, "users", uid);

  // Send a chat request to the receiver user
  await updateDoc(receiverUserRef, {
    chatRequestsRecieved: arrayUnion({
      uid: requesterUserId,
      displayName,
      photoURL,
      createdAt: new Date().toDateString(),
    }),
  });

  requesterUserId &&
    (await updateDoc(doc(db, "users", requesterUserId), {
      chatRequestsSent: arrayUnion({
        uid,
        createdAt: new Date().toDateString(),
      }),
    }));
};
// Accept chat request from caht requests amd creates a new chat in chats collection
export const acceptChatRequest = async (requester: DocumentData, senderUserId?: string) => {
  const newChatUUID = uuidv4();

  const requesterUserRef = doc(db, "users", requester.uid);

  await updateDoc(requesterUserRef, {
    chatIds: arrayUnion(newChatUUID),
    chatRequests: arrayRemove(),
  });

  await updateDoc(doc(db, "users", senderUserId ?? ""), {
    chatIds: arrayUnion(newChatUUID),
    chatRequests: arrayRemove(requester),
  });

  const chatDocumentRef = doc(db, "chats", newChatUUID);

  await setDoc(chatDocumentRef, {
    members: [requester.uid, senderUserId],
  });

  await addDoc(collection(db, `chats/${newChatUUID}/messages`), {});
};

export const getChatData = async (chatUid: string) => {
  sessionStorage.setItem("chatId", chatUid);

  const docRef = await getDoc(doc(db, "chats", chatUid));

  const messagesdocRef = collection(db, `chats/${chatUid}/messages`);
  const messagesDocSnap = await getDocs(messagesdocRef);

  const messages = messagesDocSnap.docs.map((doc) => doc.data());

  const participants = docRef.data();

  return { messages, participants };
};

export const sendMessage = async (message: string, uid?: string) => {
  const chatUid = sessionStorage.getItem("chatId");

  chatUid &&
    (await addDoc(collection(db, `chats/${chatUid}/messages`), {
      text: message,
      uid,
      createdAt: serverTimestamp(),
    }));
};
