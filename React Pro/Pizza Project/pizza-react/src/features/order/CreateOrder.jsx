import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { clearcart, getCart } from "../cart/cartSlice";
import LinkButton from "../../ui/LinkButton";
import store from "./../../Store";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

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

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const userName = useSelector((state) => state.user.username);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formError = useActionData();
  const cart = useSelector(getCart);

  if (cart.length === 0)
    return (
      <>
        <LinkButton to="/menu">&larr; Back to Menu</LinkButton>
        <p className="rounded-full bg-slate-300 px-4 py-2 text-center text-lg">
          No items are addded to cart yet, Go to menu and add items
        </p>
      </>
    );

  return (
    <div className="px-4 sm:px-2">
      <h2 className="py-3 text-center text-xl">Ready to order? Lets go!</h2>

      <Form method="POST">
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={userName}
            className="input my-4"
            required
          />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" className="input" name="phone" required />
          </div>
          {formError?.phone && (
            <p className=" my-3 rounded-md bg-red-100  p-2 text-sm text-red-700">
              {formError?.phone}
            </p>
          )}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" className="input my-4" name="address" required />
          </div>
        </div>

        <div className="flex items-center">
          <input
            className="mx-4 my-2 h-6 w-6 px-4 py-2 accent-cyan-300 focus:outline-none focus:ring focus:ring-cyan-300 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}></input>
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? "Placing Order" : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const orderData = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const errors = {};

  if (!isValidPhone(orderData.phone)) {
    errors.phone = "Please add a valid Phone number";
  }

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(orderData);
  store.dispatch(clearcart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
