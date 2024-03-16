import { useEffect, useState } from "react";

const KEY = "9efb92c2";

export function useMovies (query){
      const [movies, setMovies] = useState([]);
      const [error, setError] = useState("");
      const [isLoading, setIsLoading] = useState(false);

      useEffect(
    function () {
       
      const controller = new AbortController()
      async function fetchMovie() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,{signal:controller.signal}
          );

          if (!res.ok) throw new Error("Something went wrong");

          const data = await res.json();

          if (data.Response === "False") throw new Error(data.Error);

          setMovies(data.Search);
          setError('')
          setIsLoading(false);
        } catch (err) {
          if (err.name !== "AbortError")
          setError(err.message);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

     
      fetchMovie();

      return function(){
        controller.abort()
      }
    },
    [query]
  );
  return {movies,isLoading,error}
}