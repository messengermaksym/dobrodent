"use client";

import { useState, useRef, useEffect } from "react";

interface ImageWithPlaceholderProps {
  src: string;
  alt: string;
  className?: string;
  fetchPriority?: "high" | "low" | "auto";
  width?: number;
  height?: number;
}

const prefix = process.env.NODE_ENV === 'production' ? '/dobrodent' : '';

export default function ImageWithPlaceholder({
  src,
  alt,
  className = "",
  fetchPriority = "auto",
  width,
  height
}: ImageWithPlaceholderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-muted">
      {/* Animated Logo Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#fdfaf9] z-10 transition-opacity duration-300">
          <div className="relative flex items-center justify-center">
            {/* Spinning/pulsing soft background ring with larger radius */}
            <div className="absolute w-28 h-28 rounded-full border-2 border-primary/20 border-t-primary animate-spin"></div>
            {/* Pulsing logo icon */}
            <img
              src={`${prefix}/logo-dobrodent.webp`}
              alt="Завантаження..."
              width={48}
              height={48}
              className="w-12 h-12 object-contain animate-pulse relative z-20"
            />
          </div>
        </div>
      )}

      {/* Main Image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        fetchPriority={fetchPriority}
        onLoad={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-500 ease-in-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
