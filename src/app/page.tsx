import EmptyMovies from "./components/empty-movies";
import MovieList from "./components/movie-list";
import MoviesNavigation from "./components/movies-navigation";

const Home = async () => {
  console.log("process.env.NEXTAUTH_URL", process.env.NEXTAUTH_URL);
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/movies/list`, {
    cache: "no-cache",
  });

  console.log("response", response);
  const result = await response.json();
  const movies = result.data;

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
