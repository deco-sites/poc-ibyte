import Avatar from "$store/components/ui/Avatar.tsx";
import Text from "$store/components/ui/Text.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

/**
 * A simple, inplace sku selector to be displayed once the user hovers the product card
 * It takes the user to the pdp once the user clicks on a given sku. This is interesting to
 * remove JS from the frontend
 */
function Sizes(product: Product) {
  const possibilities = useVariantPossibilities(product);
  const options = Object.entries(
    possibilities["TAMANHO"] ?? possibilities["Tamanho"] ?? {},
  );

  return (
    <ul class="flex justify-center items-center gap-2">
      {options.map(([url, value]) => (
        <a href={url}>
          <Avatar
            class="bg-default"
            variant="abbreviation"
            content={value}
            disabled={url === product.url}
          />
        </a>
      ))}
    </ul>
  );
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;
  variant?: "line";
}

function ProductCard({ product, preload, variant }: Props) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
  } = product;
  const [front, back] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);

  return (
    <div
      id={`product-card-${productID}`}
      class={`w-full group`}
    >
      <a
        href={url}
        aria-label="product link"
        class={`${
          variant === "line" ? "flex bg-white rounded shadow p-2 md:block" : ""
        }`}
      >
        <div
          class={`relative ${
            variant !== "line" ? "w-full" : "mr-3 w-[100px] md:w-full"
          }`}
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={130}
            height={130}
            class="rounded w-full group-hover:hidden"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            sizes="(max-width: 640px) 50vw, 20vw"
          />
          <Image
            src={back?.url ?? front.url!}
            alt={back?.alternateName ?? front.alternateName}
            width={130}
            height={130}
            class="rounded w-full hidden group-hover:block"
            sizes="(max-width: 640px) 50vw, 20vw"
          />
        </div>
        <div class={`${variant !== "line" ? "py-2" : "py-0 w-full"}`}>
          <Text
            class="h-12 text-xs text-gray-800 line-clamp-3 md:(text-sm h-[4rem])"
            variant="caption"
            as="p"
          >
            {name}
          </Text>
          <div class="min-h-[44px] flex flex-col justify-end mt-1">
            {listPrice !== price
              ? (
                <Text
                  class="line-through text-gray-500"
                  variant="list-price"
                  tone="subdued"
                  as="p"
                >
                  {formatPrice(listPrice, offers!.priceCurrency!)}
                </Text>
              )
              : null}
            <Text variant="body" tone="price" as="p" class="text-base">
              <span class="font-semibold">
                {formatPrice(price, offers!.priceCurrency!)}
              </span>{" "}
              à vista
            </Text>
            {installments && !installments?.includes("1x")
              ? (
                <Text variant="list-price" tone="price" as="p" class="text-sm">
                  ou{" "}
                  <span class="font-semibold">
                    {installments.replace(" sem juros", "")}
                  </span>
                </Text>
              )
              : null}
          </div>
        </div>
      </a>
    </div>
  );
}

export default ProductCard;
