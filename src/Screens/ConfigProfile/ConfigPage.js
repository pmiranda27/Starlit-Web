import { FaEdit } from 'react-icons/fa';
import './ConfigPage.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Components/Services/Api_Service';
import { SendProfilePicturePanel } from '../../Components/Send_Profile_Picture_Panel';

function ConfigPage({ avatarUsuario, emailUsuario }) {
    const [configEmail, setConfigEmail] = useState(emailUsuario);
    const [configDescricao, setConfigDescricao] = useState('');

    const [isChangingAvatar, setIsChangingAvatar] = useState(false);

    const [canChangeInputs, setCanChangeInputs] = useState(true);

    const { getDescricaoText } = useAuth();

    async function getDescricaoPerfil() {
        const responseDescricao = await getDescricaoText(sessionStorage.getItem('username'));

        setConfigDescricao(responseDescricao);
    }

    useEffect(() => {
        getDescricaoPerfil()
    }, [])

    function changeDescription(text) {
        if (!canChangeInputs) {
            return;
          }

        setConfigDescricao(text);
    }

    return <div className="config-page-main">
        <SendProfilePicturePanel $isShowingProfilePicturePanel={isChangingAvatar}></SendProfilePicturePanel>
        <div className="config-page-painel">
            <div className="config-page-first-line">
                <div className="avatar-parent-config-page">
                    <img src={avatarUsuario} alt="Avatar do usuário" className="config-page-avatar" />
                    <div className="change-avatar-button-background">
                        <FaEdit className='change-avatar-button' />
                    </div>
                </div>
                <div className="change-info-config-page-parent">
                    <div className="change-email-config-page">
                        <h3>Alterar Email</h3>
                        <input type="email" value={configEmail} />
                    </div>
                    <div className="change-password-config-page">
                        <h3>Alterar Senha</h3>
                        <input type="password" />
                    </div>
                </div>
            </div>
            <div className="config-page-second-line">
                <div className="change-bio-config-page">
                    <h3>Descrição do Perfil</h3>
                    <textarea onChange={(e) => {
                        changeDescription(e.target.value)
                    }} value={configDescricao}></textarea>
                </div>
            </div>
            <div className="config-page-third-line">
                <button className='logout-button-config-page'>Sair</button>
                <button className='save-button-config-page'>Salvar</button>
            </div>
        </div>
    </div>
}

export default ConfigPage;