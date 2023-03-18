import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useCart } from "deco-sites/std/commerce/vtex/hooks/useCart.ts";

function SearchButton() {
  const { displaySearchbar } = useUI();

  return (
    <Button
      variant="icon"
      aria-label="search icon button"
      onClick={() => {
        displaySearchbar.value = !displaySearchbar.peek();
      }}
    >
      <Icon id="MagnifyingGlass" width={20} height={20} strokeWidth={0.1} />
    </Button>
  );
}

function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <Button
      variant="icon"
      aria-label="open menu"
      class="text-white"
      onClick={() => {
        displayMenu.value = true;
      }}
    >
      <Icon id="Bars3" width={32} height={32} strokeWidth={0.01} />
    </Button>
  );
}

function WishlistButton() {
  const { displayWishlist } = useUI();

  return (
    <Button
      variant="icon"
      aria-label="open menu"
      class="text-white"
      onClick={() => {
        displayWishlist.value = true;
      }}
    >
      <Icon id="Heart" width={32} height={32} strokeWidth={1.5} />
    </Button>
  );
}

function CartButton() {
  const { displayCart } = useUI();
  const { loading, cart } = useCart();
  const totalItems = cart.value?.items.length || null;

  return (
    <Button
      variant="primary"
      class="relative text-white bg-header hover:text-white"
      aria-label="open cart"
      disabled={loading.value}
      onClick={() => {
        displayCart.value = true;
      }}
    >
      <Icon id="ShoppingCart" width={28} height={32} />
      <span class="absolute text-[12px] right-0 top-0 rounded-full bg-badge text-white w-4 h-4 flex items-center justify-center">
        {totalItems ?? 0}
      </span>
    </Button>
  );
}

function HeaderButton(
  { variant }: { variant: "cart" | "search" | "menu" | "wishlist" },
) {
  if (variant === "wishlist") {
    return <WishlistButton />;
  }

  if (variant === "cart") {
    return <CartButton />;
  }

  if (variant === "search") {
    return <SearchButton />;
  }

  if (variant === "menu") {
    return <MenuButton />;
  }

  return null;
}

export default HeaderButton;
