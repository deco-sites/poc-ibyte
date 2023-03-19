import { lazy, Suspense } from "preact/compat";

import { IS_BROWSER } from "$fresh/runtime.ts";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Loading from "$store/components/ui/Loading.tsx";

const Searchbar = lazy(() => import("$store/components/search/Searchbar.tsx"));

interface Props {
  searchbar: SearchbarProps;
  type?: "desktop" | "mobile"
}

export default function HeaderSearchMenu({ searchbar, type = "mobile" }: Props) {
  return (
    <div
      class={"block left-0 w-screen z-50"}
    >
      {IS_BROWSER && (
        <Suspense fallback={<Loading />}>
          <Searchbar {...searchbar} variant={type} />
        </Suspense>
      )}
    </div>
  );
}
