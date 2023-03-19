import useShipping from "$store/components/hooks/useShipping.ts";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Loading from "$store/components/ui/Loading.tsx";
import { useSignal } from "@preact/signals";
import { ClientConfigVTEX } from "deco-sites/std/functions/vtexConfig.ts";
import { useEffect } from "preact/compat";
import { useCallback } from "preact/hooks";
import { SKU } from "../../../std/commerce/vtex/types.ts";
import SimulationContent from "./SimulationContent.tsx";

export interface Props {
  configVTEX: ClientConfigVTEX;
  item: SKU;
}

export type ShippingTypes = "delivery" | "pickup";

function ShippingSimulation({ configVTEX, item }: Props) {
  const { simulation, simulateShipping, loading, clear } = useShipping({
    configVTEX,
  });
  const method = useSignal<ShippingTypes>("delivery");
  const postalCode = useSignal("");

  const handleSimulation = useCallback(() => {
    simulateShipping([item], "", "BRA");
  }, []);

  const buttonClasses = (isActive: boolean) => `
     w-[50%] rounded-lg font-light text-sm ${
    isActive
      ? "bg-white border-1 border-emphasis text-emphasis"
      : "bg-transparent border-0 text-[#4b5563]"
  }`;
  const icon = <Icon width={24} height={24} id="MapPin" strokeWidth={1.5} />;

  return (
    <section class="py-4 border-tb-1 border-gray-200">
      <header class="rounded-lg bg-gray-100 gap-2 p-1 justify-between flex mb-1">
        <Button
          variant="custom"
          class={buttonClasses(method.value === "delivery")}
          onClick={() => method.value = "delivery"}
        >
          Receber em Casa
        </Button>
        <Button
          variant="custom"
          class={buttonClasses(method.value === "pickup")}
          onClick={() => method.value = "pickup"}
        >
          Retirar na loja
        </Button>
      </header>
      {simulation
        ? (
          <article class="flex justify-between items-center">
            <p class="flex items-center font-semibold">
              <span class="text-emphasis mr-2">{icon}</span>
              {postalCode.value}
            </p>
            <Button
              variant="custom"
              class="underline border-0"
              onClick={() => {
                clear();
                postalCode.value = "";
              }}
            >
              Trocar CEP
            </Button>
          </article>
        )
        : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSimulation();
            }}
            class="flex items-center border-1 border-gray-200 pl-3 rounded
            focus-within:shadow"
          >
            {icon}
            <input
              placeholder="Informe seu CEP"
              class="flex-1 pr-2 pl-4 focus:outline-none"
              onChange={(e) => postalCode.value = e.currentTarget.value}
              maxLength={8}
              value={postalCode.value}
            />
            <Button
              class="bg-gray-50 hover:bg-gray-100 py-3 px-4 rounded border-0"
              variant="custom"
              loading={loading}
              type="submit"
            >
              OK
            </Button>
          </form>
        )}
      <SimulationContent
        simulation={simulation}
        simulationType={method.value}
      />
    </section>
  );
}

export default ShippingSimulation;
