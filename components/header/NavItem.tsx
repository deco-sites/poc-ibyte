import Text from "$store/components/ui/Text.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";

export interface INavItem {
  label: string;
  href: string;
  children?: INavItem[];
  image?: { src?: string; alt?: string };
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, children, image } = item;

  return (
    <li class="group flex flex-nowrap relative">
      <a href={href} class="px-4 py-3">
        <p class="group-hover:border-black no-underline text-white text-button">
          {label}
        </p>
      </a>

      {children && children.length > 0 &&
        (
          <div class="absolute invisible top-full left-0 hover:visible group-hover:visible bg-white z-50 gap-6 w-72">
            <ul class="flex items-start flex-col">
              {children.map((node) => (
                <li class="group-scope w-full">
                  <a
                    class="group-scope-hover:bg-gray-50 flex w-full justify-between px-4 py-3 transition-colors"
                    href={node.href}
                  >
                    <Text variant="menu">{node.label}</Text>
                    <Icon
                      id={"ChevronRight"}
                      width={22}
                      height={22}
                      strokeWidth={1.5}
                    />
                  </a>

                  <ul class="invisible group-scope-hover:visible absolute flex flex-col top-0 left-72 bg-gray-200 w-72 px-4">
                    {node.children?.map((leaf) => (
                      <li>
                        <a class="block py-3" href={leaf.href}>
                          <Text variant="menu">{node.label}</Text>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
