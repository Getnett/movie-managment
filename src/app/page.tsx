import EmptyMovies from "./components/empty-movies";
import MovieList from "./components/movie-list";
import MoviesNavigation from "./components/movies-navigation";
import pool from "./data/data";
import MoviesRepo from "./repos/movie";

const Home = async () => {
  console.log("process.env.NEXTAUTH_URL", process.env.NEXTAUTH_URL);
  // await pool.connect({
  //   host: process.env.DATABASE_SERVER_DOMAIN,
  //   port: Number(`${process.env.DATABASE_SERVER_PORT}`), // revisit
  //   database: process.env.DATABASE_NAME,
  //   user: process.env.DATABASE_USER,
  //   password: process.env.DATABASE_PASSWORD,
  // });

  await pool.connect({
    connectionString: process.env.DATABASE_URL,
  });
  const response = await MoviesRepo.allMovies();
  console.log("response", response);

  const movies = response;

  console.log("Check-env", process.env.DATABASE_SERVER_DOMAIN);

  const movieListContainer = (
    <>
      <MoviesNavigation />
      <MovieList movies={movies} />
    </>
  );
  return (
    <main className="flex h-full flex-col items-center justify-between pt-120 px-120">
      {movies.length ? movieListContainer : <EmptyMovies />}
    </main>
  );
};
export default Home;
