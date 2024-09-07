import "./Notificacao.css";

import { FaCheckCircle } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";

import axios from "axios";

const apiUrl =
  "https://3d9dba1f-2b5b-433f-a1b0-eb428d2de251-00-32rrmhyucky1c.worf.replit.dev";

async function answerNotification(notificationId, notificationResponse, userEmail) {
  const notificationAnswer = {
    notificationId: notificationId,
    response: notificationResponse,
    receiver: userEmail,
  };
  const response = await axios.post(
    `${apiUrl}/user/responder-notificacao`,
    notificationAnswer
  );

  if (200 < response.status < 300) {
    return response.data;
  }
}

function NotificacaoComponent({ notificationId, name, avatar, userEmail }) {
  console.log("Notification ID: ", notificationId);
  return (
    <div className="notification-background">
      <img src={avatar} alt="" className="notification-avatar" />
      <div className="conteudo-notificacao">
        <div className="info-notificacao">
          <h4>{name}</h4>
        </div>
        <div className="notification-options">
          <FaCheckCircle
            color="#522258"
            size={26}
            onClick={() => {
              answerNotification(notificationId, true, userEmail);
            }}
          />
          <IoCloseCircleSharp
            color="#C63C51"
            size={28}
            onClick={() => {
              answerNotification(notificationId, false, userEmail);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default NotificacaoComponent;
