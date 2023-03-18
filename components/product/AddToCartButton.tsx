import Button from "$store/components/ui/Button.tsx";
import { useAddToCart } from "$store/sdk/useAddToCart.ts";

interface Props {
  skuId: string;
  sellerId: string;
}

function AddToCartButton({ skuId, sellerId }: Props) {
  const props = useAddToCart({
    skuId,
    sellerId,
  });

  return (
    <Button
      {...props}
      variant="custom"
      class="py-3 w-full cursor-pointer rounded font-body bg-interactive py-3 text-center text-lg text-white transition hover:shadow"
    >
      Adicionar à Sacola
    </Button>
  );
}

export default AddToCartButton;
