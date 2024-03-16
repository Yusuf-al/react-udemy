import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { clearcart } from "./cartSlice";

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  const userName = useSelector((state) => state.user.username);
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearcart());
  }

  useEffect(
    function () {
      if (userName === "") {
        alert("Add your name first");
        navigate("/");
        return;
      }
    },
    [navigate, userName],
  );

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to Menu</LinkButton>

      <h2 className="mb-3 mt-5 text-lg">Your cart, {userName}</h2>

      {cart.length > 0 ? (
        <>
          <ul className="mt-4 divide-y divide-slate-300 border-b">
            {cart.map((item) => (
              <CartItem item={item} key={item.pizzaId}></CartItem>
            ))}
          </ul>
          <div className="mt-6 space-x-2">
            <Button to="/order/new" type="primary">
              Order pizzas
            </Button>
            <Button type="secondary" onClick={handleClearCart}>
              Clear cart
            </Button>
          </div>
        </>
      ) : (
        <p className="rounded-full bg-slate-300 px-4 py-2 text-center text-lg">
          No items are addded to cart yet, Go to menu and add items
        </p>
      )}
    </div>
  );
}

export default Cart;
