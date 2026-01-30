import React from "react";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  pictureClassName?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
}

/**
 * Converts image path to WebP path
 * /images/photo.jpg -> /images/photo.webp
 */
function getWebPPath(src: string): string {
  return src.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i, ".webp");
}

/**
 * OptimizedImage Component
 * Uses <picture> tag to serve WebP with JPEG/PNG fallback
 * This preserves SEO (Google indexes the fallback) while serving fast WebP to users
 */
export function OptimizedImage({
  src,
  alt,
  className = "",
  pictureClassName = "",
  loading = "lazy",
  fetchPriority,
  ...props
}: OptimizedImageProps) {
  const webpSrc = getWebPPath(src);
  const isWebPConvertible = /\.(jpg|jpeg|png)$/i.test(src);

  // If source is already WebP or not convertible, just render img
  if (!isWebPConvertible) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        {...(fetchPriority && { fetchpriority: fetchPriority })}
        {...props}
      />
    );
  }

  return (
    <picture className={pictureClassName}>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        {...(fetchPriority && { fetchpriority: fetchPriority })}
        {...props}
      />
    </picture>
  );
}

export default OptimizedImage;
