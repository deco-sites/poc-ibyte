import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Text from "$store/components/ui/Text.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useCart } from "deco-sites/std/commerce/vtex/hooks/useCart.ts";
import type { CartInstallment } from "deco-sites/std/commerce/vtex/types.ts";
import { useUI } from "../../sdk/useUI.ts";
import CartItem from "./CartItem.tsx";

const CHECKOUT_URL = "https://lojaibyte.vtexcommercestable.com.br/checkout";

function Cart() {
  const { displayCart } = useUI();
  const { cart, loading } = useCart();
  const isCartEmpty = cart.value?.items.length === 0;
  const total = cart.value?.totalizers.find((item) => item.id === "Items");
  const subtotal = cart.value?.items.reduce(
    (acc, item) => item.listPrice + acc,
    0,
  );
  const discounts = cart.value?.totalizers.find((item) =>
    item.id === "Discounts"
  );
  const locale = cart.value?.clientPreferencesData.locale;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;

  const biggerInstallment = cart.value?.paymentData
    .installmentOptions?.reduce<CartInstallment>(
      (aux, option) => {
        return aux?.count > option.installments?.length
          ? aux
          : option.installments[option.installments.length - 1];
      },
      {} as CartInstallment,
    );

  if (cart.value === null) {
    return null;
  }

  // Empty State
  if (isCartEmpty) {
    return (
      <div class="flex flex-col justify-center items-center h-full gap-6">
        <Text variant="heading-2">Sua sacola está vazia</Text>
        <Button
          variant="secondary"
          onClick={() => {
            displayCart.value = false;
          }}
        >
          Escolher produtos
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Cart Items */}
      <ul
        role="list"
        class="mt-6 px-2 flex-grow-1 overflow-y-auto flex flex-col gap-6"
      >
        {cart.value.items.map((_, index) => (
          <li>
            <CartItem index={index} key={index} />
          </li>
        ))}
      </ul>

      {/* Cart Footer */}
      <footer class="px-3 bg-gray-50">
        {/* Subtotal */}
        {discounts?.value && (
          <div class="py-4 flex flex-col gap-4 ">
            <div class="flex justify-between items-center">
              <Text variant="caption">Descontos</Text>
              <Text variant="caption">
                {formatPrice(discounts.value / 100, currencyCode!, locale)}
              </Text>
            </div>
          </div>
        )}
        {/* Subtotal */}
        {subtotal && total?.value !== subtotal && (
          <div class="pt-4">
            <div class="flex justify-between items-center w-full">
              <Text variant="body">Subtotal</Text>
              <Text variant="body">
                {formatPrice(subtotal / 100, currencyCode!, locale)}
              </Text>
            </div>
          </div>
        )}
        {/* Total */}
        {total?.value && (
          <div class="pt-2 flex justify-between items-center gap-2">
            <Text variant="heading-3" class="font-body">Total</Text>
            <div class="w-full text-right">
              <Text
                as="p"
                variant="heading-3"
                class="font-body"
                tone="emphasis"
              >
                {formatPrice(total.value / 100, currencyCode!, locale)}{" "}
                <small class="text-gray-700">à vista</small>
              </Text>
              {biggerInstallment && biggerInstallment?.count > 1
                ? (
                  <Text as="p" variant="body" class="mt-1">
                    ou {biggerInstallment?.count}x de{" "}
                    <span class="font-heading-3">
                      {formatPrice(
                        biggerInstallment.value / 100,
                        currencyCode!,
                        locale,
                      )}
                    </span>
                  </Text>
                )
                : null}
            </div>
          </div>
        )}
        <div class="mt-4 pb-4">
          <a
            class="block w-full"
            target="_blank"
            href={`${CHECKOUT_URL}?orderFormId=${cart.value!.orderFormId}`}
          >
            <Button
              class="py-3 w-full cursor-pointer rounded font-body bg-interactive py-3 text-center text-lg text-white transition hover:shadow"
              disabled={loading.value || cart.value.items.length === 0}
            >
              <Icon width={20} height={20} id="ShoppingCart" />
              Finalizar Compra
            </Button>
          </a>
        </div>
      </footer>
    </>
  );
}

export default Cart;
