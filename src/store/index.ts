import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk';
import blogsReducer from "../reducers/blogSlice";
import usersReducer, { fetchUsers } from "../reducers/userSlice";
import * as reduxThunk from "redux-thunk/extend-redux.d";
export const store = configureStore({
    reducer: {
        blogs: blogsReducer,
        users: usersReducer,
    },
    middleware: [thunkMiddleware],
});

//Fetch all users from api
store.dispatch(fetchUsers());

console.log(reduxThunk);