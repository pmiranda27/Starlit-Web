import { HiOutlineDotsHorizontal } from "react-icons/hi";

import "./Amigo_Component.css";
import { useState } from "react";
import axios from "axios";

const apiUrl = ApiService.apiUrl;


function AmigoComponent({ name, imgUrl, userEmail, emailFriend, refreshFriend }) {
  const [isOptionsPanelOpen, setIsOptionsPanelOpen] = useState(false);

  function OptionsPanel({ userEmail, emailFriend, refreshFriendList }) {
    return (
      <div className={`options-panel ${isOptionsPanelOpen ? 'options-panel-opened' : ''}`}>
        <ul>
          <li onClick={() => { removeFriend(userEmail, emailFriend, refreshFriendList) }}>Remover Amigo</li>
        </ul>
      </div>
    );
  }

  return (
    <div className={`amigo-component ${isOptionsPanelOpen ? 'amigo-component-distance' : ''}`}>
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

      <OptionsPanel userEmail={userEmail} emailFriend={emailFriend} refreshFriendList={refreshFriend} />
    </div>
  );
}

async function removeFriend(userEmail, emailFriend, refreshFriendList) {
  try {

    const response = await axios.post(`${apiUrl}/user/remove-friend`, {
      email: userEmail,
      emailFriend: emailFriend
    });
    return refreshFriendList();
  } catch (error) {
    console.log('falha ao remover: ', error)
    return refreshFriendList();
  }

}


export default AmigoComponent;
