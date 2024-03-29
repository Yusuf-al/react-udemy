import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";
import { useLocalStorage } from "./useLocalStorage";
import { useKey } from "./useKey";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "9efb92c2";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorage([],'Watched');
  const {movies,isLoading,error}=useMovies(query)

  function handleSeletMovied(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleAddWatched(movie){
    setWatched([...watched,movie])
    // localStorage.setItem("Watched",JSON.stringify([...watched,movie]))
  }

  // useEffect(function(){
  //   localStorage.setItem("Watched",JSON.stringify(watched))
  // },[watched])

  function handleColseMovie() {
    setSelectedId(null);
  }
  function handleDeleteWatched(id){
    setWatched(watched=>watched.filter(movie=>movie.imdbID !==id))
  }


  // useEffect(
  //   function () {
  //     const controller = new AbortController()
  //     async function fetchMovie() {
  //       try {
  //         setIsLoading(true);
  //         setError("");
  //         const res = await fetch(
  //           `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,{signal:controller.signal}
  //         );

  //         if (!res.ok) throw new Error("Something went wrong");

  //         const data = await res.json();

  //         if (data.Response === "False") throw new Error(data.Error);

  //         setMovies(data.Search);
  //         setError('')
  //         setIsLoading(false);
  //       } catch (err) {
  //         if (err.name !== "AbortError")
  //         setError(err.message);
  //       }
  //     }

  //     if (query.length < 3) {
  //       setMovies([]);
  //       setError("");
  //       return;
  //     }

  //     handleColseMovie()
  //     fetchMovie();

  //     return function(){
  //       controller.abort()
  //     }
  //   },
  //   [query]
  // );

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <ListBox
          element={
            error ? (
              <ErrorMessage message={error} />
            ) : isLoading ? (
              <Loader></Loader>
            ) : (
              <MovieList movies={movies} onSelectMovie={handleSeletMovied} />
            )
          }
        />
        <ListBox
          element={
            selectedId ? (
              <MovieDetails
                selectedId={selectedId}
                onClosebtn={handleColseMovie}
                onAddWatched = {handleAddWatched}
                watched = {watched}
              />
            ) : (
              <>
                <WatchedSummery watched={watched} />

                <WatchedMovieList watched={watched} onDeleteWatchedMovie = {handleDeleteWatched}/>
              </>
            )
          }
        />
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading....</p>;
}

function ErrorMessage({ message }) {
  return (
    <>
      <p className="error">{message}</p>
    </>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Search({ query, setQuery }) {
  const inputEl =  useRef(null)

  useKey("Enter",function(){
    if(document.activeElement ===inputEl.current) return; 
    inputEl.current.focus()
    setQuery('')
  })

  // useEffect(function(){
  //   inputEl.current.focus()

  // },[])

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function ListBox({ element }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && element}
    </div>
  );
}
/*
function WatchedBox() {
  const [watched, setWatched] = useState(tempWatchedData);

  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <WatchedSummery watched={watched} />

          <WatchedMovieList watched={watched} />
        </>
      )}
    </div>
  );
}
*/

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetails({ selectedId, onClosebtn,onAddWatched,watched }) {
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState('');
  const [isLoading, setIsLoading]= useState(false)

  const isWatched = watched.map((movie)=>movie.imdbID).includes(selectedId)
  const watchedMovieUserRating = watched.find(movie=>movie.imdbID === selectedId)?.userRating
  
  
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd(){
    const newWatchedMovie = {
      imdbID:selectedId,
      title,
      year,
      poster,
      imdbRating:Number(imdbRating),
      runtime:Number(runtime.split(' ').at(0)),
      userRating

    }
    onAddWatched(newWatchedMovie)
    onClosebtn()
  }

  useEffect(
    function () {
      async function getMovieDeyails() {
        try {
          setIsLoading(true)
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );
          // console.log("Respose:", res);

          if (!res.ok) throw new Error("Something went wrong");

          const data = await res.json();
          setMovie(data);
          setIsLoading(false)
        } catch (err) {
          console.log(err);
        }
      }

      getMovieDeyails();
    },
    [selectedId]
  );

  useKey('Escape',onClosebtn)
  // useEffect(function(){
  //   function callBack (e){
  //     if(e.code ==="Escape"){
  //       onClosebtn()
  //       console.log("Close")
  //     }
  //   }
  //   document.addEventListener("keydown",callBack)

  //   return function(){
  //     document.removeEventListener("keydown",callBack)
  //   }
  // },[onClosebtn])


  useEffect(function(){
    if (!title) return
    document.title = `Usepoopcorn | ${title}`

    return function(){
      document.title = "Usepopcorn"
    }
  },[title])
  return (
    <div className="details">
      { isLoading ? <Loader/> : <> <header>
        <button className="btn-back" onClick={onClosebtn}>
          &larr;
        </button>
        <img src={poster} alt={`Poster ${movie}`}></img>
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐️</span>
            {imdbRating} IMDb rating
          </p>
        </div>
      </header> 
      <section>
      <div className="rating">
       {!isWatched ? <>
       <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
        {userRating > 0 && <button className="btn-add" onClick={handleAdd}> Add To List</button>}
        </> : <p>This movie is already added & rated {watchedMovieUserRating} <span>⭐</span></p>} 
      </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section> </>}
        
    </div>
  );
}

function WatchedSummery({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched,onDeleteWatchedMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatchedMovie={onDeleteWatchedMovie} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie,onDeleteWatchedMovie }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      <button className="btn-delete" onClick={()=>onDeleteWatchedMovie(movie.imdbID)}><span> X </span></button>
      </div>
    </li>
  );
}
