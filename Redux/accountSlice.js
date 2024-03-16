import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: 0,
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposite(state, action) {
      state.balance = state.balance + action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      if (action.payload > state.balance) return;
      state.balance = state.balance - action.payload;
    },
    loan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state, action) {
      state.balance = state.balance - action.payload;
      state.loan = 0;
      state.loanPurpose = "";
    },
    loading(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, loan, payLoan } = accountSlice.actions;

export function deposite(amount, currency) {
  if (currency === "USD") return { type: "account/deposite", payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "account/loading" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    console.log(data);
    dispatch({ type: "account/deposite", payload: data.rates.USD });
  };
}

export default accountSlice.reducer;

// console.log(accountSlice);

/*
export default function accReducer(state = accInitialState, action) {
  switch (action.type) {
    case "acc/deposite":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "acc/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "acc/loan":
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case "acc/loanPurpose":
      return {
        ...state,
        loanPurpose: action.payload,
      };
    case "acc/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    case "acc/loading":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

export function deposite(amount, currency) {
  if (currency === "USD") return { type: "acc/deposite", payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "acc/loading" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    console.log(data);
    dispatch({ type: "acc/deposite", payload: data.rates.USD });
  };
}

export function withdraw(amount) {
  return {
    type: "acc/withdraw",
    payload: amount,
  };
}

export function loan(amount, purpose) {
  return {
    type: "acc/loan",
    payload: {
      amount,
      purpose,
    },
  };
}

export function payLoan() {
  return {
    type: "acc/payLoan",
  };
}
*/
