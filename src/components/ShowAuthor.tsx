import { useSelector } from "react-redux";

interface User {
    users: {
        id: number;
        fullname: string;
    }[]
}

const ShowAuthor = ({ userId } : {userId : number}) => {
    const author = useSelector((state: User) =>
        state.users.find((user) => user.id === userId)
    );

    return <span>توسط {author ? author.fullname : "نویسنده ناشناس"}</span>;
};

export default ShowAuthor;

