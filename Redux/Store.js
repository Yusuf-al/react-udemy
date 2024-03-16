// import { applyMiddleware, combineReducers, createStore } from "redux";
import accReducer from "./features/accounts/accountSlice";
import cusReducer from "./features/customers/customerSlice";
// import { thunk } from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";

// const rootReducer = combineReducers({
//   account: accReducer,
//   customer: cusReducer,
// });

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

const store = configureStore({
  reducer: {
    account: accReducer,
    customer: cusReducer,
  },
});

export default store;

// const accInitialState = {
//   balance: 0,
//   loan: 0,
//   loanPurpose: 0,
// };

// function accReducer(state = accInitialState, action) {
//   switch (action.type) {
//     case "acc/deposite":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//       };
//     case "acc/withdraw":
//       return {
//         ...state,
//         balance: state.balance - action.payload,
//       };
//     case "acc/loan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         balance: state.balance + action.payload.amount,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//       };
//     case "acc/loanPurpose":
//       return {
//         ...state,
//         loanPurpose: action.payload,
//       };
//     case "acc/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         balance: state.balance - state.loan,
//       };
//     default:
//       return state;
//   }
// }

// const cusInitialState = {
//   fullName: "",
//   nationalId: "",
//   createAt: "",
// };

// function createCus(fullName, nationalId) {
//   return {
//     type: "cus/createCus",
//     payload: {
//       fullName,
//       nationalId,
//       createAt: new Date().toLocaleDateString(),
//     },
//   };
// }

// function updateCus(fullName) {
//   return {
//     type: "cus/updateCus",
//     payload: fullName,
//   };
// }

// store.dispatch({ type: "acc/deposite", payload: 500 });
// store.dispatch({ type: "acc/withdraw", payload: 200 });
// store.dispatch({
//   type: "acc/loan",
//   payload: {
//     amount: 1000,
//     purpose: "Home Loan",
//   },
// });
