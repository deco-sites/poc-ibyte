import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Text from "$store/components/ui/Text.tsx";
import { useSignal } from "@preact/signals";
import type { INavItem } from "./NavItem.tsx";

export interface Props {
  items: INavItem[];
}

function MenuItem({ item, level = 1 }: { item: INavItem; level?: number }) {
  const open = useSignal(false);
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  return (
    <li class="border-0">
      <div
        class={`flex justify-between items-center w-full py-1 px-4`}
      >
        <p class="w-full flex justify-between items-center h-[36px]">
          <a
            class={`flex-1 font-light text-base ${
              !hasChildren ? "text-gray-600" : ""
            }`}
            href={item.href}
          >
            {item.label}
          </a>
          {hasChildren && (
            <Button
              class="text-default bg-white"
              variant="icon"
              onClick={() => {
                open.value = !open.value;
              }}
            >
              <Icon
                id={open.value ? "ChevronUp" : "ChevronDown"}
                width={22}
                height={22}
                strokeWidth={1.5}
              />
            </Button>
          )}
        </p>
      </div>

      {hasChildren && (
        <ul
          class={`bg-gray-50 pl-${level + 1} ${
            open.value === true ? "block" : "hidden"
          }`}
        >
          {item.children!.map((node) => (
            <MenuItem
              item={node}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function Menu({ items }: Props) {
  return (
    <>
      <ul class="flex-grow flex flex-col">
        {items.map((item) => <MenuItem item={item} />)}
      </ul>

      <ul class="flex flex-col py-2 bg-gray-50">
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.ibyte.com.br/nossas-lojas"
          >
            <Icon id="MapPin" width={20} height={20} strokeWidth={1.5} />
            <Text variant="menu">Nossas Lojas</Text>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="tel:8540205000"
          >
            <Icon id="Phone" width={20} height={20} strokeWidth={1.5} />
            <Text variant="menu">Central de Atendimento</Text>
          </a>
        </li>
      </ul>
    </>
  );
}

export default Menu;
