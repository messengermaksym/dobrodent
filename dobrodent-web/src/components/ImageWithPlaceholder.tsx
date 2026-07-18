"use client";

import { useState } from "react";

interface ImageWithPlaceholderProps {
  src: string;
  alt: string;
  className?: string;
  fetchPriority?: "high" | "low" | "auto";
}

const prefix = process.env.NODE_ENV === 'production' ? '/dobrodent' : '';

export default function ImageWithPlaceholder({
  src,
  alt,
  className = "",
  fetchPriority = "auto"
}: ImageWithPlaceholderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden bg-muted">
      {/* Animated Logo Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#fdfaf9] z-10 transition-opacity duration-300">
          <div className="relative flex items-center justify-center">
            {/* Spinning/pulsing soft background ring */}
            <div className="absolute w-32 h-32 rounded-full border-2 border-primary/20 border-t-primary animate-spin"></div>
            {/* Pulsing logo icon */}
            <img
              src={`${prefix}/logo_transparent.png`}
              alt="Завантаження..."
              className="w-20 h-20 object-contain animate-pulse relative z-20"
            />
          </div>
        </div>
      )}

      {/* Main Image */}
      <img
        src={src}
        alt={alt}
        fetchPriority={fetchPriority}
        onLoad={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-500 ease-in-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
