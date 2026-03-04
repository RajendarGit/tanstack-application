import type { Products } from "type";

export async function postProducts({ product }: {
    product: Products
}) {
    const url = import.meta.env.VITE_API_URL;
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });

    if (!res.ok) {
        throw new Error("Failed to post product");
    }

    return res.json();
}