import { Grid } from "@mui/material";
import MovieItem from "./movie";
import { Movies } from "../api/utils/types";

const MovieList = ({ movies }: Movies) => {
  return (
    <>
      <Grid container maxWidth="lg" spacing={2} marginTop="7.5rem">
        {movies?.map((movie) => (
          <Grid key={movie.id} item xs={12} md={3}>
            <MovieItem movie={movie} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MovieList;
