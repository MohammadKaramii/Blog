import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export interface Blog {
    blogs:{
        id: string;
        title: string;
        content: string;

    }[]
  }

const SingleBlogPage = () => {
    const { blogId } = useParams();

    const blog = useSelector((state: Blog) =>
        state.blogs.find((blog) => blog.id === blogId)
    );

    if (!blog) {
        return (
            <section>
                <h2>پست مورد نظر شما یافت نشد</h2>
            </section>
        );
    }

    return (
        <section>
            <article className="blog">
                <h2>{blog.title}</h2>

                <p className="blog-content">{blog.content}</p>
            </article>
        </section>
    );
};

export default SingleBlogPage;
