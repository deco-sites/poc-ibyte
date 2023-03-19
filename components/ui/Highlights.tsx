import Image from "deco-sites/std/components/Image.tsx";
import Container from "$store/components/ui/Container.tsx";
import Text from "$store/components/ui/Text.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import SectionTitle from "$store/components/ui/SectionTitle.tsx";

export interface Highlight {
  src: LiveImage;
  alt: string;
  href: string;
  label?: string;
}

export interface Props {
  highlights?: Highlight[];
  title: string;
}

function Highlights({ highlights = [], title }: Props) {
  return (
    <Container class="grid grid-cols-1 grid-rows-[48px_1fr] py-10">
      <SectionTitle title={title} />

      <Slider
        class="gap-6"
        snap="snap-center sm:snap-start block first:ml-6 sm:first:ml-0 last:mr-6 sm:last:mr-0"
      >
        {highlights.map(({ href, src, alt, label }) => (
          <a
            href={href}
            class="flex flex-col gap-4 items-center min-w-[190px]"
          >
            <Image
              class="rounded"
              src={src}
              alt={alt}
              width={180}
              height={206}
            />
            {label ? <Text variant="body">{label}</Text> : null}
          </a>
        ))}
      </Slider>
    </Container>
  );
}

export default Highlights;
