export async function fetchProducts({ pageParam = 1 }) {
    const url = `${import.meta.env.VITE_API_URL}?_page=${pageParam}&_limit=5`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}