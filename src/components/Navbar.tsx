import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <section>
                <h1>وبلاگ من</h1>

                <div className="navContent">
                    <div className="navLinks">
                        <Link to={"/"}>خانه</Link>
                        <Link to={"/users"}>نویسندگان</Link>
                    </div>
                </div>
            </section>
        </nav>
    );
};

export default Navbar;
