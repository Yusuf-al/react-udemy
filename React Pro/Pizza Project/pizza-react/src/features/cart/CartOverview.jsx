import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const userName = useSelector((state) => state.user.username);

  const totalPrice = useSelector(getTotalCartPrice);
  const totalQuantity = useSelector(getTotalCartQuantity);

  return (
    <div className="fixed bottom-0 z-10 flex w-full items-center justify-between bg-sky-700 p-4 text-sm uppercase text-gray-100 sm:px-6 md:text-base">
      <p className="space-x-4">
        <span>{totalQuantity} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>

      <Link
        to={"/cart"}
        aria-disabled
        className={`${userName === "" ? "pointer-events-none " : ""}`}
      >
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
