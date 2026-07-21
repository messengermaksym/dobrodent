const prefix = process.env.NODE_ENV === 'production' ? '/dobrodent' : '';

export function getImageUrl(url?: string): string {
  if (!url) return `${prefix}/doctor-placeholder.svg?v=2`;
  
  // If it's already an absolute URL or base64 data URL, return as is
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }

  // Ensure leading slash
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;

  // Check if URL already contains prefix
  if (prefix && cleanUrl.startsWith(prefix)) {
    return cleanUrl;
  }

  return `${prefix}${cleanUrl}`;
}
