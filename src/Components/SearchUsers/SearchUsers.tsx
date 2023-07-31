import { fetchChatRequests, fetchUsersList, sendChatRequest, acceptChatRequest} from "../../utils/requests";
import { useContext, useEffect, useMemo, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { UserContext } from "../App/App";


export const SearchUsers = () => {
  const [users, setUsers] = useState<DocumentData[]>([]);
  const [requests, setRequests] = useState<DocumentData[]>()

  const currentUser = useContext(UserContext);

  const { uid } =  currentUser ?? {}

  useEffect(() => {
    const getData = async () => {
      const usersList = await fetchUsersList();
      const reqsList = await fetchChatRequests(uid)
      setUsers(usersList);
      setRequests(reqsList)
    };
    getData();
  }, []);


  return (
    <div>
      <h1>Search chatters</h1>
      <ul>
        {users.map((user) => (
          <>
          <li>{user.uid}</li>
          <button onClick={async () => await sendChatRequest(user, uid)}>Add</button>
          </>
        ))}
      </ul>
      <h1>Chat Requests</h1>
      <ul>
        {
          requests && Object.values(requests).map((receiver) => {
            return <li>
              <img src={receiver.photoURL} width={20}/>
              {receiver.displayName}
              <button onClick={() => acceptChatRequest(receiver, uid)}>Accept</button>
            </li>
          })
        }
      </ul>
    </div>
  );
};
