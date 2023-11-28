import { createSlice} from "@reduxjs/toolkit";

const initialState = [
    {
        id: "1",
        fullname: "محمد کرمی",
    },
    {
        id: "2",
        fullname: "آرش پاکزاد",
    },
    {
        id: "3",
        fullname: "مهدی ایوبی",
    },
];

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
});

export default usersSlice.reducer;
