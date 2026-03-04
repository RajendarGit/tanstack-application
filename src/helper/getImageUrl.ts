export function getImageUrl(path: string | null, size: string = "w500") {
    return path ? `https://image.tmdb.org/t/p/${size}${path}` : "/placeholder.png";
}