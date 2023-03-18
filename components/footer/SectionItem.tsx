import Icon from "$store/components/ui/Icon.tsx";
import { IconItem, ImageItem, Item, StringItem } from "./Footer.tsx";

export const isIcon = (item: Item): item is IconItem =>
  typeof (item as IconItem)?.icon === "string" &&
  typeof (item as StringItem)?.label === "undefined";

const isImage = (item: Item): item is ImageItem =>
  typeof (item as ImageItem)?.path === "string" &&
  typeof (item as ImageItem)?.alt === "string";

function SectionItem({ item }: { item: Item }) {
  if (isIcon(item)) {
    const IconElement = (
      <Icon
        class="text-gray-600 max-h-[28px] max-w-[28px]"
        id={item.icon}
        width="auto"
        height="auto"
        strokeWidth={1.5}
      />
    );

    return (
      item.href
        ? (
          <a href={item.href}>
            {IconElement}
          </a>
        )
        : (
          IconElement
        )
    );
  }

  if (isImage(item)) {
    const ImageElement = (
      <img
        src={item.path}
        alt={item.alt}
        class={`w-${item.width} h-${item.height} block`}
      />
    );

    return item.href ? <a href={item.href}>{ImageElement}</a> : (
      <div>
        {ImageElement}
      </div>
    );
  }

  return (
    <p class="text-sm text-gray-600 mb-2">
      <a
        class={`flex gap-2 ${
          item.iconPosition === "right" ? "flex-row-reverse" : ""
        }`}
        href={item.href}
      >
        {item.icon
          ? (
            <Icon
              id={item.icon}
              width={25}
              height={20}
              strokeWidth={0.01}
            />
          )
          : null}
        {item.label}
      </a>
    </p>
  );
}

export default SectionItem;
