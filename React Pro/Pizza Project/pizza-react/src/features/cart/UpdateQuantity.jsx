import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseQuantity, increaseQuantity } from "./cartSlice";

function UpdateQuantity({ pizzaId, curQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className="space-x-2">
      <Button
        type="rounded"
        onClick={() => dispatch(decreaseQuantity(pizzaId))}
      >
        -
      </Button>
      <span className="gap-2">{curQuantity}</span>
      <Button
        type="rounded"
        onClick={() => dispatch(increaseQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateQuantity;
