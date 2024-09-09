import { HiOutlineDotsHorizontal } from "react-icons/hi";

import "./Amigo_Component.css";
import { useState } from "react";
import axios from "axios";

const apiUrl =
  "https://3d9dba1f-2b5b-433f-a1b0-eb428d2de251-00-32rrmhyucky1c.worf.replit.dev";

function AmigoComponent({ name, imgUrl, userEmail, emailFriend, refreshFriend }) {
  const [isOptionsPanelOpen, setIsOptionsPanelOpen] = useState(false);

  return (
    <div className="amigo-component">
      <img src={imgUrl} alt="" />
      <div className="info-amigo">
        <h4>{name}</h4>
      </div>
      <HiOutlineDotsHorizontal
        size={"24px"}
        strokeWidth={"4px"}
        color="white"
        onClick={() => {
          setIsOptionsPanelOpen(!isOptionsPanelOpen);
        }}
      />
      {
        isOptionsPanelOpen ? <OptionsPanel userEmail={userEmail} emailFriend={emailFriend} refreshFriendList={refreshFriend} /> : null
      }
    </div>
  );
}

export function OptionsPanel({ userEmail, emailFriend, refreshFriendList }) {
  
  async function removeFriend(userEmail, emailFriend) {
    const response = await axios.post(`${apiUrl}/user/remove-friend`, {
      email: userEmail,
      emailFriend: emailFriend
    });

    if (response.status >= 200 && response.status < 300) {
      return refreshFriendList();
    }
  }

  return (
    <div className="options-panel">
      <ul>
        <li onClick={()=>{removeFriend(userEmail, emailFriend)}}>Remover Amigo</li>
      </ul>
    </div>
  );
}

export default AmigoComponent;
