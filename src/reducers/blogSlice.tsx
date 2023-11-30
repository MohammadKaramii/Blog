import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  updateBlog,
} from "../services/blogsServices";


import { Blog, Blogs } from "../types";

const initialState: Blog["blogs"] = {
  blogs: [],
  status: "idle",
  error: null,
};

export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async () => {
    const response = await getAllBlogs();
    return response.data;
  }
) 

export const updateApiBlog = createAsyncThunk(
  "/blogs/updateApiBlog",
  async (initialBlog: Blogs["blog"]) => {
    const response = await updateBlog(initialBlog, initialBlog.id);
    return response.data;
  }
);

export const deleteApiBlog = createAsyncThunk(
  "/blogs/deleteApiBlog",
  async (initialBlogId: string) => {
    await deleteBlog(initialBlogId);
    return initialBlogId;
  }
);

export const addNewBlog = createAsyncThunk(
  "/blogs/addNewBlog",
  async (initialBlog: Blogs["blog"]) => {
    const response = await createBlog(initialBlog);
    return response.data;
  }
)

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
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
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
        existingBlog.reactions[
          reaction as keyof typeof existingBlog.reactions
        ]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state, _action) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "completed";
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
      })
      .addCase(deleteApiBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
      })
      .addCase(updateApiBlog.fulfilled, (state, action) => {
        const { id } = action.payload;
        const updatedBlogIndex = state.blogs.findIndex(
          (blog) => blog.id === id
        );
        state.blogs[updatedBlogIndex] = action.payload;
      });
  },
});

export const selectAllBlogs = (state: Blog) => state.blogs.blogs;

export const selectBlogById = (state: Blog, blogId: string) =>
  state.blogs.blogs.find((blog) => blog.id === blogId);

export const { blogAdded, blogUpdated, blogDeleted, reactionAdded } =
  blogsSlice.actions;

export default blogsSlice.reducer;
