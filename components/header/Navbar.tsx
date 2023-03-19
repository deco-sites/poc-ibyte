import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import HeaderButton from "$store/islands/HeaderButton.tsx";

import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import HeaderSearchMenu from "$store/islands/HeaderSearchMenu.tsx";
import type { INavItem } from "./NavItem.tsx";
import NavItem from "./NavItem.tsx";

function Navbar({ items, searchbar }: {
  items: INavItem[];
  searchbar: SearchbarProps;
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        class={`md:hidden flex flex-row justify-between items-center w-full px-2 gap-2 text-white py-[0.2rem]`}
      >
        <HeaderButton variant="menu" />
        <a
          href="/"
          class="flex-grow inline-flex items-center"
          aria-label="Store logo"
        >
          <Icon id="Logo" width={64} height={45} />
        </a>

        <div class="flex gap-1">
          <a
            href="https://bit.ly/faleconsultor-ibyte"
            class="flex items-center px-2"
            aria-label="WhatsApp"
          >
            <Icon id="WhatsApp" width={28} height={28} />
          </a>
          <HeaderButton variant="wishlist" />
          <HeaderButton variant="cart" />
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:block border-b-1 border-default w-full px-6">
        <div class="flex justify-between">
          <ul class="flex items-center gap-4">
            <li>
              <a
                class="text-white text-xs flex items-center gap-1 py-2"
                href="https://www.ibyte.com.br/nossas-lojas"
              >
                <Icon id="MapPin" width={14} height={14} strokeWidth={1.5} />
                <span>Nossas Lojas</span>
              </a>
            </li>
            <li>
              <a
                class="text-white text-xs flex items-center gap-1 py-2"
                href="tel:8540205000"
              >
                <span>Atendimento:</span>
                <Icon id="Phone" width={14} height={14} strokeWidth={1.5} />
                <span>(85) 4020-5000</span>
              </a>
            </li>
          </ul>
          <ul class="flex items-center gap-6">
            <li>
              <a
                class="text-white text-xs flex items-center gap-1 py-2"
                href="https://bit.ly/faleconsultor-ibyte"
                aria-label="WhatsApp"
              >
                <Icon id="WhatsApp" width={14} height={14} />
                <span>Compre pelo Whatsapp</span>
              </a>
            </li>
            <li>
              <a
                class="text-white text-xs flex items-center gap-1 py-2"
                href="/account/#/orders"
              >
                <Icon id="Box" width={14} height={14} />
                <span>Meus Pedidos</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="flex flex-row justify-between items-center gap-8 mt-2">
          <a
            href="/"
            class="flex-grow inline-flex items-center text-white"
            aria-label="ibyte home"
          >
            <Icon id="Logo" width={107} height={45} />
          </a>
          <HeaderSearchMenu searchbar={searchbar} type="desktop" />
          <div class="flex items-center justify-end gap-2 flex-grow-1">
            <a
              href="/account"
              class="flex items-center gap-3 text-white justify-between"
            >
              <Icon id="User" width={30} height={30} />
              <div class="text-xs">
                <p class="whitespace-nowrap">
                  Olá, faça o login
                </p>
                <p class="whitespace-nowrap">
                  ou, cadastre-se!
                </p>
              </div>
            </a>
            <HeaderButton variant="wishlist" />
            <HeaderButton variant="cart" />
          </div>
        </div>
        <div class="flex-auto flex items-center mt-2">
          {items.map((item) => <NavItem item={item} />)}
        </div>
      </div>
    </>
  );
}

export default Navbar;
