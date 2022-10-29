import endpoint from "../data/api-config.js";
import Swal from "sweetalert2";
const main = () => {
  const IMG_URL = "https://image.tmdb.org/t/p/w500";
  const searchMovie = document.getElementById("search");
  const form = document.getElementById("form");
  const mainMenu = document.getElementById("mainMenu");
  const tabNav = document.querySelector("tab-navigation");

  const sectionMovie = document.createElement("section");
  const containerMovie = document.createElement("div");
  const movieList = document.createElement("div");

  sectionMovie.classList.add("movie", "justify-center", "bg-gradient-to-t", "from-slate-900", "to-black", "text-white");
  containerMovie.classList.add("container", "mx-auto");
  movieList.classList.add("movie-list", "flex", "flex-wrap", "items-center", "justify-center");

  sectionMovie.appendChild(containerMovie);
  containerMovie.appendChild(movieList);
  mainMenu.appendChild(sectionMovie);

  // WEB STORAGE
  const SAVED_EVENT = "saved-movie";
  const STORAGE_KEY = "FAV_MOVIE";
  const movies = [];
  const RENDER_EVENT = "render-movie";

  function saveData() {
    if (isStorageExist()) {
      const parsed = JSON.stringify(movies);
      localStorage.setItem(STORAGE_KEY, parsed);
      document.dispatchEvent(new Event(SAVED_EVENT));
    }
  }

  function isStorageExist() {
    if (typeof Storage === undefined) {
      alert("Your browser does not support local storage!");
      return false;
    }
    return true;
  }

  const getMovies = (url) => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        showMovies(responseJson.results);
      })
      .then(() => {
        favoriteButton();
      })
      .then(() => {
        listMovie();
      })
      .catch((error) => {
        showResponseMessage(error);
      });
  };
  function favoriteButton() {
    const favIcons = document.querySelectorAll(".favIcon");
    favIcons.forEach((favIcon) => {
      favIcon.addEventListener("click", () => {
        favIcon.classList.toggle("text-red-500");
        favIcon.classList.toggle("text-gray-500");
      });
    });
  }
  function listMovie(data) {
    console.log(data);
  }

  const onNavSelect = () => {
    searchMovie.value = "";
    const categoryMovie = tabNav.value;
    switch (categoryMovie) {
      case "nowPlaying":
        getMovies(endpoint.nowPlaying);
        break;
      case "upcoming":
        getMovies(endpoint.upcoming);
        break;
      case "popular":
        getMovies(endpoint.popular);
        break;
      case "trending":
        getMovies(endpoint.trending);
        break;
      case "toprated":
        getMovies(endpoint.topRated);
        break;
    }
  };
  tabNav.clickEvent = onNavSelect;

  const getColor = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 5) {
      return "orange";
    } else {
      return "red";
    }
  };

  const showMovies = (data) => {
    movieList.innerHTML = "";

    if (data.length === 0) {
      let movieDiv = document.createElement("div");

      movieDiv.innerHTML = `
      <div class="min-h-[70vh] bg-gradient-to-t from-slate-900 to-black flex items-center justify-center">
        <h1 class="text-2xl font-semibold text-white text-center">Data Not Found</h1>
      </div>`;
      movieList.append(movieDiv);
    } else {
      data.forEach((movie) => {
        const { title, poster_path, vote_average } = movie;
        if (poster_path === null) {
          delete `${movie}`;
        } else {
          let movieDiv = document.createElement("div");
          movieDiv.classList.add("movie-card", "m-4", "w-[300px]", "overflow-hidden", "bg-slate-700", "mt-10", "rounded-md", "relative", "hover:scale-110", "transition-all", "ease-in-out", "duration-500");
          movieDiv.innerHTML = `<img src="${poster_path ? IMG_URL + poster_path : "http://via.placeholder.com/1080x1580"}" alt="${title}" class="movieImage w-full" />
        <div">
          <span class="movieRate right-0 top-0 absolute  p-2 rounded-md text-lg m-4 ${getColor(vote_average)}">${vote_average.toFixed(1)}</span>
        </div>
        <div class="overview  px-5 py-5 p-5 max-h-full mt-5  absolute  bottom-0 right-0 left-0 bg-white text-black  translate-y-[100%] transition-all ease-in-out duration-500">
          <div class="pt-1">
            <h2 class="movieTitle text-2xl font-semibold mb-2 mt-1">${title}</h2>
          </div>
          <div class="flex relative justify-between flex-wrap items-center">
            <button onclick="${listMovie(movie)}" class="btnDetail text-2xl font-semibold bg-green-500 p-3 text-white rounded-md">Movie Detail</button>
            <button  class="favIcon transition-all ease-in-out duration-100 m-4 text-gray-500 w-12">
              <svg xmlns="http://www.w3.org/2000/svg" class="fill-current" viewBox="0 0 512 512">
                <path
                  d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                />
              </svg>
            </button>
          </div>
        </div>
      `;

          movieList.appendChild(movieDiv);
        }
      });
    }
  };

  const clearNavSelected = () => {
    tabNav.querySelectorAll(".nav .nav-item .nav-link").forEach((item) => {
      item.classList.remove("active", "bg-slate-800");
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = searchMovie.value;
    if (searchTerm) {
      clearNavSelected();
      getMovies(`${endpoint.search}${searchTerm}`);
    } else {
      getMovies(endpoint.nowPlaying);
    }
  });

  getMovies(endpoint.nowPlaying);

  const showResponseMessage = (message = "Check your internet connection") => {
    alert(message);
  };

  window.onscroll = () => {
    const header = document.querySelector("header");
    const fixedNav = header.offsetTop;

    if (window.pageYOffset > fixedNav) {
      header.classList.add("navbar-fixed");
    } else {
      header.classList.remove("navbar-fixed");
    }
  };
};

export default main;
