import type { LoaderReturnType } from "$live/types.ts";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
// import Searchbar from "$store/components/search/Searchbar.tsx";
import Modals from "$store/islands/HeaderModals.tsx";
import HeaderSearchMenu from "$store/islands/HeaderSearchMenu.tsx";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import type { Image } from "deco-sites/std/components/types.ts";
import type { ClientConfigVTEX } from "deco-sites/std/functions/vtexConfig.ts";
import Navbar from "./Navbar.tsx";

export interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
  image?: {
    src?: Image;
    alt?: string;
  };
}

export interface Props {
  /** @title Search Bar */
  searchbar?: SearchbarProps;
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];

  /**
   * @title Product suggestions
   * @description Product suggestions displayed on search
   */
  products?: LoaderReturnType<Product[] | null>;

  /**
   * @title Enable Top Search terms
   */
  suggestions?: LoaderReturnType<Suggestion | null>;

  /**
   * @description vtex config used for search autocompletion;
   */
  configVTEX?: LoaderReturnType<ClientConfigVTEX>;
}

function Header(
  {
    searchbar: _searchbar,
    products,
    navItems = [],
    suggestions,
    configVTEX,
  }: Props,
) {
  const searchbar = { ..._searchbar, products, suggestions, configVTEX };
  return (
    <>
      <div class="h-[96px] md:h-[143px]" />
      <header class={"bg-header fixed w-full z-50 shadow top-0 left-0"}>
        <Navbar items={navItems} searchbar={searchbar} />
        <div class="md:hidden">
          <HeaderSearchMenu searchbar={searchbar} />
        </div>
        <Modals
          menu={{ items: navItems }}
          searchbar={searchbar}
        />
      </header>
    </>
  );
}

export default Header;
