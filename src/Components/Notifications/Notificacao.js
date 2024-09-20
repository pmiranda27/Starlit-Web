import "./Notificacao.css";

import { useState } from "react";

import { ApiService } from "../Services/Api_Service";

import axios from "axios";

const apiUrl = ApiService.apiUrl;

function NotificacaoComponent({
  notificationId,
  name,
  avatar,
  userEmail,
  onNotificationAnswered,
}) {

  const [error, setError] = useState(null);
  const [canChooseAnswer, setCanChooseAnswer] = useState(true);

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

    while (responseTries < 4){

      const response = await axios.post(
        `${apiUrl}/user/responder-notificacao`,
        notificationAnswer
      );
      
      console.log('response answer notification: ', response)
      
      if (200 < response.status < 300) {
        onNotificationAnswered();
        return response.data;
      }
      onNotificationAnswered();
      
      if (responseTries < 4) {
        responseTries++;
        continue;
      }
    }
      
  }

  const handleAnswerNotification = async (
    notificationId,
    notificationResponse,
    userEmail
  ) => {
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
    <div className={`notification-background ${canChooseAnswer ? '' : 'transfering-notification'}`}>
      <img
        src={avatar}
        onError={(e) => {
          e.target.src =
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
        }}
        alt=""
        className="notification-avatar"
      />
      <div className="conteudo-notificacao">
        <div className="info-notificacao">
          <h4>{name}</h4>
        </div>
        <div className="notification-options">
          <button
            className="button-notificacao accept-button-notificacao"
            onClick={() => {
              if (!canChooseAnswer) return;
              setCanChooseAnswer(false);
              setTimeout(() => {
                handleAnswerNotification(notificationId, true, userEmail);
                onNotificationAnswered();
              }, 470)
            }}
          >
            Aceitar
          </button>

          <button
            className="button-notificacao deny-button-notificacao"
            onClick={() => {
              if (!canChooseAnswer) return;
              setCanChooseAnswer(false);
              setTimeout(() => {
                handleAnswerNotification(notificationId, false, userEmail);
                onNotificationAnswered();
              }, 470)
            }}
          >
            Recusar
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificacaoComponent;
