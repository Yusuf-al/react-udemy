import { Link, useNavigate } from "react-router-dom";

function LinkButton({ children, to }) {
  const navigate = useNavigate();

  if (to === "-1") {
    return <button onClick={() => navigate(-1)}>{children}</button>;
  }
  return (
    <Link
      to={to}
      className="m-2 me-2 inline-flex items-center px-2  py-1 text-center text-xs font-medium text-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
    >
      {children}
    </Link>
  );
}

export default LinkButton;
