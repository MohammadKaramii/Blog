import axios from "axios";
import { Blogs } from "../types";
const SERVER_URL = "http://localhost:9000";

// @desc Get All Blogs
// @route GET http://localhost:9000/blogs
export const getAllBlogs = () => {
    const url = `${SERVER_URL}/blogs`;
    return axios.get(url);
};

// @desc Get Contact With Blog ID
// @route GET http://localhost:9000/blogs/:blogId
export const getBlog = (blogId:string) => {
    const url = `${SERVER_URL}/blogs/${blogId}`;
    return axios.get(url);
};

// @desc  Get All Users
// @route GET http://localhost:9000/users
export const getAllUsers = () => {
    const url = `${SERVER_URL}/users`;
    return axios.get(url);
};

// @desc  Get User With User ID
// @route GET http://localhost:9000/users/:userId
export const getUser = (userId:string) => {
    const url = `${SERVER_URL}/users/${userId}`;
    return axios.get(url);
};

// @desc  Create New Blog
// @route POST http://localhost:9000/blogs
export const createBlog = (blog:Blogs["blog"]) => {
    const url = `${SERVER_URL}/blogs`;
    return axios.post(url, blog);
};

// @desc  Update Blog
// @route PUT http://localhost:9000/blogs/:blogId
export const updateBlog = (blog:Blogs["blog"], blogId:string) => {
    const url = `${SERVER_URL}/blogs/${blogId}`;
    return axios.put(url, blog);
};

// @desc  Delete Blog
// @route DELETE http://localhost:9000/blogs/:blogId
export const deleteBlog = (blogId:string) => {
    const url = `${SERVER_URL}/blogs/${blogId}`;
    return axios.delete(url);
};
