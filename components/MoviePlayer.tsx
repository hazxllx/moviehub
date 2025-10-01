'use client';

interface MoviePlayerProps {
  movieId: number;
  title: string;
}

export default function MoviePlayer({ movieId, title }: MoviePlayerProps) {
  return (
    <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl mx-auto">
      <iframe
        src={`https://vidsrc.xyz/embed/movie/${movieId}`}
        allowFullScreen
        title={title}
        className="absolute inset-0 w-full h-full"
        frameBorder={0}
        scrolling="no"
        allow="autoplay; fullscreen"
      />
    </div>
  );
}
