import Button from "$store/components/ui/Button.tsx";
import { useAddToCart } from "$store/sdk/useAddToCart.ts";
import Icon from "$store/components/ui/Icon.tsx";

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
      <Icon width={20} height={20} id="ShoppingCart" />
      Comprar
    </Button>
  );
}

export default AddToCartButton;
