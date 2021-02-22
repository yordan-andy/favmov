import "../component/app-bar.js";
import "../component/movie-genre.js";

const main = () => {
    const appbarElement = document.querySelector("app-bar");
    const onNavMenuClicked = () => {
        appbarElement.active = "active";
    };
    appbarElement.clickEvent = onNavMenuClicked;

    const baseUrl = "https://api.themoviedb.org/3";
    const apiKey = "15996ef632386ab788354df49c643189";
    let genreMovies;

    const findGenreName = (id) => {
        const genreItem = genreMovies.find((genreItem) => genreItem.id == id);
        return genreItem.name;
    };

    const getGenre = () => {
        fetch(`${baseUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`)
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson.error) {
                    showResponseMessage(responseJson.message);
                } else {
                    renderGenres(responseJson.genres);
                }
            })
            .catch((error) => {
                showResponseMessage(error);
            });
    };

    const renderGenres = (genres) => {
        const genreElement = document.querySelector("movie-genre");
        genreElement.genres = genres;
        genreMovies = genres;
    };

    const getMovies = (type, value) => {
        let linkApi;
        if (type == "category") {
            linkApi = `${baseUrl}/movie/${value}?api_key=${apiKey}&language=en-US&page=1`;
        }
        if (type == "genre") {
            linkApi = `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=${value}`;
        }
        if (type == "search") {
            linkApi = `${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${value}`;
        }

        fetch(linkApi)
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson.error) {
                    showResponseMessage(responseJson.message);
                } else {
                    renderMovies(responseJson.results, type, value);
                }
            })
            .catch((error) => {
                showResponseMessage(error);
            });
    };

    const renderMovies = (movies, type, value) => {
        const listMovieElement = document.querySelector("#listMovie");
        let headerTitle;
        if (type == "category") {
            headerTitle = `<h2>${value.replace(/_/g, " ")}</h2>`;
        }
        if (type == "genre") {
            headerTitle = `<h2>${findGenreName(value)}</h2>`;
        }
        if (type == "search") {
            headerTitle = `<h2>${value}</h2>`;
        }
        listMovieElement.innerHTML = `
            <div class="section-title col-12">
                ${headerTitle}
            </div> 
        `;

        movies.forEach((movie) => {
            const listGenreName = movie.genre_ids.map((id) =>
                findGenreName(id)
            );
            listMovieElement.innerHTML += `                          
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">    
                <div class="card">
                    <div class="card-image">
                        <img src="http://image.tmdb.org/t/p/w300${
                            movie.poster_path
                        }" alt="${movie.title}" class="movie-image">
                        <div class="movie-detail">
                            <div class="movie-overview">
                                <h5 class="text-center">${movie.title}</h5>    
                                <p>${movie.overview}</p>
                            </div>                            
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="movie-header"><a href="detail.html?id=${
                            movie.id
                        }#video" class="play_button">
                            <i class="fas fa-play" data-toggle="tooltip" data-placement="bottom" title="Play Trailer">
                            </i></a>
                            <div>
                                <h4 class="movie-title"><a href="detail.html?id=${
                                    movie.id
                                }">${movie.title}</a></h4>
                                <p class="movie-genre">${listGenreName}</p>
                            </div>                            
                        </div>

                        <div class="movie-info">
                            <span class="movie-year">
                                <i class="fas fa-bell" title="Released"></i>&nbsp;${movie.release_date.substring(
                                    0,
                                    4
                                )}
                            </span>
                            <span class="movie-popular">
                                <i class="fas fa-thumbs-up" title="Popularity"></i>&nbsp;${
                                    movie.popularity
                                }
                            </span>
                            <span class="movie-rate">
                                <i class="fas fa-star" title="Rate"></i>&nbsp;${
                                    movie.vote_average
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            `;
        });
    };

    const showResponseMessage = (
        message = "Check your internet connection"
    ) => {
        alert(message);
    };

    document.addEventListener("DOMContentLoaded", () => {
        const urlLocation = document.location.search.substring(1);
        const params = new URLSearchParams(urlLocation);
        let category = params.get("category");
        let genre = params.get("genre");
        let search = params.get("search");
        getGenre();
        if (genre != null) {
            getMovies("genre", genre);
        } else if (search != null) {
            getMovies("search", search);
        } else {
            if (category == null) {
                category = "popular";
            }
            getMovies("category", category);
        }

        const btnFavorite = document.querySelector("app-bar");
        const onButtonFavClicked = () => {
            alert("This feature available soon...");
        };
        btnFavorite.clickFavorite = onButtonFavClicked;
    });
};

export default main;
