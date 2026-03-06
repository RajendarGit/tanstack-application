import type { MoviesResponse } from "type";

const rest = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.TMDB_BEARER_TOKEN}`,
    },
}

export async function fetchAllMovies() {
    const apiKey = import.meta.env.VITE_API_KEY;
    const response = await fetch(
        `${import.meta.env.VITE_API_URL_MOVIES}/discover/movie?api_key=${apiKey}&language=en-US&page=1`,
        rest
    );

    if (!response.ok) {
        throw new Error("Failed to fetch movies");
    }

    const data: MoviesResponse = await response.json();
    return data.results;
}

// fetchMovies.ts
export async function fetchMovies({ pageParam = 1, type }: { pageParam?: number; type: string }) {
    const apiKey = import.meta.env.VITE_API_KEY;
    const response = await fetch(
        `${import.meta.env.VITE_API_URL_MOVIES}/movie/${type}?api_key=${apiKey}&language=en-US&page=${pageParam}`,
        rest
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch ${type} movies`);
    }

    const data: MoviesResponse = await response.json();
    return data.results;
}