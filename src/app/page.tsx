import EmptyMovies from "./components/empty-movies";
import MovieList from "./components/movie-list";
import MoviesNavigation from "./components/movies-navigation";
import pool from "./data/data";
import MoviesRepo from "./repos/movie";

const Home = async () => {
  await pool.connect({
    connectionString: process.env.DATABASE_URL,
  });
  const response = await MoviesRepo.allMovies();

  const movieListContainer = (
    <>
      <MoviesNavigation />
      <MovieList movies={response} />
    </>
  );
  return (
    <main className="flex h-full flex-col items-center justify-between pt-120 px-120">
      {response.length ? movieListContainer : <EmptyMovies />}
    </main>
  );
};
export default Home;
