import type { JSX } from "preact";

type Props = JSX.IntrinsicElements["div"];

function Container({ class: _class = "", ...props }: Props) {
  return <div class={`max-w-[1280px] mx-auto bg-transparent ${_class}`} {...props} />;
}

export default Container;
