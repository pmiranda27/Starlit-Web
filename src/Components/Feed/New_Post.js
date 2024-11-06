import { FaEye, FaEyeSlash, FaImages, FaStar } from "react-icons/fa"
import "./New_Post.css"
import { useState } from "react"
import { CiStar } from "react-icons/ci";
import { RiCloseCircleLine } from "react-icons/ri";

export const NewPostPanel = ({ isCreatingNewPost, closeNewPostScreen }) => {
    const [isPublic, setIsPublic] = useState(true);
    const [starRating, setStarRating] = useState(3);

    const [creatingNewPost, setCreatingNewPost] = useState(false);

    function getStarRating() {
        switch (starRating) {
            case 1:
                return <div className="star-rating-novo-post">
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={() => { changeStarRating(1) }} />
                    <CiStar className="estrela-novo-post" color="#B43649" onClick={() => { changeStarRating(2) }} />
                    <CiStar className="estrela-novo-post" color="#B43649" onClick={() => { changeStarRating(3) }} />
                    <CiStar className="estrela-novo-post" color="#B43649" onClick={() => { changeStarRating(4) }} />
                    <CiStar className="estrela-novo-post" color="#B43649" onClick={() => { changeStarRating(5) }} />
                </div>
            case 2:
                return <div className="star-rating-novo-post">
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={() => { changeStarRating(1) }} />
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={() => { changeStarRating(2) }} />
                    <CiStar className="estrela-novo-post" color="#B43649" onClick={() => { changeStarRating(3) }} />
                    <CiStar className="estrela-novo-post" color="#B43649" onClick={() => { changeStarRating(4) }} />
                    <CiStar className="estrela-novo-post" color="#B43649" onClick={() => { changeStarRating(5) }} />
                </div>
            case 3:
                return <div className="star-rating-novo-post">
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={() => { changeStarRating(1) }} />
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={() => { changeStarRating(2) }} />
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={() => { changeStarRating(3) }} />
                    <CiStar className="estrela-novo-post" color="#B43649" onClick={() => { changeStarRating(4) }} />
                    <CiStar className="estrela-novo-post" color="#B43649" onClick={() => { changeStarRating(5) }} />
                </div>
            case 4:
                return <div className="star-rating-novo-post">
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={() => { changeStarRating(1) }} />
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={() => { changeStarRating(2) }} />
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={() => { changeStarRating(3) }} />
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={() => { changeStarRating(4) }} />
                    <CiStar className="estrela-novo-post" color="#B43649" onClick={() => { changeStarRating(5) }} />
                </div>
            case 5:
                return <div className="star-rating-novo-post">
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={() => { changeStarRating(1) }} />
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={() => { changeStarRating(2) }} />
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={() => { changeStarRating(3) }} />
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={() => { changeStarRating(4) }} />
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={() => { changeStarRating(5) }} />
                </div>
        }
    }

    function changeStarRating(rating) {
        setStarRating(rating);
    }

    return <div className={`background-new-post-panel ${isCreatingNewPost ? '' : 'is-not-showing-background-new-post'}`}>
        <div className="painel-criar-novo-post" onClick={() => { setCreatingNewPost(false) }}>
            <div className="titulo-novo-post">
                <input type="text" className="input-criar-novo-post" placeholder="Título do filme" />
                {isPublic ? <FaEye onClick={() => {
                    setIsPublic(!isPublic)
                }} className="icon-public-criar-novo-post" color="rgb(255, 255, 255)" /> : <FaEyeSlash onClick={() => {
                    setIsPublic(!isPublic)
                }} className="icon-public-criar-novo-post" color="rgb(255, 255, 255)" />}
            </div>
            <div className="conteudo-novo-post">
                {
                    getStarRating()
                }
                <textarea maxLength={400} className="paragrafo-novo-post" placeholder="Dê a sua opinião"></textarea>
            </div>
            <div className="acoes-novo-post">
                <div className="close-novo-post" onClick={closeNewPostScreen}>
                    <RiCloseCircleLine className="close-novo-post-icon" color="red" />
                </div>
                <div className="add-banner-novo-post">
                    <FaImages className="add-banner-novo-post-icon" color="#C63C51" />
                </div>
                <div className="publicar-botao-novo-post">Publicar</div>
            </div>
        </div>
    </div>
}