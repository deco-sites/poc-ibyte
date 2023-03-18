import { ComponentType, JSX } from "preact";
import { forwardRef } from "preact/compat";

type Props = JSX.HTMLAttributes & {
  as?: "span" | "p" | ComponentType;
  tone?:
    | "default"
    | "default-inverse"
    | "subdued"
    | "subdued-inverse"
    | "price"
    | "section-title"
    | "positive"
    | "critical";
  variant?:
    | "heading-1"
    | "heading-2"
    | "heading-3"
    | "menu"
    | "button"
    | "body"
    | "caption"
    | "list-price";
  class?: string;
};

const Text = forwardRef<HTMLSpanElement, Props>((
  {
    as = "span",
    tone = "default",
    variant = "body",
    class: _class = "",
    ...props
  },
  ref,
) => {
  const Component = as as ComponentType<
    { className: string }
  >;
  return (
    <Component
      {...props}
      className={`font-${variant} text-${variant} text-${tone} ${_class}`}
      ref={ref}
    />
  );
});

export default Text;
