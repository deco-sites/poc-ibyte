import { useSignal } from "@preact/signals";
import type { ImageObject } from "deco-sites/std/commerce/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import Button from "$store/components/ui/Button.tsx";

interface Props {
  images: ImageObject[];
}

const ImageGallery = ({ images }: Props) => {
  const selectedImg = useSignal(images[0]);

  const handleChangeImg = (img: ImageObject) => {
    selectedImg.value = img;
  };

  return (
    <div class="">
      <Image
        style={{ width: "100%", height: "auto" }}
        sizes="(max-width: 640px) 100vw, 30vw"
        src={selectedImg.value.url!}
        alt={selectedImg.value.alternateName}
        width={320}
        height={320}
        preload
        loading="eager"
      />
      <Slider class="overflow-auto snap-x snap-mandatory scroll-smooth">
        <div class="relative w-full flex gap-3 first:ml-3 pb-2">
          {images.map((img, index) => (
            <Button
              key={img.url}
              variant="custom"
              class={`w-max border-1 rounded p-1 bg-white ${
                selectedImg.value.url === img.url ? "border-emphasis-light" : ""
              }`}
              onClick={() => handleChangeImg(img)}
              aria-label={`Trocar para a imagem ${index}`}
            >
              <Image
                class="snap-center"
                src={img.url!}
                alt={img.alternateName}
                width={46}
                height={46}
                preload
                loading="lazy"
              />
            </Button>
          ))}
        </div>
      </Slider>
    </div>
  );
};

export default ImageGallery;
