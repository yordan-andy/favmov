class AppBar extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    set clickEvent(event) {
        this._clickEvent = event;
        this.render();
    }

    set clickFavorite(favorite) {
        this._clickFavorite = favorite;
        this.render();
    }

    set active(active) {
        const navMain = this.shadowDOM.querySelector("#navMain");
        navMain.classList.toggle(active);
    }

    render() {
        this.shadowDOM.innerHTML = `     
        <style>
        @import "https://use.fontawesome.com/releases/v5.7.2/css/all.css";
        
        * {
            box-sizing: border-box;
            padding: 0;
            margin: 0;
        }
        
        a {
            text-decoration: none;
        }
        
        .navbar {
            background-color: #2f3640;
            display: block;
            position: fixed;
            top: 0;
            width:100%;
            z-index: 999;
            padding: 0;
        }
        
        .navbar > .container {
            display: flex;
            justify-content: space-between;
            height: 70px;
            align-items: center;
            font-size: 14px;
            width: 100%;
            padding: 0px 60px;
        }
        
        .nav-main {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            list-style-type: none;
        }
        
        .nav-main li {
            margin: 0;
        }
        
        .nav-links {
            margin-left: 30px;
            color: #dcdde1;
            font-size: 16px;
            font-weight: 400;
            margin-top: 0;
        }
        
        .nav-links:hover {
            color: #fbc531;
        }
        
        .logo {
            font-size: 32px;
            font-weight: 500;
            margin-top: 0;
            color: #f5f6fa;
        }
        
        .navbar-toggle {
            display: none;
        }
        
        .btn-favorite {
            background: #e1b12c;
            color: #fff;
            border-radius: 50px;
            margin: 0 0 0 30px;
            padding: 10px 25px;
        }
        
        .btn-favorite:hover {
            background: #fbc531;
            color: #fff;
        }
        
        @media screen and (max-width: 864px) {
            .navbar {                
                padding: 0px 10px;                
            }
        
            .navbar > .container {
                display: block;
                padding: 15px 0;
                margin: 0;
                height: auto;
            }
        
            .nav-main {
                display: none;
            }
        
            .nav-main li {
                text-align: center;
                margin: 15px auto;
                display: block;
            }
        
            .nav-links {
                margin: 0;
            }
        
            .btn-favorite {
                display: block;
                width: 100%;
            }
        
            .logo {
                display: inline-block;
                top: 0px;
                left: 0px;
                font-size: 22px;
            }
        
            .navbar-toggle {
                display: block;
                position: absolute;
                right: 15px;
                cursor: pointer;
                font-size: 24px;
                padding: 0;
                margin: 0;
            }
        
            .active {
                display: block;
            }
        }
        </style>   
        <nav class="navbar">
            <div class="container">
                <span class="navbar-toggle" id="navBarToggle">
                    <i class="fas fa-bars" style="color:#f5f6fa"></i>
                </span>
                <a href="index.html" class="logo">FavMov</a>
                <ul class="nav-main" id="navMain">
                    <li>
                        <a href="index.html" class="nav-links">Home</a>
                    </li>
                    <li>
                        <a href="index.html?category=now_playing" class="nav-links">Now Playing</a>
                    </li>
                    <li>
                        <a href="index.html?category=popular" class="nav-links">Popular</a>
                    </li>
                    <li>
                        <a href="index.html?category=top_rated" class="nav-links">Top Rated</a>
                    </li>
                    <li>
                        <a href="index.html?category=upcoming" class="nav-links">Upcoming</a>
                    </li>
                    <li>
                        <a id="btnFavorite" href="" class="nav-links btn-favorite">My Favorite</a>
                    </li>
                </ul>
            </div>
        </nav>
        
        `;

        this.shadowDOM
            .querySelector("#navBarToggle")
            .addEventListener("click", this._clickEvent);

        this.shadowDOM
            .querySelector("#btnFavorite")
            .addEventListener("click", this._clickFavorite);
    }
}

customElements.define("app-bar", AppBar);
