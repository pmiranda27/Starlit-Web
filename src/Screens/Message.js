import "./Message.css";

import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { IoSend } from "react-icons/io5";

function Chat() {
  const iconStyle = { color: "white" };

  return (
    <>
      <div className="chat-main">
        <section className="friend-list">
          <div className="link-card-chat">
            <IoChatboxEllipsesSharp style={iconStyle} />
            Mensagens
          </div>
        </section>
        <section className="chat-section">
          <div className="center-contato-nome">
            <div className="contato-name">
              <img src="https://placehold.co/80" alt="" />
              Nome do Contato
            </div>
          </div>
          <div className="chat-texts">
            <div className="chat-text-zone"></div>
            <div className="input-text-zone">
              <div className="input-box">
                <textarea name="input-chat" id="input-chat"></textarea>
                <div className="send-input-chat">
                  <IoSend size={'30px'} style={{ color: "rgb(163, 58, 114)" }} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Chat;
