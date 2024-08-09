"use client";
import { ChangeEvent, FC, FormEvent, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, TextField } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { Movie } from "../api/utils/types";

interface UpdateMovieProps {
  movie: Movie;
}
const UpdateMovie: FC<UpdateMovieProps> = ({ movie }) => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [formState, setFormState] = useState({
    title: movie.title,
    year: movie.year,
    rating: movie.rating,
    description: movie.description,
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles) {
      // Process each file dropped
      acceptedFiles.forEach((file, _index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFile(file);
          // Check for duplicate files
        };

        reader.readAsDataURL(file);
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
    onDrop,
    multiple: false,
    maxFiles: 1,
  });

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleCancelUpdating = () => {
    router.push("/");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // get the presigned url
    const response = await fetch(`/api/upload-presigned-url`, {
      method: "POST",
      body: JSON.stringify({
        fileName: file?.name || "",
        fileType: file?.type || "",
      }),
    });
    const responseData = await response.json();
    const urlToUpload = responseData.data;

    await fetch(urlToUpload, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file?.type || "image/png",
      },
    });

    const imageURL = file?.name
      ? `${process.env.NEXT_PUBLIC_S3_URL}/${file?.name}`
      : movie.imageUrl;

    await fetch(`/api/movies/edit-movie/${movie.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: formState.title,
        year: formState.year,
        rating: formState.rating,
        description: formState.description,
        imageUrl: imageURL,
      }),
    });

    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex gap-x-40">
      <form className="flex gap-x-40" onSubmit={handleSubmit}>
        <div>
          <Box
            {...getRootProps()}
            style={{
              border: isFocused ? "2px dashed green" : "2px dashed #fff",
              display: "flex",
              width: 473,
              height: 504,
              alignItems: "center",
              justifyContent: "center",
            }}
            mb="1.5rem"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop other image here</p>
            ) : (
              <p>Drop other image here</p>
            )}
          </Box>
          {file && <p>{file.name}</p>}
        </div>

        <div className="flex flex-col gap-4">
          <TextField
            id="title-input"
            name="title"
            size="small"
            placeholder="Title"
            value={formState.title}
            onChange={handleOnChange}
          />
          <TextField
            id="year"
            name="year"
            size="small"
            placeholder="Year"
            value={formState.year}
            onChange={handleOnChange}
          />

          <TextField
            id="rating"
            name="rating"
            size="small"
            placeholder="Rating"
            value={formState.rating}
            onChange={handleOnChange}
          />
          <TextField
            id="description"
            name="description"
            size="small"
            type="textarea"
            multiline
            rows={3}
            placeholder="Description"
            value={formState.description}
            onChange={handleOnChange}
          />
          <div className="w-full flex gap-4 mt-120">
            <Button
              onClick={handleCancelUpdating}
              variant="outlined"
              sx={{ width: "100%", padding: "1rem 3.4rem" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "100%", padding: "1rem 3.4rem" }}
            >
              Update
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateMovie;
