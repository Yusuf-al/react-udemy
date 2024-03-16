import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalId: "",
  createAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCus: {
      prepare(fullName, nationalId) {
        return {
          payload: {
            fullName,
            nationalId,
            createAt: new Date().toLocaleDateString(),
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalId = action.payload.nationalId;
        state.createAt = action.payload.createAt;
      },
    },
    updateCus(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCus, updateCus } = customerSlice.actions;

export default customerSlice.reducer;

// export default function cusReducer(state = cusInitialState, action) {
//   switch (action.type) {
//     case "cus/createCus":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalId: action.payload.nationalId,
//         createAt: action.payload.createAt,
//       };
//     case "cus/updateCus":
//       return {
//         ...state,
//         fullName: action.payload,
//       };
//     default:
//       return state;
//   }
// }

// export function createCus(fullName, nationalId) {
//   return {
//     type: "cus/createCus",
//     payload: {
//       fullName,
//       nationalId,
//       createAt: new Date().toLocaleDateString(),
//     },
//   };
// }

// export function updateCus(fullName) {
//   return {
//     type: "cus/updateCus",
//     payload: fullName,
//   };
// }
