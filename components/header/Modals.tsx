import Modal from "$store/components/ui/Modal.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { lazy, Suspense } from "preact/compat";

import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Loading from "$store/components/ui/Loading.tsx";
import MenuHeader from "./MenuHeader.tsx";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));
const Cart = lazy(() => import("$store/components/minicart/Cart.tsx"));

interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
}

function Modals({ menu }: Props) {
  const { displayCart, displayMenu, displayWishlist } = useUI();

  return (
    <>
      <Modal
        mode="sidebar-left"
        class="max-w-[18rem]"
        customHeader={<MenuHeader />}
        loading="lazy"
        open={displayMenu.value}
        onClose={() => {
          displayMenu.value = false;
        }}
      >
        <Suspense fallback={<Loading />}>
          <Menu {...menu} />
        </Suspense>
      </Modal>

      <Modal
        title="Wishlist"
        mode="center"
        loading="lazy"
        open={displayWishlist.value}
        onClose={() => {
          displayWishlist.value = false;
        }}
      >
        <Suspense fallback={<Loading />}>
          <div>
            <Icon id="Heart" width={28} height={28} />
          </div>
          <p>Voce nao tem produto favoritado.</p>
        </Suspense>
      </Modal>

      <Modal
        title="Meu carrinho"
        class="max-w-sm"
        mode="sidebar-right"
        loading="lazy"
        open={displayCart.value}
        onClose={() => {
          displayCart.value = false;
        }}
      >
        <Suspense fallback={<Loading />}>
          <Cart />
        </Suspense>
      </Modal>
    </>
  );
}

export default Modals;
