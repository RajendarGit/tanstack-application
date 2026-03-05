import type { MoviesResponse } from "type";

export async function fetchMovies({ pageParam = 1, type = "popular" }) {
    const apiKey = import.meta.env.VITE_API_KEY;
    const response = await fetch(
        `${import.meta.env.VITE_API_URL_MOVIES}/movie/${type}?api_key=${apiKey}&language=en-US&page=${pageParam}`,
        {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${import.meta.env.TMDB_BEARER_TOKEN}`,
            },

        }
    );
    if (!response.ok) {
        throw new Error("Failed to fetch movies");
    }

    const data: MoviesResponse = await response.json();
    return data.results;
    return response.json();
}