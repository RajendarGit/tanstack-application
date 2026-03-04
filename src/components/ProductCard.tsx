import type { Products } from "type";

export default function ProductCard({ product }: { product: Products }) {
  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <h3 className="text-lg font-semibold">{product.title}</h3>
      <p className="text-gray-600">{product.body}</p>
    </div>
  );
}
