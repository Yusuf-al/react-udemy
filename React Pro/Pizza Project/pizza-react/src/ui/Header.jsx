import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import User from "../features/user/User";

function Header() {
  return (
    <header className="font-pizza flex items-center justify-between border-b border-slate-400 bg-sky-500 px-4 py-3 text-xl font-semibold uppercase text-slate-100">
      <Link to={"/"} className="tracking-[5px]">
        React Pizza
      </Link>
      <SearchOrder />
      <User />
    </header>
  );
}

export default Header;
