import UpdateMovie from "../../components/edit-movie";
import pool from "../../data/data";
import MovieRepo from "../../repos/movie";

interface Params {
  params: {
    id: string;
  };
}
const EditMoviePage = async ({ params }: Params) => {
  const { id } = params;
  await pool.connect({
    connectionString: process.env.DATABASE_URL,
  });
  const data = await MovieRepo.findMovieById(id);

  return (
    <div className="h-screen flex items-center justify-center">
      <UpdateMovie movie={data} />
    </div>
  );
};

export default EditMoviePage;
