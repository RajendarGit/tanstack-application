import axios from "axios";
import type { CreditsResponse } from "type";

export async function getMovieCredits(movie_id: string) {
    const API_URL = import.meta.env.VITE_API_URL_MOVIES;
    const API_KEY = import.meta.env.VITE_API_KEY;

    const url = `${API_URL}/movie/${movie_id}/credits?api_key=${API_KEY}`;

    const res = await axios.get(url);

    if (!res.data) {
        throw new Error("Credits not found");
    }

    return res.data as CreditsResponse;
}