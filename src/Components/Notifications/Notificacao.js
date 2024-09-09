import "./Notificacao.css";

import { useState } from "react";

import { FaCheckCircle } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";

import axios from "axios";

const apiUrl =
  "https://3d9dba1f-2b5b-433f-a1b0-eb428d2de251-00-32rrmhyucky1c.worf.replit.dev";

function NotificacaoComponent({
  notificationId,
  name,
  avatar,
  userEmail,
  onNotificationAnswered,
}) {
  const [error, setError] = useState(null);

  async function answerNotification(
    notificationId,
    notificationResponse,
    userEmail
  ) {
    var responseTries = 0;
    const notificationAnswer = {
      notificationId: notificationId,
      response: notificationResponse,
      receiver: userEmail,
    };

    try {
      const response = await axios.post(
        `${apiUrl}/user/responder-notificacao`,
        notificationAnswer
      );

      if (200 < response.status < 300) {
        onNotificationAnswered();
        return response.data;
      }
      onNotificationAnswered();
    } catch (err) {
      if (responseTries < 4) {
        responseTries++;
        throw err;
      }
    }
  }

  const handleAnswerNotification = async (notificationId, notificationResponse, userEmail) => {
    try {
      const result = await answerNotification(
        notificationId,
        notificationResponse,
        userEmail
      );

      onNotificationAnswered();
    } catch (err) {
      // Configura o estado do erro para capturar a mensagem de erro e exibi-la na UI
      setError("Erro ao responder notificação. Tente novamente.");
      onNotificationAnswered();
      console.error("Error answering notification:", err);
    }
  };

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
              handleAnswerNotification(notificationId, true, userEmail);
              onNotificationAnswered();
            }}
          />
          <IoCloseCircleSharp
            color="#C63C51"
            size={28}
            onClick={() => {
              handleAnswerNotification(notificationId, false, userEmail);
              onNotificationAnswered();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default NotificacaoComponent;
