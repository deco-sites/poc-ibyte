import Text from "$store/components/ui/Text.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useCart } from "deco-sites/std/commerce/vtex/hooks/useCart.ts";
import {
  SimulationOrderForm,
  Sla,
} from "deco-sites/std/commerce/vtex/types.ts";
import SimulationError from "./SimulationError.tsx";

export interface Props {
  simulation: SimulationOrderForm;
}

function DeliverySimulation({ simulation }: Props) {
  const { cart } = useCart();
  const locale = cart.value?.clientPreferencesData.locale;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;

  if (!simulation.logisticsInfo?.length) {
    return <SimulationError type="delivery" />;
  }

  const handleShippingTime = (estimate: string) => {
    const [, time, type] = estimate.split(/(\d+)/);

    if (type === "bd") return `${time} dias úteis`;
    if (type === "d") return `${time} dias`;
    if (type === "h") return `${time} horas`;
  };

  const methods = simulation.logisticsInfo.reduce<Sla[]>(
    (initial, logistic) => {
      return [...initial, ...logistic.slas];
    },
    [],
  );

  if (!methods?.length) {
    return <SimulationError type="delivery" />;
  }

  return (
    <ul>
      {methods.map((method) => (
        <li class="grid grid-cols-[1fr_1fr_1fr] grid-row-[1fr] items-center border-[#e4e4e4] not-first-child:border-t-1 py-2">
          <Text variant="body" class="text-button">
            receba em até{" "}
            <span class="font-semibold">
              {handleShippingTime(method.shippingEstimate)}*
            </span>
          </Text>
          <Text variant="body" class="text-button text-center">
            {method.name}
          </Text>
          <Text variant="body" class="text-base font-semibold text-right">
            {method.price === 0 ? "Grátis" : (
              formatPrice(method.price / 100, currencyCode!, locale)
            )}
          </Text>
        </li>
      ))}
    </ul>
  );
}

export default DeliverySimulation;
