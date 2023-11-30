import { useSelector } from "react-redux";
import { selectUserById } from "../reducers/userSlice";
import { User } from "../types";

const ShowAuthor = ({ userId } : {userId : string}) => {
    const author = useSelector((state: User) => selectUserById(state, userId));
    return <span>توسط {author ? author.fullname : "نویسنده ناشناس"}</span>;
};

export default ShowAuthor;

