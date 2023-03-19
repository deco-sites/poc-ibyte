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
  auto?: boolean;
}

function Alert({ alerts = [], interval = 5, auto }: Props) {
  const id = useId();

  const alertsEl = alerts.map(({ text, icon }) => (
    <Text
      class="flex justify-center gap-2 text-default items-center w-screen h-[38px] md:h-auto md:text-base md:max-w-[12rem]"
      variant="caption"
      tone="default"
    >
      <Icon
        id={icon}
        strokeWidth={1.5}
        class="text-[#e1110f] w-[27px] h-[27px] md:min-w-[45px] md:h-[45px] flex-grow-1"
      />
      {text}
    </Text>
  ));

  return (
    <div id={id} class="py-6">
      <div class="hidden md:flex justify-center bg-alert gap-6 scrollbar-none py-2">
        {alertsEl}
      </div>

      <Slider class="md:hidden bg-alert gap-6 scrollbar-none py-2">
        {alertsEl}
      </Slider>

      <SliderControllerJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;
