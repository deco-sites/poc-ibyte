import { ClientConfigVTEX } from "deco-sites/std/functions/vtexConfig.ts";
import { createClient } from "deco-sites/std/commerce/vtex/client.ts";
import type {
  SimulationOrderForm,
  SKU,
} from "deco-sites/std/commerce/vtex/types.ts";
import { signal } from "@preact/signals";

interface UseVTEXShippingProps {
  configVTEX: ClientConfigVTEX;
}

interface ShippingHook {
  loading: boolean;
  simulation: SimulationOrderForm | undefined;
  simulateShipping: (
    items: SKU[],
    postalCode: string,
    country: string,
  ) => Promise<void>;
  clear: () => void;
}

const vtexClient = signal<ReturnType<typeof createClient> | undefined>(
  undefined,
);

const simulation = signal<SimulationOrderForm | undefined>(undefined);
const loading = signal<boolean>(false);
const setSimulation = (newSimulation?: SimulationOrderForm) => {
  simulation.value = newSimulation;
  loading.value = false;
};

const simulateShipping = async (
  items: SKU[],
  postalCode: string,
  country: string,
) => {
  if (!vtexClient.value) return;
  loading.value = true;
  const { simulation } = vtexClient.value;

  const newSimulation = await simulation({
    items,
    postalCode,
    country,
  });

  setSimulation(newSimulation);
};

export default function useShipping(
  { configVTEX }: UseVTEXShippingProps,
): ShippingHook {
  if (configVTEX && !vtexClient.value) {
    // TODO: create a singleton
    vtexClient.value = createClient({
      ...configVTEX,
      baseUrl: window.location?.origin,
    });
  }

  return {
    loading: loading.value,
    simulateShipping,
    simulation: simulation.value,
    clear: () => simulation.value = undefined,
  };
}
