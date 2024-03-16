import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import StarRating from "./StarRating";

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <>
//       <StarRating color="red" maxRating={5} onSetRating={setMovieRating} />
//       <p>This movie has {movieRating} star</p>
//     </>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      message={["Tarrible", "Bad", "Okay", "Good", "Amazing"]}
      color="cyan"
    ></StarRating>
    <Test /> */}
  </React.StrictMode>
);
