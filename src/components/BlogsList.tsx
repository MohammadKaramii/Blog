import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchBlogs, selectAllBlogs } from "../reducers/blogSlice";
import ShowTime from "./ShowTime";
import ShowAuthor from "./ShowAuthor";
import ReactionButtons from "./ReactionButtons";
import Spinner from "./Spinner";
import { Blog } from "../types";


const Blogs = ({ blogs }: Blog["blogs"]) => {
  const orderedBlogs = blogs
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));

  return (
      <>
          {orderedBlogs.map((blog) => (
              <article key={blog.id} className="blog-excerpt">
                  <h3>{blog.title}</h3>

                  <div style={{ marginTop: "10px", marginRight: "20px" }}>
                      <ShowTime timestamp={blog.date} />
                      <ShowAuthor userId={blog.user} />
                  </div>

                  <p className="blog-content">
                      {blog.content.substring(0, 100)}
                  </p>

                  <ReactionButtons blog={blog} />

                  <Link
                      to={`/blogs/${blog.id}`}
                      className="button muted-button"
                  >
                      دیدن کامل پست
                  </Link>
              </article>
          ))}
      </>
  );
};


const BlogsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogs = useSelector(selectAllBlogs);
  const blogStatus = useSelector((state: Blog) => state.blogs.status);
  const error = useSelector((state: Blog) => state.error);

  useEffect(() => {
    console.log(blogStatus);
    if (blogStatus === "idle") {
      dispatch(fetchBlogs());
    }
  }, [blogStatus, dispatch]);

  let content;
  if (blogStatus === "loading") {
    content = <Spinner text="بارگذاری ..." />;
} else if (blogStatus === "completed") {
    content = <Blogs blogs={blogs} />;
} else if (blogStatus === "failed") {
    content = <div>{error}</div>;
}

return (
    <section className="blog-list">
        <button
            className="full-button accent-button"
            style={{
                marginTop: "1em",
            }}
            onClick={() => navigate("/blogs/create-blog")}
        >
            ساخت پست جدید
        </button>
        <h2>تمامی پست ها</h2>
        {content}
    </section>
);
};

export default BlogsList;