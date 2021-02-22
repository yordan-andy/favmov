import "../component/app-bar.js";

const detail = () => {
    const appbarElement = document.querySelector("app-bar");
    const onNavMenuClicked = () => {
        appbarElement.active = "active";
    };
    appbarElement.clickEvent = onNavMenuClicked;

    const baseUrl = "https://api.themoviedb.org/3";
    const apiKey = "15996ef632386ab788354df49c643189";

    const getMovie = (movieId) => {
        fetch(`${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=en-US`)
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson.error) {
                    showResponseMessage(responseJson.message);
                } else {
                    renderMovie(responseJson);
                }
            })
            .catch((error) => {
                showResponseMessage(error);
            });
    };

    const renderMovie = (movie) => {
        const listMovieElement = document.querySelector("#listMovie");
        const listGenreName = movie.genres.map((genre) => {
            return genre.name;
        });

        listMovieElement.innerHTML += `   
        <section class="detail-jumbotron" style="background: url(http://image.tmdb.org/t/p/w500${
            movie.backdrop_path
        }) no-repeat center center;background-size: cover;">
            <div class="container">                    
            <div class="detail-main">
                    <div class="detail-image col-md-3 col-sm-12">
                        <img src="http://image.tmdb.org/t/p/w300${
                            movie.poster_path
                        }" alt="${movie.title}">
                    </div>
                    <div class="detail-movie col-md-9 col-sm-12">
                        <div class="detail-title">${
                            movie.title
                        }&nbsp;(${movie.release_date.substring(0, 4)})</div>
                        <div class="detail-genre">${listGenreName} | Releases : ${
            movie.release_date
        } | Duration : ${movie.runtime}m</div>
                        <div class="detail-tagline">${movie.tagline}</div>
                        <div class="detail-overview">
                            <h4>Overview</h4>
                            <p>${movie.overview}</p>
                        </div>
                        <div class="detail-value">
                            <div class="detail-rate col-md-3 col-4">
                                <i class="fas fa-star fa-2x" title="Rate"></i>
                                <div class="detail-vote">
                                    <p class="detail-vote-title">Rate</p>
                                    <p class="detail-vote-value">${
                                        movie.vote_average
                                    }</p>
                                </div>
                            </div>
                            <div class="detail-rate col-md-3 col-4">
                                <i class="fas fa-thumbs-up fa-2x" title="Vote"></i>
                                <div class="detail-vote">
                                    <p class="detail-vote-title">Vote</p>
                                    <p class="detail-vote-value">${
                                        movie.popularity
                                    }</p>
                                </div>
                            </div>
                            <div class="detail-rate col-md-3 col-4">
                                <i class="fas fa-stopwatch fa-2x" title="Vote Count"></i>
                                <div class="detail-vote">
                                    <p class="detail-vote-title">Count</p>
                                    <p class="detail-vote-value">${
                                        movie.vote_count
                                    }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="detail-cast"></div>
            </div>
        </section>
        `;
    };

    const getCast = (movieId) => {
        fetch(
            `${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`
        )
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson.error) {
                    showResponseMessage(responseJson.message);
                } else {
                    renderCast(responseJson.cast);
                }
            })
            .catch((error) => {
                showResponseMessage(error);
            });
    };

    const renderCast = (casts) => {
        const listCastElement = document.querySelector("#listCast");

        listCastElement.innerHTML = "";

        casts.slice(0, 9).forEach((cast) => {
            listCastElement.innerHTML += `  
                    <div class="card" style="width: 10rem;">
                        <img class="card-img-top" src="http://image.tmdb.org/t/p/w300${cast.profile_path}" alt="">
                        <div class="card-body">
                            <div class="card-realname">${cast.name}</div>
                            <div class="card-moviename">${cast.character}</div>
                        </div>
                    </div>
                    `;
        });
    };

    const getVideos = (movieId) => {
        fetch(
            `${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`
        )
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson.error) {
                    showResponseMessage(responseJson.message);
                } else {
                    renderVideos(responseJson.results);
                }
            })
            .catch((error) => {
                showResponseMessage(error);
            });
    };

    const renderVideos = (videos) => {
        const listVideoElement = document.querySelector("#listVideos");

        listVideoElement.innerHTML = "";

        videos.slice(0, 5).forEach((video) => {
            listVideoElement.innerHTML += `                      
                <div class="embed-responsive embed-responsive-16by9 mt-3">
                    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${video.key}"
                        allowfullscreen></iframe>
                </div>
                    `;
        });
    };

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
        genreMovies = genres;
    };

    const getSimilar = (movieId) => {
        fetch(
            `${baseUrl}/movie/${movieId}/similar?api_key=${apiKey}&language=en-US&page=1`
        )
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson.error) {
                    showResponseMessage(responseJson.message);
                } else {
                    renderSimilar(responseJson.results);
                }
            })
            .catch((error) => {
                showResponseMessage(error);
            });
    };

    const renderSimilar = (movies) => {
        const listSimilarElement = document.querySelector("#listSimilar");

        listSimilarElement.innerHTML = `
            <div class="section-title col-12">
                <h2>Similar Movie</h2>
            </div> 
        `;

        movies.forEach((movie) => {
            const listGenreName = movie.genre_ids.map((id) =>
                findGenreName(id)
            );
            listSimilarElement.innerHTML += `                          
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
        const btnFavorite = document.querySelector("app-bar");
        const onButtonFavClicked = () => {
            alert("This feature available soon...");
        };
        btnFavorite.clickFavorite = onButtonFavClicked;

        const urlLocation = document.location.search.substring(1);
        const params = new URLSearchParams(urlLocation);
        let movieId = params.get("id");
        getGenre();
        getMovie(movieId);
        getCast(movieId);
        getVideos(movieId);
        getSimilar(movieId);
    });
};

export default detail;
