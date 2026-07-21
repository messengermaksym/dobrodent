"use client";

import { useState, useRef, useEffect } from "react";
import { getImageUrl } from "@/lib/getImageUrl";

interface ImageWithPlaceholderProps {
  src: string;
  alt: string;
  className?: string;
  fetchPriority?: "high" | "low" | "auto";
  width?: number;
  height?: number;
}

export default function ImageWithPlaceholder({
  src,
  alt,
  className = "",
  fetchPriority = "auto",
  width,
  height
}: ImageWithPlaceholderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const finalSrc = hasError ? getImageUrl("/doctor-placeholder.svg?v=2") : getImageUrl(src);

  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
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
            {/* Spinning/pulsing soft background ring */}
            <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-primary/20 border-t-primary animate-spin"></div>
            {/* Pulsing logo icon */}
            <img
              src={getImageUrl("/logo-dobrodent.webp")}
              alt="Завантаження..."
              width={40}
              height={40}
              className="w-10 h-10 object-contain animate-pulse relative z-20"
            />
          </div>
        </div>
      )}

      {/* Main Image */}
      <img
        ref={imgRef}
        src={finalSrc}
        alt={alt}
        width={width}
        height={height}
        fetchPriority={fetchPriority}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        className={`${className} transition-opacity duration-300 ease-in-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
