import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers } from "../services/blogsServices";
import { User } from "../types";
export const fetchUsers = createAsyncThunk("/users/fetchUsers", async () => {
  const response = await getAllUsers();
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (_state, action) => {
      return action.payload;
      //With returing a new result Immer will replace existing state with
      //whatever we return
    });
  },
});

export const selectAllUsers = (state: User) => state.users;
export const selectUserById = (state: User, userId: string) =>
  state.users.find((user) => user.id === userId);

export default usersSlice.reducer;
