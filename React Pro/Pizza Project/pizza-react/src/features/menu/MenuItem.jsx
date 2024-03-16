import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { addItem, getQuantityById } from "../cart/cartSlice";

import { getUser } from "../user/userSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateQuantity from "../cart/UpdateQuantity";

function MenuItem({ pizza }) {
  const userName = useSelector(getUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currentQuantity = useSelector(getQuantityById(id));
  const isInCart = currentQuantity > 0;
  const quantity = 1;
  function handleAddCart() {
    if (userName === "") {
      navigate("/");
      return;
    }
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity,
      totalPrice: unitPrice * quantity,
    };

    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-60 grayscale" : ""}`}
      />
      <div className="flex grow flex-col">
        <p>{name}</p>
        <p className="text-sm capitalize italic text-gray-400">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="font-semibold uppercase text-red-500">Sold out</p>
          )}
          {isInCart && (
            <div className="flex items-center gap-2 sm:gap-4">
              <UpdateQuantity pizzaId={id} curQuantity={currentQuantity} />
              <DeleteItem pizzaId={id} />
            </div>
          )}
          {!soldOut && !isInCart && (
            <>
              <Button type="small" onClick={handleAddCart}>
                Add to Cart
              </Button>
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
