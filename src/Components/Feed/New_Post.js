import { FaEye, FaEyeSlash, FaStar } from "react-icons/fa"
import "./New_Post.css"
import { useState } from "react"
import { CiStar } from "react-icons/ci";

export const NewPostPanel = ({ closeNewPostScreen }) => {
    const [isPublic, setIsPublic] = useState(true);
    const [starRating, setStarRating] = useState(3);

    function getStarRating(){
        switch(starRating){
            case 1:
                return <div className="star-rating-novo-post">
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={()=>{changeStarRating(1)}} />
                    <CiStar className="estrela-novo-post" color="#B43649" onClick={()=>{changeStarRating(2)}} />
                    <CiStar className="estrela-novo-post" color="#B43649" onClick={()=>{changeStarRating(3)}} />
                    <CiStar className="estrela-novo-post" color="#B43649" onClick={()=>{changeStarRating(4)}} />
                    <CiStar className="estrela-novo-post" color="#B43649" onClick={()=>{changeStarRating(5)}} />
                </div>
            case 2:
                return <div className="star-rating-novo-post">
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={()=>{changeStarRating(1)}} />
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={()=>{changeStarRating(2)}} />
                    <CiStar className="estrela-novo-post" color="#B43649" onClick={()=>{changeStarRating(3)}} />
                    <CiStar className="estrela-novo-post" color="#B43649" onClick={()=>{changeStarRating(4)}} />
                    <CiStar className="estrela-novo-post" color="#B43649" onClick={()=>{changeStarRating(5)}} />
                </div>
            case 3:
                return <div className="star-rating-novo-post">
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={()=>{changeStarRating(1)}} />
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={()=>{changeStarRating(2)}} />
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={()=>{changeStarRating(3)}} />
                    <CiStar className="estrela-novo-post" color="#B43649" onClick={()=>{changeStarRating(4)}} />
                    <CiStar className="estrela-novo-post" color="#B43649" onClick={()=>{changeStarRating(5)}} />
                </div>
            case 4:
                return <div className="star-rating-novo-post">
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={()=>{changeStarRating(1)}} />
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={()=>{changeStarRating(2)}} />
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={()=>{changeStarRating(3)}} />
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={()=>{changeStarRating(4)}} />
                    <CiStar className="estrela-novo-post" color="#B43649" onClick={()=>{changeStarRating(5)}} />
                </div>
            case 5:
                return <div className="star-rating-novo-post">
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={()=>{changeStarRating(1)}} />
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={()=>{changeStarRating(2)}} />
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={()=>{changeStarRating(3)}} />
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={()=>{changeStarRating(4)}} />
                    <FaStar className="estrela-novo-post" color="#B43649" onClick={()=>{changeStarRating(5)}} />
                </div>
        }
    }

    function changeStarRating(rating){
        setStarRating(rating);
    }


    return <div className="background-new-post-panel">
        <div className="painel-criar-novo-post" onClick={closeNewPostScreen()}>
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
                <textarea className="paragrafo-novo-post" placeholder="Dê a sua opinião"></textarea>
            </div>
        </div>
    </div>
}