import './Notificacao.css'

import { FaCheckCircle } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";


function NotificacaoComponent({ notificationid, name, avatar }) {
    function answerNotification(){
        
    }

    return <div className="notification-background">
        <img src={avatar} alt="" className="notification-avatar" />
        <div className="conteudo-notificacao">
            <div className='info-notificacao'>
                <h4>{name}</h4>
            </div>
            <div className='notification-options'>
                <FaCheckCircle color='#522258' size={26} />
                <IoCloseCircleSharp color='#C63C51' size={28} />
            </div>
        </div>
    </div>
}

export default NotificacaoComponent;