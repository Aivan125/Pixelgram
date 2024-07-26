import React, { useState, useRef, useEffect, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LazyImage = ({
  src,
  alt,
  className = "",
  width,
  height,
  isFirstImage = false,
  skeletonClassName,
  rootMargin,
  threshold,
  errorMessage,
}) => {
  const [inView, setInView] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef();

  const onIntersect = useCallback(([entry]) => {
    if (entry.isIntersecting) {
      setInView(true);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      rootMargin,
      threshold,
    });

    const currentImgRef = imgRef.current;

    if (currentImgRef) {
      observer.observe(currentImgRef);
    }

    return () => {
      if (currentImgRef) {
        observer.unobserve(currentImgRef);
      }
      observer.disconnect();
    };
  }, [onIntersect, rootMargin, threshold]);

  useEffect(() => {
    if (inView) {
      const img = new Image();
      img.src = src;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setError(true);
    }
  }, [inView, src]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setError(true);
  };

  return (
    <div
      ref={imgRef}
      className={`${className} relative`}
      style={{ width, height }}
    >
      {inView ? (
        <>
          {!imageLoaded && !error && (
            <Skeleton
              className={`absolute inset-0 h-full w-full animate-pulse ${skeletonClassName}`}
            />
          )}
          {error ? (
            <div
              className={`flex h-full w-full items-center justify-center ${skeletonClassName} text-white`}
            >
              {errorMessage}
            </div>
          ) : (
            <img
              src={src}
              alt={alt}
              className={`h-full w-full object-cover transition-opacity duration-200 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading={isFirstImage ? "eager" : "lazy"}
            />
          )}
        </>
      ) : (
        <Skeleton
          className={`h-full w-full animate-pulse ${skeletonClassName}`}
        />
      )}
    </div>
  );
};

export default LazyImage;
