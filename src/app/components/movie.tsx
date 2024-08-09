"use client";

import { FC } from "react";
import styled from "@mui/material/styles/styled";
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";

import Card from "@mui/material/Card";
import { Movie as MovieType } from "../api/utils/types";
import { useRouter } from "next/navigation";

const StyledCard = styled(Card)(() => ({
  padding: ".5rem .5rem 1rem .5rem",
  borderRadius: 10,
  backgroundColor: "#092C39",
  "&.MuiCard-root": {
    width: "282px !important",
  },
  overflow: "hidden",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#1e414e",
  },
}));

const StyledCardActionArea = styled(CardActionArea)(() => ({
  ".MuiCardActionArea-focusHighlight": {
    background: "transparent",
  },
}));

const StyledCardMedia = styled(CardMedia)({
  width: "100%",
  height: 400,
  borderRadius: 10,
  objectFit: "cover",
}) as typeof CardMedia;

const Overlay = styled("div")(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  opacity: "0",
  transition: "opacity 0.3s",
  borderRadius: 10,
  "&:hover": {
    opacity: 1,
  },
}));

const Content = styled(CardContent)(() => ({
  position: "relative",
  zIndex: "1",
  color: "#fff",
}));

const StyledRating = styled(Rating)({
  "& .MuiRating-iconEmpty": {
    color: "#ffffff",
  },
});

interface MovieProps {
  movie: MovieType;
}

const Movie: FC<MovieProps> = ({ movie }) => {
  const router = useRouter();

  console.log("movie", movie);

  const handleNavigation = (id: string) => {
    router.push(`/edit-movie/${id}`);
  };
  return (
    <StyledCard>
      <StyledCardActionArea
        onClick={() => handleNavigation(movie.id)}
        sx={{
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        <StyledCardMedia
          component="img"
          image={movie.imageUrl}
          alt={movie.title}
        />
        <Content>
          <Typography
            gutterBottom
            variant="h3"
            component="h3"
            sx={{ fontWeight: 500 }}
          >
            {movie.title}
          </Typography>
          <div className="flex gap-2 items-center">
            <StyledRating
              name="half-rating-read"
              size="medium"
              defaultValue={movie.rating}
              precision={0.5}
              readOnly
            />
            <Typography variant="body2">{movie.rating}</Typography>
          </div>
          <Typography mt=".5rem" variant="body1" color="text.primary">
            {movie.description}
          </Typography>
          <Typography mt=".5rem" variant="body2" color="text.primary">
            {movie.year}
          </Typography>
        </Content>
      </StyledCardActionArea>
    </StyledCard>
  );
};

export default Movie;
