import type { LoaderReturnType } from "$live/types.ts";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Button from "$store/components/ui/Button.tsx";
import Container from "$store/components/ui/Container.tsx";
import Text from "$store/components/ui/Text.tsx";
import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";
import type { ClientConfigVTEX } from "deco-sites/std/functions/vtexConfig.ts";
import ShippingSimulation from "../shipping/ShippingSimulation.tsx";
import ImageGallery from "./ImageGallery.tsx";
import ProductDescription from "./ProductDescription.tsx";
import ProductSelector from "./ProductVariantSelector.tsx";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
  /**
   * @description vtex config used for simulation
   */
  configVTEX?: LoaderReturnType<ClientConfigVTEX>;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <Text variant="heading-2">Página não encontrada</Text>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function Details(
  { page, configVTEX }: {
    page: ProductDetailsPage;
    configVTEX?: ClientConfigVTEX;
  },
) {
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    description,
    productID,
    offers,
    image: images,
    name,
    gtin,
  } = product;
  const { price, listPrice, seller, installments } = useOffer(offers);

  return (
    <Container class="py-0 sm:py-10 block">
      <div class="flex flex-col gap-4 sm:flex-row sm:gap-10 bg-white rounded p-4">
        {/* Image Gallery */}
        {images && images.length > 0 ? <ImageGallery images={images} /> : null}

        {/* Product Info */}
        <div class="flex-auto px-4 sm:px-0">
          {/* Code and name */}
          <div class="mt-4 sm:mt-8">
            <Text variant="caption" class="text-gray-600">
              Cod. {gtin}
            </Text>
            <h1 class="text-heading-3 text-default font-body">
              {name}
            </h1>
          </div>
          {/* Prices */}
          <div class="mt-3">
            {listPrice !== price
              ? (
                <Text
                  class="text-gray-500"
                  variant="list-price"
                  tone="subdued"
                  as="p"
                >
                  de{" "}
                  <Text
                    class="line-through"
                    variant="list-price"
                    tone="subdued"
                  >
                    {formatPrice(listPrice, offers!.priceCurrency!)}
                  </Text>
                </Text>
              )
              : null}
            <Text variant="body" tone="price" as="p" class="text-base mt-1">
              por{" "}
              <span class="font-semibold text-heading-2 text-emphasis">
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
          {/* Sku Selector */}
          <div class="mt-4 sm:mt-6">
            <ProductSelector product={product} />
          </div>
          {configVTEX
            ? (
              <div>
                <ShippingSimulation
                  configVTEX={configVTEX}
                  item={{
                    id: Number(product.sku),
                    quantity: 1,
                    seller: seller ?? "1",
                  }}
                />
              </div>
            )
            : null}
          {/* Add to Cart and Favorites button */}
          <div class="mt-4 sm:mt-10 flex flex-col gap-2">
            {seller && (
              <>
                <AddToCartButton
                  skuId={productID}
                  sellerId={seller}
                />
                <p class="text-sm text-center">
                  Vendido e entregue por{" "}
                  <span class="font-medium">
                    {seller === "1" ? "ibyte" : seller}
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
        {/* Description card */}
      </div>
      {description ? <ProductDescription description={description} /> : null}
    </Container>
  );
}

function ProductDetails({ page, configVTEX }: Props) {
  if (page) {
    return <Details page={page} configVTEX={configVTEX} />;
  }

  return <NotFound />;
}

export default ProductDetails;
