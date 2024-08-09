"use client";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, TextField } from "@mui/material";
import { useDropzone } from "react-dropzone";

const CreateMovie = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [formState, setFormState] = useState({
    title: "",
    year: "",
    rating: "",
    description: "",
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
    setLoading(true);

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

    const imageURL = `${process.env.NEXT_PUBLIC_S3_URL}/${file?.name}`;

    await fetch(`/api/movies/create-movie`, {
      method: "POST",
      body: JSON.stringify({
        title: formState.title,
        year: formState.year,
        rating: formState.rating,
        description: formState.description,
        imageUrl: imageURL,
      }),
    });

    setFormState({
      title: "",
      year: "",
      rating: "",
      description: "",
    });

    router.push("/");
    router.refresh();
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="sm:text-5xl text-2xl pt-3">Create a new movie </h2>
      <form
        className="flex flex-col sm:flex-row gap-x-20 py-8 w-full items-center"
        onSubmit={handleSubmit}
      >
        <div className="w-full lg:min-w-[473px] md:w-[50%]">
          <div
            {...getRootProps()}
            className="rounded-[10px] mb-4 border-2 border-dashed border-white flex justify-center  items-center h-[280px] sm:h-[504px]"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop an image here</p>
            ) : (
              <p>Drop an image here</p>
            )}
          </div>
          {file && <p>{file.name}</p>}
        </div>
        <div className="flex flex-col  gap-4 w-full w-full sm:w-[50%] max-w-[380px]">
          <TextField
            id="title-input"
            name="title"
            fullWidth
            sx={{ width: "100%" }}
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
              disabled={loading}
              variant="contained"
              sx={{ width: "100%", padding: "1rem 3.4rem" }}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateMovie;
