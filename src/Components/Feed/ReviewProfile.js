import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Para navegação
import './ReviewProfile.css'; // Arquivo de estilo CSS
import { FaStar } from 'react-icons/fa6';
import { CiStar } from 'react-icons/ci';

const ReviewProfile = ({ reviewId, bannerFilme, nomeReview, starRating, descricaoReview, autorReview, avatarAutor }) => {
    const navigate = useNavigate();

    // Função para navegar para a seção de reviews
    const handleNavigate = () => {
        navigate('/reviews');
    };

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

    return <div className='review-profile-parent' onClick={() => {
        navigate(`/review?review-id=${reviewId}`)
    }} key={reviewId}>
        <img src={bannerFilme} draggable={false} className="review-banner-filme" />
        <div className="first-line-review-profile">
            <h3>{nomeReview}</h3>
            {getStarRating()}
        </div>
        <div className='second-line-review-profile'>
            <p>{descricaoReview}</p>
        </div>
    </div>
};

export default ReviewProfile;