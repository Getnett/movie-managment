import EmptyMovies from "./components/empty-movies";
import MovieList from "./components/movie-list";
import MoviesNavigation from "./components/movies-navigation";
import pool from "./data/data";
import MoviesRepo from "./repos/movie";

export const dynamic = "force-dynamic";

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
    <main className="min-h-[100vh] flex flex-col items-center  justify-center  lg:py-12 lg:px-120 py-12 sm:px-6">
      {response.length ? movieListContainer : <EmptyMovies />}
    </main>
  );
};
export default Home;
