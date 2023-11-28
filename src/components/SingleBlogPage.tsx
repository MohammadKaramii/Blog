import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { blogDeleted, selectBlogById } from "../reducers/blogSlice";
import ShowTime from "./ShowTime";
import ShowAuthor from "./ShowAuthor";
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
  
  
  const SingleBlogPage = () => {
      const { blogId } = useParams();
      const blog = useSelector((state: Blogs) => selectBlogById(state, blogId!));
      const navigate = useNavigate();
      const dispatch = useDispatch();
      


    if (!blog) {
        return (
            <section>
                <h2>پست مورد نظر شما یافت نشد</h2>
            </section>
        );
    }

    const handleDelete = () => {
        if (blog) {
            dispatch(blogDeleted({ id: blog.id }));
            navigate("/");
        }
    };

    return (
        <section>
            <article className="blog">
                <h2>{blog.title}</h2>

                <div style={{ marginTop: "10px", marginRight: "20px" }}>
                    <ShowTime timestamp={blog.date} />
                    <ShowAuthor userId={blog.user} />
                </div>

                <p className="blog-content">{blog.content}</p>

                <Link to={`/editBlog/${blog.id}`} className="button">
                    ویرایش پست
                </Link>
                <button
                    className="muted-button"
                    style={{ marginRight: "10px" }}
                    onClick={handleDelete}
                >
                    حذف پست
                </button>
            </article>
        </section>
    );
};

export default SingleBlogPage;
