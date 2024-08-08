export interface Movie {
  id: string;
  title: string;
  year: number;
  imageUrl: string;
  description: string;
  rating: number;
}

export interface Movies {
  movies: Movie[];
}
