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
    host: process.env.DATABASE_SERVER_DOMAIN,
    port: Number(`${process.env.DATABASE_SERVER_PORT}`), // revisit
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  });
  const data = await MovieRepo.findMovieById(id);
  console.log("data", data);

  return (
    <div className="h-screen flex items-center justify-center">
      <UpdateMovie movie={data} />
    </div>
  );
};

export default EditMoviePage;
