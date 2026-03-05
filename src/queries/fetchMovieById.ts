import axios from "axios";

export async function fetchMovieById(id: string) {
    const apiKey = import.meta.env.VITE_API_KEY;
    const res = await axios.get(`${import.meta.env.VITE_API_URL_MOVIES}/movie/${id}?api_key=${apiKey}&language=en-US`);

    if (!res.data) {
        throw new Error("Movie not found");
    }

    return res.data;
}