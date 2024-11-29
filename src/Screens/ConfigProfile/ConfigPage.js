import { FaEdit } from 'react-icons/fa';
import './ConfigPage.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Components/Services/Api_Service';
import { SendProfilePicturePanel } from '../../Components/Send_Profile_Picture_Panel';
import { ImCross } from 'react-icons/im';
import { PopUpError } from '../../Components/PopUpError';
import { PopUpSavedChanges } from '../../Components/PopUpSavedChanges';
import { ModalLogoutConfirm } from '../../Components/ModalLogoutConfirm';
import { useNavigate } from 'react-router-dom';

function ConfigPage({ avatarUsuario, emailUsuario }) {
    const [configEmail, setConfigEmail] = useState(emailUsuario);
    const [configEmailDefinitivo, setConfigEmailDefinitivo] = useState(emailUsuario);

    const [configDescricao, setConfigDescricao] = useState('');
    const [configDescricaoDefinitivo, setConfigDescricaoDefinitivo] = useState('');

    const [configAvatar, setConfigAvatar] = useState(avatarUsuario);
    const [configAvatarDefinitivo, setConfigAvatarDefinitivo] = useState(avatarUsuario);

    const [configPassword, setConfigPassword] = useState('');

    const [changesWereMade, setChangesWereMade] = useState(false);

    const [isChangingAvatar, setIsChangingAvatar] = useState(false);

    const [canChangeInputs, setCanChangeInputs] = useState(true);

    const [isShowingErrorMessage, setIsShowingErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [isShowingSavedChanges, setIsShowingSavedChanges] = useState(false);

    const { getDescricaoText, clearSessionAndLocalStorage } = useAuth();

    const [isConfirmingExit, setIsConfirmingExit] = useState(true);

    const navigate = useNavigate();

    async function getDescricaoPerfil() {
        const responseDescricao = await getDescricaoText(sessionStorage.getItem('username'));

        setConfigDescricao(responseDescricao);
        setConfigDescricaoDefinitivo(responseDescricao)
    }

    useEffect(() => {
        getDescricaoPerfil()
    }, [])

    useEffect(() => {
        if (configAvatar !== configAvatarDefinitivo || configEmail !== configEmailDefinitivo || configDescricao !== configDescricaoDefinitivo || configPassword.length > 0) {
            setChangesWereMade(true);
        } else {
            setChangesWereMade(false);
        }
    }, [configEmail, configDescricao, configAvatar, configPassword])

    useEffect(() => {
        setTimeout(() => {
            setIsShowingErrorMessage(false);
        }, 2500)

        setTimeout(() => {
            setErrorMessage('');
        }, 1200)
    }, [isShowingErrorMessage])

    useEffect(() => {
        setTimeout(() => {
            setIsShowingSavedChanges(false);
        }, 1500);
    }, [isShowingSavedChanges])

    function changeDescription(text) {
        if (!canChangeInputs) {
            return;
        }

        setConfigDescricao(text);
    }

    function errorDefaultImage(img) {
        img.target.src =
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    }

    function clearAvatar() {
        setConfigAvatar('');
    }

    function changeEmail(text) {
        if (!canChangeInputs) {
            return;
        }

        setConfigEmail(text);
    }

    function changePassword(text) {
        if (!canChangeInputs) {
            return;
        }

        setConfigPassword(text);
    }

    async function handleSaveChanges() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (configEmail !== configEmailDefinitivo && !emailRegex.test(configEmail)) {
            setErrorMessage('Email inválido.')
            setIsShowingErrorMessage(true);
            return;
        }


        if (configPassword.length > 0 && configPassword.length < 8) {
            setErrorMessage('A senha deve ter no mínimo 8 caracteres.')
            setIsShowingErrorMessage(true);
            return;
        }

        let alteracoesSalvas = false;


        async function updateAvatar() {
            console.log("Avatar atualizado:", configAvatar);

            const responseAvatar = await axios.post(`${process.env.REACT_APP_API_URL}/user/atualizar-avatar`, {
                email: sessionStorage.getItem('email'),
                avatar: configAvatar,
            });

            return responseAvatar.status;
        }

        async function updateEmail() {
            console.log("Email atualizado:", configEmail);

            const responseEmail = await axios.post(`${process.env.REACT_APP_API_URL}/user/atualizar-email`, {
                oldEmail: sessionStorage.getItem('email'),
                newEmail: configEmail,
            });

            return responseEmail.status;
        }

        async function updatePassword() {
            console.log("Senha atualizada.");

            const responsePassword = await axios.post(`${process.env.REACT_APP_API_URL}/user/atualizar-senha`, {
                username: sessionStorage.getItem('username'),
                senha: configPassword,
            });

            return responsePassword.status;
        }

        async function updateDescription() {
            console.log("Descrição atualizada:", configDescricao);

            const responseDescription = await axios.post(`${process.env.REACT_APP_API_URL}/user/atualizar-bio`, {
                username: sessionStorage.getItem('username'),
                bio: configDescricao,
            });

            return responseDescription.status;
        }


        if (configAvatar !== configAvatarDefinitivo) {
            if (await updateAvatar() === 200) {
                alteracoesSalvas = true;
                sessionStorage.setItem('avatar', configAvatar);
            };
            setConfigAvatarDefinitivo(configAvatar);
        }
        if (configEmail !== configEmailDefinitivo) {
            if (await updateEmail() === 200) {
                alteracoesSalvas = true;
                sessionStorage.setItem('email', configEmail);
            }
            setConfigEmailDefinitivo(configEmail);
        }
        if (configPassword.length > 0) {
            if (await updatePassword() === 200) {
                alteracoesSalvas = true;
            }
            setConfigPassword('');
        }
        if (configDescricao !== configDescricaoDefinitivo) {
            if (await updateDescription() === 200) {
                alteracoesSalvas = true;
            }
            setConfigDescricaoDefinitivo(configDescricao);
        }

        if (alteracoesSalvas) {
            setIsShowingSavedChanges(true);
        }
        setChangesWereMade(false);
    }

    return <div className="config-page-main">
        <ModalLogoutConfirm $isShowingModal={isConfirmingExit}>
            <div className="confirm-exit-panel">
                <h3>Tem certeza que deseja sair?</h3>
                <div className="botoes-exit-panel">
                    <button className='botao-ficar-exit-panel' onClick={() => {
                        setIsConfirmingExit(false)
                    }}>Ficar</button>
                    <button className='botao-sair-exit-panel' onClick={() => {
                        clearSessionAndLocalStorage();

                        navigate('/')
                    }}>Desconectar</button>
                </div>
            </div>
        </ModalLogoutConfirm>
        <PopUpError $isShowingMessage={isShowingErrorMessage}>{errorMessage}</PopUpError>
        <PopUpSavedChanges $isShowingMessage={isShowingSavedChanges}>Alterações foram Salvas com sucesso!</PopUpSavedChanges>
        <SendProfilePicturePanel $isShowingProfilePicturePanel={isChangingAvatar}>
            <div className="change-avatar-parent-relative">
                <ImCross
                    color="white"
                    className="quit-select-profile-picture"
                    onClick={() => {
                        setIsChangingAvatar(false);
                        setCanChangeInputs(true);
                        setConfigAvatar(configAvatarDefinitivo);
                    }}
                />
                <img
                    className="avatar-config-preview"
                    onError={errorDefaultImage}
                    src={configAvatar ? configAvatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                    alt="Preview de foto de avatar ao alterar perfil"
                />
                <input
                    type="text"
                    name="avatar"
                    className="input-config-change-avatar"
                    placeholder="Insira o link da sua imagem de perfil (opcional)"
                    value={configAvatar}
                    onChange={(e) => {
                        setConfigAvatar(e.target.value);
                    }}
                />
                <div className="profile-picture-buttons">
                    <button
                        className="limpar-button-profile-picture"
                        onClick={clearAvatar}
                    >
                        Limpar
                    </button>
                    <button
                        className="enviar-button-profile-picture"
                        onClick={() => {
                            setIsChangingAvatar(false);
                            setCanChangeInputs(true);
                        }}
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </SendProfilePicturePanel>
        <div className="config-page-painel">
            <div className={`save-changes-pop-up ${changesWereMade ? '' : 'save-changes-pop-up-invisible'}`}>
                Alterações foram feitas, mas não salvas. Cuidado!
            </div>
            <div className="config-page-first-line">
                <div className="avatar-parent-config-page">
                    <img src={configAvatar ? configAvatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="Avatar do usuário" className="config-page-avatar" />
                    <div className="change-avatar-button-background" onClick={() => {
                        setIsChangingAvatar(true)
                        setCanChangeInputs(false);
                    }}>
                        <FaEdit className='change-avatar-button' />
                    </div>
                </div>
                <div className="change-info-config-page-parent">
                    <div className="change-email-config-page">
                        <h3>Alterar Email</h3>
                        <input type="email" onChange={(e) => {
                            changeEmail(e.target.value)
                        }} value={configEmail} />
                    </div>
                    <div className="change-password-config-page">
                        <h3>Alterar Senha</h3>
                        <input value={configPassword} onChange={(e) => {
                            changePassword(e.target.value)
                        }} type="password" />
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
                <button className='logout-button-config-page' onClick={() => {
                    setIsConfirmingExit(true)
                }}>Desconectar</button>
                <button className='save-button-config-page' onClick={handleSaveChanges}>Salvar</button>
            </div>
        </div>
    </div>
}

export default ConfigPage;