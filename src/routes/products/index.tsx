import { createFileRoute } from "@tanstack/react-router";
import ProductCard from "#/components/ProductCard";
import { Button } from "#/components/ui/button";
import { fetchProducts } from "#/queries/fetchProducts";
import { postProducts } from "#/queries/postProducts";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type { Products } from "type";
import { toast } from "sonner";
import ContainerLayout from "#/components/ContainerLayout";

export const Route = createFileRoute("/products/")({
  component: ProductsComponent,
});

function ProductsComponent() {
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["products"],
      queryFn: fetchProducts,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        // If API returns empty array, stop
        return lastPage.length === 0 ? undefined : allPages.length + 1;
      },
    });

  const mutation = useMutation({
    mutationFn: postProducts,
    onSuccess: (newProduct) => {
      queryClient.setQueryData(["products"], (old: any) => {
        if (!old) return { pages: [[newProduct]], pageParams: [1] };
        return {
          ...old,
          pages: [
            ...old.pages.slice(0, -1),
            [...old.pages[old.pages.length - 1], newProduct],
          ],
        };
      });
      toast.success("Product added successfully!");
    },
  });

  return (
    <ContainerLayout>
      <div className="flex flex-col gap-4 relative mt-20">
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() =>
              mutation.mutate({
                product: {
                  id: Date.now(),
                  title: "New Product",
                  body: "This is a new product.",
                },
              })
            }
          >
            Add Product
          </Button>
        </div>
        {data?.pages.map((page, i) => (
          <div className="flex flex-col gap-4" key={i}>
            {page.map((product: Products) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ))}
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </Button>
        )}
      </div>
    </ContainerLayout>
  );
}
