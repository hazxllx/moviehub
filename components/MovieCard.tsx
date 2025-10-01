import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder.png';

  return (
    <Link href={`/watch/${movie.id}`}>
      <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white">
        <div className="relative h-80">
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4 bg-white">
          <h3 className="font-bold text-lg text-gray-800 truncate group-hover:text-indigo-600 transition">
            {movie.title}
          </h3>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              {movie.release_date?.split('-')[0] || 'N/A'}
            </span>
            <span className="bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}