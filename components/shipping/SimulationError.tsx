import { ShippingTypes } from "./ShippingSimulation.tsx";
import Text from "$store/components/ui/Text.tsx";

export interface Props {
  type: ShippingTypes;
}

function SimulationError({ type }: Props) {
  return (
    <div>
      <Text as="p" class="text-center mb-4" variant="heading-2">Oops!</Text>
      <Text as="p" class="text-center px-4" variant="body">
        Infelizmente o produto está indisponível para{" "}
        {type === "pickup" ? "retirada" : "entrega"} em sua região!
      </Text>
    </div>
  );
}

export default SimulationError;
