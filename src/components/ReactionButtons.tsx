import { useDispatch } from "react-redux";
import { reactionAdded } from "../reducers/blogSlice";
import { Blogs } from "../types";
const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

const ReactionButtons = ({ blog }: Blogs) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        onClick={() =>
          dispatch(reactionAdded({ blogId: blog.id, reaction: name }))
        }
        className="muted-button reaction-button"
      >
        {emoji} {blog.reactions[name as keyof typeof blog.reactions]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
