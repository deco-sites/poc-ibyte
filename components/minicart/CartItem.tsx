import Image from "deco-sites/std/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Text from "$store/components/ui/Text.tsx";
import Button from "$store/components/ui/Button.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import { useCart } from "deco-sites/std/commerce/vtex/hooks/useCart.ts";
import { formatPrice } from "$store/sdk/format.ts";

interface Props {
  index: number;
}

function CartItem({ index }: Props) {
  const { loading, cart, updateItems } = useCart();
  const item = cart.value!.items[index];
  const locale = cart.value?.clientPreferencesData.locale;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const {
    imageUrl,
    skuName,
    sellingPrice,
    listPrice,
    name,
    quantity,
  } = item;

  const isGift = sellingPrice < 0.01;

  return (
    <div class="flex flex-row justify-between items-start gap-4">
      <Image
        src={imageUrl}
        alt={skuName}
        width={64}
        height={64}
        class="object-cover object-center"
      />
      <div class="flex-grow">
        <Text variant="body" as="p" class="text-sm font-body mb-3">
          {name}
        </Text>
        <div class="w-full flex justify-between items-center">
          <QuantitySelector
            disabled={loading.value || isGift}
            quantity={quantity}
            onChange={(quantity) =>
              updateItems({ orderItems: [{ index, quantity }] })}
          />
          <Text
            variant="body"
            as="p"
            tone="price"
            class="text-base font-body"
          >
            {isGift ? "Grátis" : (
              <>
                {formatPrice(sellingPrice / 100, currencyCode!, locale)}{" "}
                <small class="text-gray-700">à vista</small>
              </>
            )}
          </Text>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
