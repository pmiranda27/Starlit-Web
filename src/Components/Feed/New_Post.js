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
        console.log('entrei?')
        // if (!filtro) {
        //     console.log(listaFilmesResponse)
        //     setListaFilmesFiltrada(lista);
        // } else {
        //     console.log('que isso', listaFilmesResponse)
        //     const listaFiltradaResponseBody = lista.filter((e) =>
        //         e.nome.toLowerCase().includes(filtro.toLowerCase())
        //     );
        //     setListaFilmesFiltrada(listaFiltradaResponseBody);
        // }

        // if (isLoadingListaFilmes) {
        //     setIsLoadingListaFilmes(false);
        // }

        if (!searchTerm) {
            // Se não houver termo de busca, exibe toda a lista de filmes
            setListaFilmesFiltrada(listaFilmesResponse);
            console.log('bunny')
            return;
        }

        // Filtra a lista de filmes com base no termo digitado pelo usuário (case insensitive)
        const filteredMovies = listaFilmesResponse.filter((movie) =>
            movie.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Atualiza o estado da lista filtrada
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
        // const response = await axios.get(`${apiUrl}/movies/`);

        // const responseBody = response.data;

        // setListaFilmesResponse(responseBody);
        // console.log('li: ', listaFilmesResponse)

        // filtrarListaFilmes(tituloNewPost || "", responseBody);

        try {
            // Faz a requisição para a API e obtém os dados da lista de filmes
            const response = await axios.get(`${apiUrl}/movies/`);
            const movies = response.data;

            console.log('get?')

            // Atualiza a lista de filmes completa e exibe ela inicialmente como "lista filtrada"
            setListaFilmesResponse(movies);
            setListaFilmesFiltrada(movies);

            // Remove o estado de carregamento
            setIsLoadingListaFilmes(false);
        } catch (error) {
            console.error("Erro ao buscar lista de filmes:", error);

        } finally {
            setIsLoadingListaFilmes(false); // Remove o estado de carregamento
        }
    }

    function handleTitleChange(title) {
        setTituloNewPost(title); // Atualiza o título do post
        if (title.length < 1) {
            setListaComponentesFilmes(listaFilmesResponse);
        }
        filtrarListaFilmes(title);  // Filtra a lista de filmes com base no título
    }

    useEffect(() => {
        getListaFilmes();

        const intervalRefresh = setInterval(() => {
            getListaFilmes();
        }, 5000);

        return () => clearInterval(intervalRefresh);
    }, []);

    useEffect(() => {
        // Garante que o componente seja atualizado após a resposta
        console.log('Lista de filmes atualizada:', listaFilmesResponse);
        setListaFilmesFiltrada(listaFilmesResponse);
        setListaComponentesFilmes(listaFilmesResponse);
    }, [listaFilmesResponse]);

    return <div className={`background-new-post-panel ${isCreatingNewPost ? '' : 'is-not-showing-background-new-post'}`}>
        <div className="painel-criar-novo-post" onClick={() => { setCreatingNewPost(false) }}>
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