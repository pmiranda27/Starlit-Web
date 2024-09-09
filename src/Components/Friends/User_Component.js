import { IoPersonAdd } from "react-icons/io5";
import { CiNoWaitingSign } from "react-icons/ci";

import axios from "axios";

import "./User_Component.css";
import { useState } from "react";

const apiUrl =
  "https://3d9dba1f-2b5b-433f-a1b0-eb428d2de251-00-32rrmhyucky1c.worf.replit.dev";

function UserComponent({
  name,
  loggedUserName,
  userEmail,
  loggedUserEmail,
  imgUrl,
  setIsShowingFriendRequestPopUp,
}) {
  const [isRequested, setIsRequested] = useState(false);

  function sendFriendRequest() {
    setIsShowingFriendRequestPopUp(true);
    setTimeout(() => {
      setIsShowingFriendRequestPopUp(false);
    }, 2500);
  }

  async function cancelFriendNotificationRequest() {
    const response = await axios.post(`${apiUrl}/user/remover-notificacao`, {
      sender: loggedUserEmail,
      receiver: userEmail,
    });
  }

  async function sendFriendNotificationRequest() {
    const response = await axios.post(`${apiUrl}/user/enviar-notificacao`, {
      sender: loggedUserEmail,
      receiver: userEmail,
      name: `${loggedUserName} deseja adicionar você!`,
      type: "friend-request",
    });

    if (199 < response.status < 300) {
      sendFriendRequest();
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="user-component">
      <img
        src={imgUrl}
        onError={(e) => {
          e.target.src =
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
        }}
        alt=""
      />
      <div className="info-user">
        <h4>{name}</h4>
      </div>

      <div className="icons">
        {isRequested ? (
          <CiNoWaitingSign
            size={"18px"}
            strokeWidth={"4px"}
            color="white"
            onClick={() => {
              setIsRequested(false);
              cancelFriendNotificationRequest();
            }}
          />
        ) : (
          <IoPersonAdd
            size={"24px"}
            strokeWidth={"4px"}
            color="white"
            onClick={() => {
              setIsRequested(true);
              sendFriendNotificationRequest();
            }}
          />
        )}
      </div>
    </div>
  );
}

export default UserComponent;
