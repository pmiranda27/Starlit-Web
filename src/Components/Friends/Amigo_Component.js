import "./Amigo_Component.css";
import { useState } from "react";
import axios from "axios";

import { IoIosArrowDropdown } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

function AmigoComponent({
  name,
  imgUrl,
  userEmail,
  emailFriend,
  refreshFriend,
  functionToGoToProfile
}) {
  const [isOptionsPanelOpen, setIsOptionsPanelOpen] = useState(false);

  function OptionsPanel({ userEmail, emailFriend, refreshFriendList }) {
    return (
      <div
        className={`options-panel ${isOptionsPanelOpen ? "options-panel-opened" : ""
          }`}
      >
        <ul>
          <li
            onClick={() => {
              removeFriend(userEmail, emailFriend, refreshFriendList);
            }}
          >
            Remover Amigo
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div
      className={`amigo-component ${isOptionsPanelOpen ? "amigo-component-distance" : ""
        }`}
    >
      <img src={imgUrl} onClick={() => { functionToGoToProfile(name) }} alt={`Imagem do usuário ${name}`} />
      <div className="info-amigo" onClick={() => { functionToGoToProfile(name) }}>
        <h4>{name}</h4>
      </div>
      {isOptionsPanelOpen ? (
        <IoCloseSharp
          size={"24px"}
          strokeWidth={"4px"}
          color="white"
          onClick={() => {
            setIsOptionsPanelOpen(!isOptionsPanelOpen);
          }}
        />
      ) : (
        <IoIosArrowDropdown
          size={"24px"}
          strokeWidth={"4px"}
          color="white"
          onClick={() => {
            setIsOptionsPanelOpen(!isOptionsPanelOpen);
          }}
        />
      )}

      <OptionsPanel
        userEmail={userEmail}
        emailFriend={emailFriend}
        refreshFriendList={refreshFriend}
      />
    </div>
  );
}

async function removeFriend(userEmail, emailFriend, refreshFriendList) {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/user/remove-friend`, {
      email: userEmail,
      emailFriend: emailFriend,
    });
    return refreshFriendList();
  } catch (error) {
    console.log("falha ao remover: ", error);
    return refreshFriendList();
  }
}

export default AmigoComponent;
