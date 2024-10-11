import "./Message.css";

import { useEffect } from "react";

function Chat() {
  const iconStyle = { color: "white" };

  useEffect(() => {
    let isMounted = true;


    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div className="chat-main">
        
      </div>
    </>
  );
}

export default Chat;
