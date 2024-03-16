import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "my-2 inline-block text-white rounded-full bg-cyan-500 px-4 py-3 font-semibold uppercase transition-colors hover:bg-cyan-400 focus:outline-none focus:ring-cyan-500 focus:ring-offset-2 disabled:cursor-not-allowed";
  const styles = {
    primary: base + " px-4 py-3 md:px-6 bd:py-4 ",
    small: base + " py-2 md:px-5 md:py-2.5 text-xs ",
    rounded: base + "text-lg px-1.5 py-1 md:px-3 md:py-1.5 ",
    secondary:
      "my-2 inline-block rounded-full hover:bg-gray-200 border-2 border-slate-400 px-4 py-3 font-semibold uppercase transition-colors hover:bg-cyan-400 focus:outline-none focus:ring-cyan-500 focus:ring-offset-2 disabled:cursor-not-allowed",
  };
  if (to) {
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button disabled={disabled} onClick={onClick} className={styles[type]}>
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
