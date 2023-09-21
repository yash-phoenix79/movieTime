import { useEffect, useState } from "react";
import "./App.css";

import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

//e8c34f4

const API_URL = `http://www.omdbapi.com?apikey=e8c34f4`;

// const movie1 = {
//   Title: "Superman, Spiderman or Batman",
//   Year: "2011",
//   imdbID: "tt2084949",
//   Type: "movie",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg",
// };

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);

    const data = await response.json();

    setMovies(data.Search);
  };

  const handleSearch = () => {
    searchMovies(searchTerm);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchMovies(searchTerm);
    }
  };

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  return (
    <div className="app">
      <h1>Movie World</h1>

      <div className="search">
        <input
          placeholder="Search for Movies.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}

      <footer>
        <h3>&copy; 2023 Yaclair. All rights reserved.</h3>
      </footer>
    </div>
  );
};

export default App;
