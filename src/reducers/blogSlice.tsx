import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns-jalali";
interface Blogs {
    blogs:{
        blogs: {
            id: string,
            title: string,
            content: string,
            date: string,
            user: number
        }[];

    }
}



const initialState = {
    blogs: [
        {
            id: nanoid(),
            title: "اولین پست",
            content: "اولین پست",
            date: sub(new Date(), { days: 2, minutes: 10 }).toISOString(),
            user: "1",
            reactions: {
                thumbsUp: 0,
                hooray: 0,
                heart: 0,
                rocket: 0,
                eyes: 0,
            },
        },
        {
            id: nanoid(),
            title: "دومین پست",
            content:"دومین پست",
            date: sub(new Date(), { minutes: 5 }).toISOString(),
            user: "3",
            reactions: {
                thumbsUp: 0,
                hooray: 0,
                heart: 0,
                rocket: 0,
                eyes: 0,
            },
        },
    ],
};

const blogsSlice = createSlice({
    name: "blogs",
    initialState: initialState,
    reducers: {
        blogAdded: {
            reducer(state, action) {
                state.blogs.push(action.payload);
            },
            prepare(title, content, userId) {
                //Complex logic
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId,
                    },
                    meta: null,
                    error: null,
                };
            },
        },
        blogUpdated: (state, action) => {
            const { id, title, content } = action.payload;
            const existingBlog = state.blogs.find((blog) => blog.id === id);

            if (existingBlog) {
                existingBlog.title = title;
                existingBlog.content = content;
            }
        },
        blogDeleted: (state, action) => {
            const { id } = action.payload;
            state.blogs = state.blogs.filter((blog) => blog.id !== id);
        },
        reactionAdded: (state, action) => {
            const { blogId, reaction } = action.payload;
            const existingBlog = state.blogs.find((blog) => blog.id === blogId);

            if (existingBlog) {
                existingBlog.reactions[reaction as keyof typeof existingBlog.reactions]++;
            }
        },
    },
});

export const selectAllBlogs = (state: Blogs ) => state.blogs.blogs;

export const selectBlogById = (state: Blogs, blogId: string) =>
    state.blogs.blogs.find((blog) => blog.id === blogId);

export const { blogAdded, blogUpdated, blogDeleted, reactionAdded } = blogsSlice.actions;

export default blogsSlice.reducer;
