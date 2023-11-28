import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
    {
        id: nanoid(),
        date: new Date().toISOString(),
        title: "اولین پست",
        content: "اولین پست",
    },
    {
        id: nanoid(),
        date: new Date().toISOString(),
        title: "دومین پست",
        content: "دومین پست",
    },
    
];

const blogsSlice = createSlice({
    name: "blogs",
    initialState: initialState,
    reducers: {
        blogAdded: (state, action) => {
            state.push(action.payload);
        },
    },
});

export const { blogAdded } = blogsSlice.actions;

export default blogsSlice.reducer;
