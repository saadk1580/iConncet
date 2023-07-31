import { useContext, useState } from "react";
import { Container } from "./Styles";
import { UserContext } from "../App/App";

export const ProfileInfo = () => {
  const [status, setStatus] = useState("Active");

  const user = useContext(UserContext);

  const { displayName, photoURL} = user ?? {};

  return (
    <Container className="user-status">
      {photoURL &&<img src={photoURL} className="user-status-img" />}
      <div>
        <p style={{ fontSize: "1.1rem" }}>{displayName}</p>
        <p
          style={{
            display: "flex",
            fontSize: "0.7rem",
            alignItems: "center",
            color: "#6b6b6b",
          }}
        >
          <div className={`status-${status}`}></div> {status}
        </p>
      </div>

      <div className="dropdown-btn">
        <p>...</p>
        <ul className="dropdown-chat">
          <li
            onClick={() => setStatus("Active")}
            style={{ borderBottom: "1px solid #333" }}
            className="dropdown-item-chat"
          >
            Active
          </li>
          <li
            onClick={() => setStatus("Away")}
            style={{ borderBottom: "1px solid #333" }}
            className="dropdown-item-chat"
          >
            Away
          </li>
          <li
            onClick={() => setStatus("Offline")}
            className="dropdown-item-chat"
          >
            Offline
          </li>
        </ul>
      </div>
    </Container>
  );
};
