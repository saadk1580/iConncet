import { fetchUsersList, sendChatRequest} from "../../utils/requests";
import { useContext, useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { UserContext } from "../App/App";
import { ChatRequests } from "../ChatRequests/ChatRequests";


export const SearchUsers = () => {
  const [users, setUsers] = useState<DocumentData[]>([]);

  const currentUser = useContext(UserContext);

  useEffect(() => {
    const getData = async () => {
      const usersList = await fetchUsersList();
      setUsers(usersList);
    };
    
    getData();
  }, []);


  return (
    <div>
      <h1>Search chatters</h1>
      <ul>
        {users.filter((user) => user.uid !== currentUser.uid).map((user) => (
          <>
          <li>{user.displayName}</li>
          <button onClick={async () => await sendChatRequest(user, currentUser)}>Add</button>
          </>
        ))}
      </ul>
    </div>
  );
};
