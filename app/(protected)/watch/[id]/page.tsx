import { getMovieDetails } from '@/lib/tmdb';
import MoviePlayer from '@/components/MoviePlayer';
import Image from 'next/image';

export default async function WatchPage({ params }: { params: { id: string } }) {
  const movie = await getMovieDetails(params.id);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <MoviePlayer movieId={movie.id} title={movie.title} />

        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={300}
                height={450}
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold mb-4 text-gray-800">
                {movie.title}
              </h1>
              <div className="flex gap-4 mb-4">
                <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full font-bold">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-600">{movie.release_date}</span>
                <span className="text-gray-600">{movie.runtime} min</span>
              </div>
              <div className="mb-4">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {movie.overview}
              </p>

              {movie.credits?.cast && (
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">Cast</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {movie.credits.cast.slice(0, 8).map((actor) => (
                      <div key={actor.id} className="text-center">
                        {actor.profile_path && (
                          <Image
                            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                            alt={actor.name}
                            width={100}
                            height={150}
                            className="rounded-lg mx-auto mb-2"
                          />
                        )}
                        <p className="font-semibold text-sm">{actor.name}</p>
                        <p className="text-xs text-gray-600">{actor.character}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}