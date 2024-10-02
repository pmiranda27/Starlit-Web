import { IoPersonAdd } from "react-icons/io5";
import { CiNoWaitingSign } from "react-icons/ci";
import axios from "axios";
import "./User_Component.css";
import { useEffect, useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

function UserComponent({
  name,
  loggedUserName,
  userEmail,
  loggedUserEmail,
  imgUrl,
  setIsShowingFriendRequestPopUp,
  refreshFriendsList, // Função para atualizar a lista de amigos
  isFriendRequested,
}) {
  const [isRequested, setIsRequested] = useState(isFriendRequested);
  const [canChangeNotificationRequest, setCanChangeNotificationRequest] =
    useState(true);

  function sendFriendRequest() {
    setIsShowingFriendRequestPopUp(true);
    setTimeout(() => {
      setIsShowingFriendRequestPopUp(false);
    }, 2500);
  }

  async function cancelFriendNotificationRequest() {
    try {
      const response = await axios.post(`${apiUrl}/user/remover-notificacao`, {
        sender: loggedUserEmail,
        receiver: userEmail,
        type: "friend-request",
      });
      console.log("Notificação removida com sucesso", response.data);
    } catch (error) {
      console.error(
        "Erro ao remover notificação:",
        error.response?.data || error.message
      );
    }
  }

  async function sendFriendNotificationRequest() {
    var requestName;
    if (
      loggedUserName === "" ||
      loggedUserName === undefined ||
      loggedUserName === null
    ) {
      requestName = "Solicitação de amizade!";
    } else {
      requestName = `${loggedUserName} enviou uma solicitação de amizade!`;
    }
    try {
      const response = await axios.post(`${apiUrl}/user/enviar-notificacao`, {
        sender: loggedUserEmail,
        receiver: userEmail,
        name: requestName,
        type: "friend-request",
      });

      if (response.status >= 200 && response.status < 300) {
        sendFriendRequest();
        return true;
      } else {
        console.error("Falha ao enviar solicitação de amizade", response.data);
        return false;
      }
    } catch (error) {
      console.error(
        "Erro ao enviar solicitação de amizade:",
        error.response?.data || error.message
      );
      return false;
    }
  }

  useEffect(() => {
    setCanChangeNotificationRequest(true)
  }, [isRequested]);

  async function acceptFriendRequest() {
    try {
      const response = await axios.post(`${apiUrl}/user/aceitar-solicitacao`, {
        sender: userEmail,
        receiver: loggedUserEmail,
      });

      if (response.status >= 200 && response.status < 300) {
        refreshFriendsList(); // Atualiza a lista de amigos
      } else {
        console.error("Falha ao aceitar solicitação de amizade", response.data);
      }
    } catch (error) {
      console.error(
        "Erro ao aceitar solicitação de amizade:",
        error.response?.data || error.message
      );
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
              if (canChangeNotificationRequest) {
                cancelFriendNotificationRequest();
                setIsRequested(false);
                setCanChangeNotificationRequest(false);
              }
            }}
          />
        ) : (
          <IoPersonAdd
            size={"24px"}
            strokeWidth={"4px"}
            color="white"
            onClick={() => {
              if (canChangeNotificationRequest) {
                sendFriendNotificationRequest();
                setIsRequested(true);
                setCanChangeNotificationRequest(false);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

export default UserComponent;
