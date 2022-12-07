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

  const getMovies = (url) => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        showMovies(responseJson.results);
      })
      .catch((error) => {
        showResponseMessage(error);
      });
  };
  // Solve array of object parse
  // https://stackoverflow.com/questions/58495865/parsing-json-browser-sees-it-as-an-array-of-strings-not-an-array-of-objects
  // let oldItems = JSON.parse(localStorage.getItem("favMovItem")) || [];

  // function favoriteButton() {
  //   const favIcons = document.querySelectorAll(".favIcon");

  //   favIcons.forEach((favIcon) => {
  //     favIcon.addEventListener("click", () => {
  //       favIcon.classList.toggle("text-red-500");
  //       favIcon.classList.toggle("text-gray-500");
  //       let singledata = favIcon.getAttribute("data-single-movie");
  //       // solve encode btoa and atob
  //       // https://stackoverflow.com/questions/23223718/failed-to-execute-btoa-on-window-the-string-to-be-encoded-contains-characte
  //       oldItems.push(decodeURIComponent(escape(window.atob(singledata))));

  //       localStorage.setItem("favMovItem", JSON.stringify(oldItems));
  //     });
  //   });
  // }

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
        const { title, poster_path, vote_average, overview } = movie;

        if (poster_path === null) {
          delete `${movie}`;
        } else {
          let movieDiv = document.createElement("div");
          movieDiv.classList.add("movie-card", "m-4", "w-[300px]", "overflow-hidden", "bg-slate-700", "mt-10", "rounded-md", "relative", "hover:scale-110", "transition-all", "ease-in-out", "duration-500");
          movieDiv.innerHTML = `<img src="${poster_path ? IMG_URL + poster_path : "http://via.placeholder.com/1080x1580"}" alt="${title}" class="movieImage w-full" />
        <div>
          <span class="movieRate right-0 top-0 absolute  p-2 rounded-md text-lg m-4 ${getColor(vote_average)}">${vote_average.toFixed(1)}</span>
        </div>
        <div class="overview  px-5 py-5 p-5 max-h-full mt-5  absolute  bottom-0 right-0 left-0 bg-white text-black  translate-y-[100%] transition-all ease-in-out duration-500">
          <div class="pt-1">
            <h2 class="movieTitle text-2xl font-semibold mb-2 mt-1">${title}</h2>
            <p>${overview}</p>
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

  // default render
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
