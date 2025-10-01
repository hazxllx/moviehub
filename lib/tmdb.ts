const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY!;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function searchMovies(query: string) {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch movies');
  return response.json();
}

export async function getTrending() {
  const url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch trending movies');
  return response.json();
}

export async function getPopular() {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch popular movies');
  return response.json();
}

export async function getMovieDetails(id: string) {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch movie details');
  return response.json();
}
