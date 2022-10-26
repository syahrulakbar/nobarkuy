const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "?api_key=3f6b8a6396111459208b5b08123287bb";

const endpoint = {
  nowPlaying: `${BASE_URL}movie/popular${API_KEY}`,
  trending: `${BASE_URL}trending/movie/week${API_KEY}`,
  popular: `${BASE_URL}movie/popular${API_KEY}`,
  topRated: `${BASE_URL}movie/top_rated${API_KEY}`,
  upcoming: `${BASE_URL}movie/upcoming${API_KEY}`,
  search: `${BASE_URL}search/movie${API_KEY}&query=`,
};

export default endpoint;
