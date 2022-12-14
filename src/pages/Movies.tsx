import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { fetchMovies } from "../apis/fetchMovies";
import { Movie } from "../components/Movie";
import { NoResults } from "../components/NoResults";
import { SuggestionMessage } from "../components/SuggestionMessage";

export type array = {
  id: number;
};

const showItems = 10;

export const Movies = () => {
  const [movies, setMovies] = useState<array[] | null | undefined>([]);
  const searchTerm = useAppSelector((state) => state.movies.searchTerm);

  useEffect(() => {
    if (searchTerm.length > 2) fetchMovies(searchTerm, setMovies);
  }, [searchTerm, location.pathname]);

  return (
    <div className="movies-container">
      {searchTerm ? (
        movies && movies.length > 0 ? (
          movies
            .slice(0, showItems)
            .map((movie, i) => <Movie key={i} movieID={movie.id} />)
        ) : (
          <NoResults text="No results" />
        )
      ) : (
        <SuggestionMessage />
      )}
    </div>
  );
};
