import './ReviewPage.css'

import starlitLogo from '../../Assets/Images/starlit.png'
import { useNavigate, useSearchParams } from 'react-router-dom';

import { VscPreview } from 'react-icons/vsc';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { CiStar } from 'react-icons/ci';
import { BiCommentAdd } from 'react-icons/bi';

import { PopUpError } from "../../Components/PopUpError";
import { PopUpConfirm } from '../../Components/PopUpConfirm';

function ReviewPage() {
    const navigate = useNavigate();

    const iconStyle = { color: "white" };

    const [searchParams] = useSearchParams();

    const [reviewId, setReviewId] = useState('');

    const [reviewData, setReviewData] = useState({});

    const [isShowingError, setIsShowingError] = useState(false);
    const [mensagemErrorPopUp, setMensagemErrorPopUp] = useState('')

    const [isLoadingReviewPage, setIsLoadingReviewPage] = useState(true)

    const [tituloFilme, setTituloFilme] = useState('');
    const [bannerFilme, setBannerFilme] = useState('');
    const [descricaoFilme, setDescricaoFilme] = useState('');
    const [autorReview, setAutorReview] = useState('');
    const [avatarAutor, setAvatarAutor] = useState('');
    const [notaReview, setNotaReview] = useState(3);

    const [componentesNota, setComponentesNota] = useState([]);

    const [isCreatingNewComment, setIsCreatingNewComment] = useState(false);
    const [corpoNewComment, setCorpoNewComment] = useState('');

    const [comentariosData, setComentariosData] = useState([]);
    const [comentariosComponents, setComentariosComponents] = useState([]);


    const [isShowingConfirmMessage, setIsShowingConfirmMessage] = useState(false);


    async function getReviewInfo() {
        if (!reviewId) {
            return;
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/reviews/get-review-por-id`, {
            params: {
                reviewId
            }
        });

        setReviewData(response.data.review);
    }

    async function getReviewComments() {
        if (!reviewId) {
            return;
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/reviews/get-comentarios-por-id`, {
            params: {
                reviewId,
            }
        });

        console.log('tudo setado', response.data.comentarios)
        setComentariosData(response.data.comentarios);
    }

    useEffect(() => {
        setReviewId(searchParams.get('review-id'));
    }, []);

    useEffect(() => {
        getReviewInfo();
        getReviewComments();
    }, [reviewId]);


    useEffect(() => {
        mapComentariosData();
    }, [comentariosData]);

    function mapComentariosData() {
        const comentariosComp = comentariosData.map(comment => {
            return <div className='comment-review-parent'>
                <img src={comment.avatar} alt={`Avatar de ${comment.author}`} />
                <div className="conteudo-comentario-review">
                    <h3>{comment.author}</h3>
                    <p>{comment.conteudo}</p>
                </div>
            </div>
        });

        setComentariosComponents(comentariosComp);
    }

    function getStarRating(starRating) {
        switch (starRating) {
            case 1:
                return <div className="stars-review">
                    <FaStar className="estrela-nota-review" />
                    <CiStar className="estrela-nota-review" />
                    <CiStar className="estrela-nota-review" />
                    <CiStar className="estrela-nota-review" />
                    <CiStar className="estrela-nota-review" />
                </div>
            case 2:
                return <div className="stars-review">
                    <FaStar className="estrela-nota-review" />
                    <FaStar className="estrela-nota-review" />
                    <CiStar className="estrela-nota-review" />
                    <CiStar className="estrela-nota-review" />
                    <CiStar className="estrela-nota-review" />
                </div>
            case 3:
                return <div className="stars-review">
                    <FaStar className="estrela-nota-review" />
                    <FaStar className="estrela-nota-review" />
                    <FaStar className="estrela-nota-review" />
                    <CiStar className="estrela-nota-review" />
                    <CiStar className="estrela-nota-review" />
                </div>
            case 4:
                return <div className="stars-review">
                    <FaStar className="estrela-nota-review" />
                    <FaStar className="estrela-nota-review" />
                    <FaStar className="estrela-nota-review" />
                    <FaStar className="estrela-nota-review" />
                    <CiStar className="estrela-nota-review" />
                </div>
            case 5:
                return <div className="stars-review">
                    <FaStar className="estrela-nota-review" />
                    <FaStar className="estrela-nota-review" />
                    <FaStar className="estrela-nota-review" />
                    <FaStar className="estrela-nota-review" />
                    <FaStar className="estrela-nota-review" />
                </div>
        }
    }

    useEffect(() => {
        setTituloFilme(reviewData.tituloFilme);
        setDescricaoFilme(reviewData.descricao);
        setBannerFilme(reviewData.bannerFilme);
        setAutorReview(reviewData.autorReview);
        setAvatarAutor(reviewData.autorAvatar);
        setNotaReview(reviewData.nota);

        setIsLoadingReviewPage(false);
    }, [reviewData])

    useEffect(() => {
        setComponentesNota(getStarRating(notaReview));
    }, [notaReview])


    useEffect(() => {
        if (isShowingError) {
            setTimeout(() => {
                setIsShowingError(false);
            }, 3500);
        }
    }, [isShowingError])


    async function publicarNovoComentario() {
        if (!corpoNewComment) {
            setMensagemErrorPopUp('O comentário não pode estar vazio');
            setIsShowingError(true);
        }

        const username = sessionStorage.getItem('username');
        const conteudo = corpoNewComment;
        const avatar = sessionStorage.getItem('avatar');

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/reviews/send-comment-review`, {
            reviewId,
            username,
            conteudo,
            avatar
        });

        if (response.status == 201) {
            setIsShowingConfirmMessage(true);

            getReviewComments();

            setIsCreatingNewComment(false);
            setCorpoNewComment('');
        }
        else {
            setMensagemErrorPopUp('Falha ao publicar comentário')
            setIsShowingError(true);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setIsShowingConfirmMessage(false);
        }, 3000);
    }, [isShowingConfirmMessage])

    return <div className="review-page-main">
        <div className={`comentario-postado-popup ${isShowingConfirmMessage ? '' : 'comentario-postado-popup-invisible'}`}>Comentário publicado</div>
        <PopUpError $isCentral={true} $isShowingMessage={isShowingError}>{mensagemErrorPopUp}</PopUpError>
        <section className='review-page-left-bar'>
            <img src={starlitLogo} alt="Starlit-logo" className="review-page-starlit-icon" />

            <div className={`link-card-home-page link-card-selected`}>
                <VscPreview style={iconStyle} />
            </div>
        </section>

        <section className="review-page-conteudo">
            <div className="review-page-conteudo-painel">
                <div className="leave-review-page" onClick={() => { navigate('/home') }}>
                    <IoChevronBackOutline className='leave-review-page-icon' />
                    Review
                </div>
                <div className="main-conteudo-review-page">
                    {isLoadingReviewPage ?
                        <div class="skeleton-loading-main-conteudo-review-page">
                            <div class="skeleton-cube" />
                            <div class="skeleton-lines">
                                <div class="skeleton-line" />
                                <div class="skeleton-line" />
                                <div class="skeleton-line" />
                            </div>
                        </div>
                        :
                        <div className="informacoes-review-page">
                            <img src={bannerFilme} alt="Foto do filme" className="informacoes-filme-banner-review-page" />
                            <div className="items-review-page">
                                <div className="autor-review-page">
                                    Review de <span>{autorReview}</span>
                                    <img src={avatarAutor} alt="Avatar do autor da review" />
                                </div>
                                <h3>{tituloFilme}</h3>
                                <div className="nota-review">
                                    {componentesNota}
                                </div>
                                <p className="descricao-review-page">
                                    {descricaoFilme}
                                </p>
                            </div>
                        </div>}

                </div>

                <div className="comentarios-section-review-page">
                    <div className="titulo-secao-comentarios-review-page">
                        Comentários
                        <div className="divisor-titulo-comentarios-review-page" />
                        <BiCommentAdd className='icon-novo-comentario-review-page' onClick={() => {
                            setIsCreatingNewComment(!isCreatingNewComment);
                            setCorpoNewComment('');
                        }} />
                    </div>
                    <div className={`create-new-comment-parent ${isCreatingNewComment ? '' : 'create-new-comment-invisible'}`}>
                        <img src={sessionStorage.getItem('avatar')} alt="Foto do avatar no novo comentário" className="avatar-novo-comentario" />
                        <div className="conteudo-new-comment">
                            <textarea value={corpoNewComment} onChange={(e) => {
                                setCorpoNewComment(e.target.value);
                            }} placeholder='Escreva seu comentário...'></textarea>
                            <div className="botoes-new-comment-parent">
                                <button onClick={() => {
                                    setIsCreatingNewComment(false);
                                    setCorpoNewComment('');
                                }} className='botao-apagar-new-comment'>Apagar</button>
                                <button onClick={publicarNovoComentario} className='botao-publicar-new-comment'>Publicar</button>
                            </div>
                        </div>
                    </div>

                    {isLoadingReviewPage ? '' : comentariosComponents}
                </div>
            </div>
        </section>
    </div>
}

export default ReviewPage;