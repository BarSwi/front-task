import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FiltersState } from "../types/filters";

const initialState: FiltersState = {
  name: "",
  username: "",
  email: "",
  phone: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{ field: keyof FiltersState; value: string }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    clearFilter: (state, action: PayloadAction<keyof FiltersState>) => {
      state[action.payload] = "";
    },
  },
});

export const { setFilter, clearFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
