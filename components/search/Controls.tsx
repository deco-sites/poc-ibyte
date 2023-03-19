import type { LoaderReturnType } from "$live/types.ts";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Button from "$store/components/ui/Button.tsx";
import Container from "$store/components/ui/Container.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Modal from "$store/components/ui/Modal.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
}

function NotFound() {
  return <div />;
}

function Controls({ page }: { page: ProductListingPage }) {
  const open = useSignal(false);
  const filters = page?.filters;

  return (
    <Container class="flex bg-gray-100 flex-col justify-between pb-4 md:mb-0 px-4 pb-3 pt-2 md:p-0 sm:gap-4 sm:flex-row sm:h-[53px] md:border-b-1">
      <div class="flex flex-row sm:gap-4 items-center justify-between">
        <Button
          variant="tertiary"
          class="bg-transparent"
          onClick={() => {
            open.value = true;
          }}
        >
          Filtros
          <Icon id="FilterList" width={16} height={16} />
        </Button>
        <Sort />
      </div>

      <Modal
        title="Filtrar"
        mode="sidebar-right"
        open={open.value}
        onClose={() => {
          open.value = false;
        }}
      >
        <Filters filters={filters} />
      </Modal>
    </Container>
  );
}

function SearchControls({ page }: Props) {
  if (!page || !page.filters || page.filters.length === 0) {
    return <NotFound />;
  }

  return <Controls page={page} />;
}

export default SearchControls;
