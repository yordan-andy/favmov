class MovieGenre extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    set genres(genres) {
        this._genres = genres;
        this.render();
    }

    render() {
        this.shadowDOM.innerHTML = `
        <style>
        * {
            box-sizing: border-box;
            padding: 0;
            margin: 0;
        }

        a {
            text-decoration: none;
        }        
       
        :host {        
            width: 100%;                
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
        }        

        .btnGenre {
            border: none;
            border: solid 1px #f5f6fa;
            border-radius: 20px;
            background: rgba(255, 255, 255, 0);
            font-size: 12px;
            font-weight: 400;
            padding: 5px 10px;
            margin: 5px;
            color: #f5f6fa;
        }

        .btnGenre:hover {
            background-color: #f5f6fa;
            color: #2f3640;
        }
        </style>
        <section class="secgenre">
            <div class="container">               
                
            </div>
        </section>
        `;

        this._genres.forEach((genre) => {
            this.shadowDOM.innerHTML += `<a href="?genre=${genre.id}" class="btnGenre">${genre.name}</a>`;
        });
    }

    renderError(message) {
        this.shadowDOM.innerHTML = `
        <style>
             .placeholder {
                   font-weight: lighter;
                   color: rgba(0,0,0,0.5);
                   -webkit-user-select: none;
                   -moz-user-select: none;
                   -ms-user-select: none;
                   user-select: none;
               }
        </style>`;
        this.shadowDOM.innerHTML += `<h2 class="placeholder">${message}</h2>`;
    }
}

customElements.define("movie-genre", MovieGenre);
