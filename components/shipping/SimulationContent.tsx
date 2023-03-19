import Text from "$store/components/ui/Text.tsx";
import { SimulationOrderForm } from "deco-sites/std/commerce/vtex/types.ts";
import DeliverySimulation from "./DeliverySimulation.tsx";
import { ShippingTypes } from "./ShippingSimulation.tsx";
import SimulationError from "./SimulationError.tsx";

export interface Props {
  simulation?: SimulationOrderForm;
  simulationType: ShippingTypes;
}

function SimulationContent({ simulation, simulationType }: Props) {
  if (!simulation) {
    return (
      <div className="mt-2">
        <Text tone="subdued">
          Informe seu CEP para consultar as opções de envio e retirada.
        </Text>
      </div>
    );
  }

  if (simulationType === "delivery") {
    return <DeliverySimulation simulation={simulation} />;
  }

  return <SimulationError type="pickup" />;
}

export default SimulationContent;
