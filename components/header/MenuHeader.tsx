import Icon from "$store/components/ui/Icon.tsx";

const MenuHeader = () => {
  return (
    <header class="px-4 bg-header">
      <a
        href="/account"
        class="flex items-center py-3 gap-3 text-white justify-between"
      >
        <Icon id="User" width={30} height={30} />
        <div class="flex-1">
          <p class="text-sm">Bem-vindo(a) à ibyte!</p>
          <p class="text-xs">Minha Conta</p>
        </div>
        <Icon id="ChevronRight" width={18} height={18} strokeWidth={1.5} />
      </a>
      <a
        class="flex items-center gap-3 py-3 text-white"
        href="/account/#/orders"
      >
        <Icon id="Box" width={18} height={18} />
        <span>Meus Pedidos</span>
      </a>
    </header>
  );
};

export default MenuHeader;
