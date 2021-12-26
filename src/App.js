import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`)
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setMovies(json.data.movies)
  //       setLoading(false)
  //     })
  // }, [])

  // async: "얜 비동기 할거다? 어떤 비동기냐면, 이 안에선 await를 사용해서 순서대로 내려갈거야."
  const getMovies = async () => {
    const response = await fetch(
      `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
    );
    const json = await response.json();
    setMovies(json.data.movies);
    setLoading(false);
  }
  useEffect(() => {
    getMovies();
  }, []);

  console.log(movies);

  return (
    <div className="App">
      {loading
        ? <strong>LOADING</strong>
        : <div>{movies.map((movie) => (
          <div key={movie.id}>
            <img src={movie.medium_cover_image} alt="" />
            <h2>{movie.title}</h2>
            <p>{movie.summary}</p>
            <ul>
              {movie.genres.map((genre, index) => <li key={index}>{genre}</li>)}
            </ul>
          </div>))}</div>}
    </div>
  );
}

export default App;
