import { useState, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { blogUpdated, selectBlogById } from "../reducers/blogSlice";

interface Blog {
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

const EditBlogForm = () => {
  const { blogId } = useParams();

  const blog = useSelector((state: Blog) => selectBlogById(state, blogId!));

  const [title, setTitle] = useState(blog?.title);
  const [content, setContent] = useState(blog?.content);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const handleSubmitForm = () => {
    if (title && content) {
      dispatch(blogUpdated({ id: blogId, title, content }));
      navigate(`/blogs/${blogId}`);
    }
  };

  if (!blog) {
    return (
      <section>
        <h2>پست مورد نظر شما یافت نشد</h2>
      </section>
    );
  }

  return (
    <section>
      <h2>ویرایش پست</h2>
      <form autoComplete="off">
        <label htmlFor="blogTitle">عنوان پست :</label>
        <input
          type="text"
          id="blogTitle"
          name="blogTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="blogContent">محتوای اصلی :</label>
        <textarea
          id="blogContent"
          name="blogContent"
          value={content}
          onChange={onContentChange}
        />
        <button type="button" onClick={handleSubmitForm}>
          ویرایش پست
        </button>
      </form>
    </section>
  );
};

export default EditBlogForm;
