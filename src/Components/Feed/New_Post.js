import { FaEye, FaEyeSlash, FaImages, FaStar } from "react-icons/fa"
import "./New_Post.css"
import { useEffect, useState } from "react"
import { CiStar } from "react-icons/ci";
import { RiCloseCircleLine } from "react-icons/ri";
import axios from "axios";

export const NewPostPanel = ({ isCreatingNewPost, closeNewPostScreen }) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const [isPublic, setIsPublic] = useState(true);
    const [starRating, setStarRating] = useState(3);

    const [creatingNewPost, setCreatingNewPost] = useState(false);

    const [isChangingMovieName, setIsChangingMovieName] = useState(false);

    const [listaFilmes, setListaFilmes] = useState([]);

    const [tituloNewPost, setTituloNewPost] = useState('');
    const [ratingNewPost, setRatingNewPost] = useState(3);
    const [descriptionNewPost, setDescriptionNewPost] = useState('');

    function getStarRating() {
        switch (starRating) {
            case 1:
                return <div className="star-rating-novo-post">
                    <FaStar className="estrela-novo-post" onClick={() => { changeStarRating(1) }} />
                    <CiStar className="estrela-novo-post" onClick={() => { changeStarRating(2) }} />
                    <CiStar className="estrela-novo-post" onClick={() => { changeStarRating(3) }} />
                    <CiStar className="estrela-novo-post" onClick={() => { changeStarRating(4) }} />
                    <CiStar className="estrela-novo-post" onClick={() => { changeStarRating(5) }} />
                </div>
            case 2:
                return <div className="star-rating-novo-post">
                    <FaStar className="estrela-novo-post" onClick={() => { changeStarRating(1) }} />
                    <FaStar className="estrela-novo-post" onClick={() => { changeStarRating(2) }} />
                    <CiStar className="estrela-novo-post" onClick={() => { changeStarRating(3) }} />
                    <CiStar className="estrela-novo-post" onClick={() => { changeStarRating(4) }} />
                    <CiStar className="estrela-novo-post" onClick={() => { changeStarRating(5) }} />
                </div>
            case 3:
                return <div className="star-rating-novo-post">
                    <FaStar className="estrela-novo-post" onClick={() => { changeStarRating(1) }} />
                    <FaStar className="estrela-novo-post" onClick={() => { changeStarRating(2) }} />
                    <FaStar className="estrela-novo-post" onClick={() => { changeStarRating(3) }} />
                    <CiStar className="estrela-novo-post" onClick={() => { changeStarRating(4) }} />
                    <CiStar className="estrela-novo-post" onClick={() => { changeStarRating(5) }} />
                </div>
            case 4:
                return <div className="star-rating-novo-post">
                    <FaStar className="estrela-novo-post" onClick={() => { changeStarRating(1) }} />
                    <FaStar className="estrela-novo-post" onClick={() => { changeStarRating(2) }} />
                    <FaStar className="estrela-novo-post" onClick={() => { changeStarRating(3) }} />
                    <FaStar className="estrela-novo-post" onClick={() => { changeStarRating(4) }} />
                    <CiStar className="estrela-novo-post" onClick={() => { changeStarRating(5) }} />
                </div>
            case 5:
                return <div className="star-rating-novo-post">
                    <FaStar className="estrela-novo-post" onClick={() => { changeStarRating(1) }} />
                    <FaStar className="estrela-novo-post" onClick={() => { changeStarRating(2) }} />
                    <FaStar className="estrela-novo-post" onClick={() => { changeStarRating(3) }} />
                    <FaStar className="estrela-novo-post" onClick={() => { changeStarRating(4) }} />
                    <FaStar className="estrela-novo-post" onClick={() => { changeStarRating(5) }} />
                </div>
        }
    }

    function changeStarRating(rating) {
        setStarRating(rating);
    }

    async function getListaFilmes() {
        const response = await axios.get(`${apiUrl}/movies/`);

        var newListaFilmes = [];

        const responseBody = response.data;

        console.log('responseBody: ', responseBody);

        console.log('I WANT IT THAT WAY 1', responseBody[1].nome)
        var nomeFilme;
        for (var i = 0; i < responseBody.length; i++) {
            nomeFilme = responseBody[i].nome;
            newListaFilmes.push(
                <li onClick={() => {
                    setTituloNewPost(nomeFilme)
                    console.log('cliquei no: ', nomeFilme)
                }} className={`list-names-movies`} key={responseBody[i]._id}>
                    <h3>{nomeFilme}</h3>
                </li>
            )
        }
        setListaFilmes(newListaFilmes);
    }

    useEffect(() => {
        getListaFilmes();

        const refreshInterval = setInterval(() => {
            getListaFilmes();
        }, 10000);

        return () => clearInterval(refreshInterval);
    }, []);

    return <div className={`background-new-post-panel ${isCreatingNewPost ? '' : 'is-not-showing-background-new-post'}`}>
        <div className="painel-criar-novo-post" onClick={() => { setCreatingNewPost(false) }}>
            <div className="titulo-novo-post">
                <input onFocus={() => {
                    setIsChangingMovieName(true);
                }}
                 type="text" value={tituloNewPost} className="input-criar-novo-post" placeholder="Título do filme" />
                <div className={`lista-filmes-disponiveis ${isChangingMovieName ? '' : 'hiding-is-changing-movie-name'}`}>
                    <ul className={isChangingMovieName ? '' : 'hiding-is-changing-movies-list'}>
                        {listaFilmes}
                    </ul>
                </div>

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
                    <RiCloseCircleLine className="close-novo-post-icon" />
                </div>
                {/* <div className="add-banner-novo-post">
                    <FaImages className="add-banner-novo-post-icon" color="#7E56E4" />
                </div> */}
                <div className="publicar-botao-novo-post">Publicar</div>
            </div>
        </div>
    </div>
}