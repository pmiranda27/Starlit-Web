import "./Amigo_Component.css";
import { useState } from "react";
import axios from "axios";

import { IoIosArrowDropdown } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

const apiUrl =
  "https://3d9dba1f-2b5b-433f-a1b0-eb428d2de251-00-32rrmhyucky1c.worf.replit.dev";

function AmigoComponent({
  name,
  imgUrl,
  userEmail,
  emailFriend,
  refreshFriend,
}) {
  const [isOptionsPanelOpen, setIsOptionsPanelOpen] = useState(false);

  function OptionsPanel({ userEmail, emailFriend, refreshFriendList }) {
    return (
      <div
        className={`options-panel ${
          isOptionsPanelOpen ? "options-panel-opened" : ""
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
      className={`amigo-component ${
        isOptionsPanelOpen ? "amigo-component-distance" : ""
      }`}
    >
      <img src={imgUrl} alt="" />
      <div className="info-amigo">
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
    const response = await axios.post(`${apiUrl}/user/remove-friend`, {
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
