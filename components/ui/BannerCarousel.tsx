import Button from "$store/components/ui/Button.tsx";
import Container from "$store/components/ui/Container.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import Text from "$store/components/ui/Text.tsx";
import SliderControllerJS from "$store/islands/SliderJS.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { useId } from "preact/hooks";
import { animation, keyframes, tw } from "twind/css";

export interface Banner {
  /** @description desktop otimized image */
  desktop: LiveImage;
  /** @description mobile otimized image */
  mobile: LiveImage;
  /** @description Image's alt text */
  alt: string;
  action?: {
    /** @description when user clicks on the image, go to this link */
    href?: string;
    /** @description Image text title */
    title?: string;
    /** @description Image text subtitle */
    subTitle?: string;
    /** @description Button label */
    label?: string;
  };
}

export interface Props {
  images: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
  /**
   * @title With buttons?
   * @description check this option to show buttons to control the carousel
   */
  buttons: boolean;
  /**
   * @title With dots?
   * @description check this option to show dots below the carousel
   */
  dots: boolean;
}

function BannerItem({ image, lcp }: { image: Banner; lcp?: boolean }) {
  const {
    alt,
    mobile,
    desktop,
    action,
  } = image;

  return (
    <div class="relative h-auto sm:h-[300px] min-w-[100vw] overflow-y-hidden">
      <a href={action?.href ?? "#"} aria-label={action?.label}>
        <Picture class="w-full" preload={lcp}>
          <Source
            media="(max-width: 767px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={mobile}
            width={320}
            height={220}
          />
          <Source
            media="(min-width: 768px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={desktop}
            width={1500}
            height={300}
          />
          <img
            class="object-cover w-full sm:h-full"
            loading={lcp ? "eager" : "lazy"}
            src={desktop}
            alt={alt}
          />
        </Picture>
        {(action?.title && action?.subTitle && action?.label) && (
          <div
            class="absolute top-0 bottom-0 m-auto left-0 right-0 sm:right-auto sm:left-[12%] max-h-min max-w-[235px] flex flex-col gap-4 bg-hover-inverse p-4 rounded"
            style={{ backdropFilter: "blur(8px)" }}
          >
            <Text variant="heading-1" tone="default-inverse">
              {action.title}
            </Text>
            <Text variant="heading-3" tone="default-inverse">
              {action.subTitle}
            </Text>
            <Button variant="secondary">{action.label}</Button>
          </div>
        )}
      </a>
    </div>
  );
}

function Dots({ images, interval = 0 }: Pick<Props, "images" | "interval">) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }`,
        }}
      >
      </style>
      <ol class="flex items-center justify-center col-span-full gap-4 z-10 row-start-6 ">
        {images?.map((_, index) => (
          <li class="h-full">
            <button
              data-dot={index}
              aria-label={`go to slider item ${index}`}
              class="h-full rounded focus:outline-none group"
            >
              <div
                class={tw`group-disabled:${
                  animation(
                    `${interval}s ease-out 1 forwards`,
                    keyframes`
                      from: {
                        --dot-progress: 0%;
                      }
                      to {
                        --dot-progress: 100%;
                      }
                    `,
                  )
                } w-8 sm:w-20 h-1.5 rounded-full`}
                style={{
                  background:
                    "linear-gradient(to right, #c11717 var(--dot-progress), rgba(228,228,228,1) var(--dot-progress))",
                }}
              />
            </button>
          </li>
        ))}
      </ol>
    </>
  );
}

function Controls() {
  return (
    <>
      <div class="flex items-center justify-center z-10 col-start-1 row-start-3">
        <Button
          class="h-12 w-12 bg-white rounded-full border-1 border-gray-300"
          variant="custom"
          data-slide="prev"
          aria-label="Previous item"
        >
          <Icon
            class="text-default-inverse md:text-default"
            size={20}
            id="ChevronLeft"
            strokeWidth={3}
          />
        </Button>
      </div>
      <div class="flex items-center justify-center z-10 col-start-3 row-start-3">
        <Button
          class="h-12 w-12 bg-white rounded-full border-1 border-gray-300"
          variant="custom"
          data-slide="next"
          aria-label="Next item"
        >
          <Icon
            class="text-default-inverse md:text-default"
            size={20}
            id="ChevronRight"
            strokeWidth={3}
          />
        </Button>
      </div>
    </>
  );
}

function BannerCarousel(
  { images, preload, interval, buttons = true, dots = true }: Props,
) {
  const id = useId();
  const customId = `${id}-carousel`;
  return (
    <Container>
      <div
        id={customId}
        class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[48px_1fr_48px_1fr_48px]"
      >
        <Slider class="col-span-full row-span-full scrollbar-none gap-6">
          {images?.map((image, index) => (
            <BannerItem image={image} lcp={index === 0 && preload} />
          ))}
        </Slider>
        {buttons ? <Controls /> : null}
        {dots ? <Dots images={images} interval={interval} /> : null}
        <SliderControllerJS
          rootId={customId}
          interval={interval && interval * 1e3}
        />
      </div>
    </Container>
  );
}

export default BannerCarousel;
