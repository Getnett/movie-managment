"use client";
import { useCallback } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Box, Button, TextField } from "@mui/material";
import { useDropzone } from "react-dropzone";

import { creatMovie } from "../lib/serverActions";

const CreateMovie = () => {
  const router = useRouter();
  const initialState = { message: null, errors: {} };
  // @ts-ignore
  const [state, dispatch] = useFormState(creatMovie, initialState);
  console.log("state", state.errors);

  const handleCancelUpdating = () => {
    router.push("/");
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    // noDragEventsBubbling: true, Check later
  });

  return (
    <div className="flex gap-x-40">
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
        // className="dropzone"
      >
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop an image here</p> : <p>Drop an image here</p>}
      </Box>

      <form action={dispatch}>
        <div className="flex flex-col gap-4">
          <TextField
            id="title-input"
            name="title"
            size="small"
            placeholder="Title"
          />
          <TextField id="year" name="year" size="small" placeholder="Year" />

          <TextField
            id="rating"
            name="rating"
            size="small"
            placeholder="Rating"
          />
          <TextField
            id="description"
            name="description"
            size="small"
            type="textarea"
            multiline
            rows={3}
            placeholder="Description"
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
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateMovie;
