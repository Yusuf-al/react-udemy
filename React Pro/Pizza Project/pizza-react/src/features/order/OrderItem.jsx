import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="isolate my-2 aspect-video h-14 w-full  bg-white/20 p-4 shadow-lg ring-1 ring-black/5">
      <div className="flex flex-wrap items-center justify-between">
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
