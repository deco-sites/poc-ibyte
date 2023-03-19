import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import Text from "$store/components/ui/Text.tsx";
import SliderControllerJS from "$store/islands/SliderJS.tsx";
import { useId } from "preact/hooks";

export type Alert = {
  text: string;
  icon: AvailableIcons;
};

export interface Props {
  alerts: Alert[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  return (
    <div id={id} class="py-6">
      <Slider class="bg-alert gap-6 scrollbar-none py-2">
        {alerts.map(({ text, icon }) => (
          <Text
            class="flex justify-center gap-2 text-default items-center w-screen h-[38px]"
            variant="caption"
            tone="default"
          >
            <Icon
              id={icon}
              width={27}
              height={27}
              strokeWidth={1.5}
              class="text-[#e1110f]"
            />
            {text}
          </Text>
        ))}
      </Slider>

      <SliderControllerJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;
