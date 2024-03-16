import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const userName = useSelector((state) => state.user.username);

  return (
    <div className=" my-8 px-4 text-center sm:my-16">
      <h1 className="mb-4 text-xl font-semibold uppercase text-cyan-600 md:text-3xl">
        The best pizza.
        <br />
        <span className="font-pizza text-cyan-800">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {userName === "" ? (
        <CreateUser />
      ) : (
        <Button to={"/menu"} type="primary">
          Go to Menu
        </Button>
      )}
    </div>
  );
}

export default Home;
