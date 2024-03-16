import { createContext, useContext, useReducer } from "react";

const authContext = createContext();

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
  user: null,
  isAuthenticated: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("Unknow Action tpye");
  }
}
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    } else {
      alert("User Not Found");
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <authContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  const user = useContext(authContext);
  if (user === undefined)
    throw new Error("It seems that context is calling outside the provider");
  return user;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
