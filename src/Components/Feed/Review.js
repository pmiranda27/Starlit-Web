import { useEffect, useState } from 'react'
import './Review.css'
import { FaStar } from 'react-icons/fa6';
import { CiStar } from 'react-icons/ci';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const MovieReview = ({ nomeReview, reviewId, notaReview, bannerFilme, descricaoReview, autorReview, avatarAutor, usuariosQueFizeramReview }) => {
    const [starRating, setStarRating] = useState(3);

    const [listaUsuariosJaAssistiram, setListaUsuariosJaAssistiram] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        setStarRating(notaReview);

        if (usuariosQueFizeramReview && usuariosQueFizeramReview.length > 0) {
            getListOfAlreadyWatched();
        }

    }, [usuariosQueFizeramReview])

    async function getListOfAlreadyWatched() {
        const usuarioLogado = sessionStorage.getItem('username');

        try {
            // Filtra usuários que não são o autor da review
            const usuariosFiltrados = [...new Set(usuariosQueFizeramReview)].filter(
                (usuario) => usuario !== autorReview
            );

            // Verifica se o usuário logado assistiu e inclui se necessário
            if (usuariosQueFizeramReview.includes(usuarioLogado)) {
                usuariosFiltrados.push(usuarioLogado);
            }

            // Aguarda todas as Promises dentro de map serem resolvidas
            let listaComponentsAvatares = await Promise.all(
                usuariosFiltrados.map(async (usuario) => {
                    const responseAvatar = await axios.get(`${process.env.REACT_APP_API_URL}/user/avatar-usuario`, {
                        params: { nickname: usuario },
                    });

                    console.log('responseAvatar', responseAvatar);

                    return <img key={usuario} src={responseAvatar.data.avatar} alt={`Avatar de ${usuario}`} />;
                })
            );

            console.log('hahauhuhua', listaComponentsAvatares);

            setListaUsuariosJaAssistiram(listaComponentsAvatares);
        } catch (error) {
            console.error("Erro ao carregar avatares:", error);
        }
    }

    function getStarRating() {
        switch (starRating) {
            case 1:
                return <div className="star-rating-review">
                    <FaStar className="estrela-novo-post-review" />
                    <CiStar className="estrela-novo-post-review" />
                    <CiStar className="estrela-novo-post-review" />
                    <CiStar className="estrela-novo-post-review" />
                    <CiStar className="estrela-novo-post-review" />
                </div>
            case 2:
                return <div className="star-rating-review">
                    <FaStar className="estrela-novo-post-review" />
                    <FaStar className="estrela-novo-post-review" />
                    <CiStar className="estrela-novo-post-review" />
                    <CiStar className="estrela-novo-post-review" />
                    <CiStar className="estrela-novo-post-review" />
                </div>
            case 3:
                return <div className="star-rating-review">
                    <FaStar className="estrela-novo-post-review" />
                    <FaStar className="estrela-novo-post-review" />
                    <FaStar className="estrela-novo-post-review" />
                    <CiStar className="estrela-novo-post-review" />
                    <CiStar className="estrela-novo-post-review" />
                </div>
            case 4:
                return <div className="star-rating-review">
                    <FaStar className="estrela-novo-post-review" />
                    <FaStar className="estrela-novo-post-review" />
                    <FaStar className="estrela-novo-post-review" />
                    <FaStar className="estrela-novo-post-review" />
                    <CiStar className="estrela-novo-post-review" />
                </div>
            case 5:
                return <div className="star-rating-review">
                    <FaStar className="estrela-novo-post-review" />
                    <FaStar className="estrela-novo-post-review" />
                    <FaStar className="estrela-novo-post-review" />
                    <FaStar className="estrela-novo-post-review" />
                    <FaStar className="estrela-novo-post-review" />
                </div>
        }
    }

    return <div className='movie-review-parent' onClick={() => {
        navigate(`/review?review-id=${reviewId}`)
    }} key={listaUsuariosJaAssistiram.length}>
        <img src={bannerFilme} draggable={false} className="review-banner-filme" />
        <div className="first-line-movie-review">
            <h3>{nomeReview}</h3>
            {getStarRating()}
        </div>
        <div className='second-line-movie-review'>
            <p>{descricaoReview}</p>
            <div className="autor-review-avatar">
                <h4>{autorReview}</h4>
                <img src={avatarAutor} />
            </div>
        </div>
        <div className="third-line-movie-review">
            
        </div>
    </div>
}