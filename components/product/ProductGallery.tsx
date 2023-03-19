import ProductCard from "$store/components/product/ProductCard.tsx";
import Container from "$store/components/ui/Container.tsx";
import Button from "$store/components/ui/Button.tsx";
import Text from "$store/components/ui/Text.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <Text>Not Found!</Text>
    </div>
  );
}

function Gallery({ page }: { page: ProductListingPage }) {
  const pageName =
    page.breadcrumb.itemListElement[page.breadcrumb.itemListElement.length - 1];
  return (
    <Container class="px-4 sm:py-10 bg-gray-100">
      {pageName
        ? (
          <h1 class="text-heading-2 font-heading-2 text-center mb-6">
            {pageName.name}
          </h1>
        )
        : null}

      <div class="relative grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 lg:sm:grid-cols-6 sm:gap-3 items-center">
        {page.products?.map((product, index) => (
          <div class="w-full list-none">
            <ProductCard variant="line" product={product} preload={index < 4} />
          </div>
        ))}
      </div>

      <div class="flex flex-row items-center justify-center gap-2 my-4">
        <a
          aria-label="página anterior"
          rel="prev"
          href={page.pageInfo.previousPage ?? "#"}
        >
          <Button
            aria-label="página anterior"
            disabled={!page.pageInfo.previousPage}
            variant="icon"
          >
            <Icon id="ChevronLeft" width={20} height={20} strokeWidth={2} />
          </Button>
        </a>
        <Text variant="caption">
          {page.pageInfo.currentPage + 1}
        </Text>
        <a
          aria-label="próxima página"
          rel="next"
          href={page.pageInfo.nextPage ?? "#"}
        >
          <Button
            aria-label="próxima página"
            disabled={!page.pageInfo.nextPage}
            variant="icon"
          >
            <Icon id="ChevronRight" width={20} height={20} strokeWidth={2} />
          </Button>
        </a>
      </div>
    </Container>
  );
}

function ProductGallery({ page }: Props) {
  if (!page) {
    return <NotFound />;
  }

  return <Gallery page={page} />;
}

export default ProductGallery;
