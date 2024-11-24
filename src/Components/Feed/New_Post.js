import { FaEye, FaEyeSlash, FaImages, FaStar } from "react-icons/fa"
import "./New_Post.css"
import { useEffect, useState } from "react"
import { CiStar } from "react-icons/ci";
import { RiCloseCircleLine } from "react-icons/ri";
import axios from "axios";
import { FriendSectionLoader } from "../Loaders/Friends_Section";

export const NewPostPanel = ({ isCreatingNewPost, closeNewPostScreen }) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const [isPublic, setIsPublic] = useState(true);
    const [starRating, setStarRating] = useState(3);

    const [creatingNewPost, setCreatingNewPost] = useState(false);

    const [isChangingMovieName, setIsChangingMovieName] = useState(false);

    const [listaFilmesResponse, setListaFilmesResponse] = useState([]);
    const [listaFilmesFiltrada, setListaFilmesFiltrada] = useState([]);

    const [listaFilmes, setListaFilmes] = useState([]);
    const [isLoadingListaFilmes, setIsLoadingListaFilmes] = useState(true);

    const [hasSelectedMovie, setHasSelectedMovie] = useState(false)
    const [movieBannerSource, setMovieBannerSource] = useState('');

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

    function setNomeNovoPost(nome) {
        setTituloNewPost(nome);

        filtrarListaFilmes(nome);
    }

    function filtrarListaFilmes(searchTerm) {
        if (!searchTerm) {
            setListaFilmesFiltrada(listaFilmesResponse);
            console.log('bunny')
            return;
        }

        const filteredMovies = listaFilmesResponse.filter((movie) =>
            movie.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const onlyNameOfMovies = filteredMovies.map((mov) => mov.nome);

        if (onlyNameOfMovies.includes(searchTerm)) {
            setHasSelectedMovie(true);

            const selectedMovieBanner = filteredMovies.find((movie) => movie.nome === searchTerm);
            setMovieBannerSource(selectedMovieBanner?.imagem || '');

        } else {
            setHasSelectedMovie(false);
            setMovieBannerSource('');
        }

        setListaFilmesFiltrada(filteredMovies);
        setListaComponentesFilmes(listaFilmesFiltrada);
        console.log('senpai')
    }

    function setListaComponentesFilmes(lista) {
        var listaComponentesFilmes = lista.map((user) =>
        (<li onClick={() => {
            setNomeNovoPost(user.nome)
        }} className={`list-names-movies`} key={user._id}><h3>{user.nome}</h3></li>)
        )

        setListaFilmes(listaComponentesFilmes);
    }

    async function getListaFilmes() {
        try {
            const response = await axios.get(`${apiUrl}/movies/`);
            const movies = response.data;


            setListaFilmesResponse(movies);
            setListaFilmesFiltrada(movies);

            setIsLoadingListaFilmes(false);
        } catch (error) {
            console.error("Erro ao buscar lista de filmes:", error);

        } finally {
            setIsLoadingListaFilmes(false);
        }
    }

    function handleTitleChange(title) {
        setTituloNewPost(title);
        if (title.length < 1) {
            setListaComponentesFilmes(listaFilmesResponse);

            setHasSelectedMovie(false);
        }
        filtrarListaFilmes(title);
    }

    useEffect(() => {
        getListaFilmes();

        const intervalRefresh = setInterval(() => {
            getListaFilmes();
        }, 5000);

        return () => clearInterval(intervalRefresh);
    }, []);

    useEffect(() => {
        if (!hasSelectedMovie) {
            setMovieBannerSource(''); // Reseta o banner caso o filme não esteja selecionado
        }
    }, [hasSelectedMovie])

    useEffect(() => {
        console.log('Lista de filmes atualizada:', listaFilmesResponse);
        setListaFilmesFiltrada(listaFilmesResponse);
        setListaComponentesFilmes(listaFilmesResponse);
    }, [listaFilmesResponse]);



    async function handleSubmitNewPost() {
        if (!tituloNewPost) {
            console.log("Sem título")
            return;
        }
        if (!descriptionNewPost) {
            console.log("Sem descrição");
        }
        if (!ratingNewPost) {
            console.log("Sem Rating")
        }

        const emailUser = sessionStorage.getItem('email');

        const newPost = {
            titulo: tituloNewPost,
            email: emailUser,
            descricao: descriptionNewPost,
            nota: ratingNewPost,
            privado: isPublic
        }

        const responseNewPost = await axios.post(`${process.env.REACT_APP_API_URL}/reviews/`, newPost);

        if (responseNewPost.status >= 200 && responseNewPost.status < 300) {
            console.log('post criado com sucesso');

            setTimeout(() => {
                setTituloNewPost('');
                setDescriptionNewPost('');
                setRatingNewPost(3);

                closeNewPostScreen();
            }, 1000)
        }
    }

    return <div className={`background-new-post-panel ${isCreatingNewPost ? '' : 'is-not-showing-background-new-post'}`}>
        <div className="painel-criar-novo-post" onClick={() => { setCreatingNewPost(false) }}>
            <img src={`${hasSelectedMovie ? movieBannerSource : ''}`} className={`background-movie-selected-image ${!hasSelectedMovie ? 'background-movie-invisible' : ''}`} alt="Foto do filme selecionado" />
            <div className="black-background-fields-new-post-panel">
                <div className="titulo-novo-post">
                    <input onFocus={() => {
                        setIsChangingMovieName(true);
                    }}
                        onBlur={() => {
                            setTimeout(() => {
                                setIsChangingMovieName(false);
                            }, 100)
                        }}
                        type="text" value={tituloNewPost}
                        onChange={(e) => {
                            handleTitleChange(e.target.value)
                        }} className="input-criar-novo-post" placeholder="Título do filme" />
                    <div className={`lista-filmes-disponiveis ${isChangingMovieName ? '' : 'hiding-is-changing-movie-name'}`}>
                        <ul className={isChangingMovieName ? '' : 'hiding-is-changing-movies-list'}>
                            {isLoadingListaFilmes ? <div className="new-post-loader-centering"><FriendSectionLoader /></div> : listaFilmes}
                        </ul>
                    </div>

                    {isPublic ? <FaEyeSlash onClick={() => {
                        setIsPublic(!isPublic)
                    }} className="icon-public-criar-novo-post" color="rgb(255, 255, 255)" /> : <FaEye onClick={() => {
                        setIsPublic(!isPublic)
                    }} className="icon-public-criar-novo-post" color="rgb(255, 255, 255)" />}
                </div>
                <div className="conteudo-novo-post">
                    {
                        getStarRating()
                    }
                    <textarea value={descriptionNewPost} onChange={(e) => {
                        setDescriptionNewPost(e.target.value);
                    }} maxLength={400} className="paragrafo-novo-post" placeholder="Dê a sua opinião"></textarea>
                </div>
                <div className="acoes-novo-post">
                    <div className="close-novo-post" onClick={closeNewPostScreen}>
                        <RiCloseCircleLine className="close-novo-post-icon" />
                    </div>
                    {/* <div className="add-banner-novo-post">
                    <FaImages className="add-banner-novo-post-icon" color="#7E56E4" />
                </div> */}
                    <div className="publicar-botao-novo-post" onClick={handleSubmitNewPost}>Publicar</div>
                </div>
            </div>
        </div>
    </div>
}