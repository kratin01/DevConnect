import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../utlis/contants";
import { removeUser } from "../utlis/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    try {
      await axios.post(baseUrl + "/logout", {}, { withCredentials: true });
      console.log("user Logout successfully");
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log("Error while loggingout: ", err);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm px-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          DevConnect
        </Link>
      </div>

      {!user ? (
        <div>
          <button className="btn btn-primary" onClick={navigateLogin}>
            Login
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <span className="font-medium text-base">
            Welcome, <span className="capitalize">{user.firstName}</span>
          </span>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img alt="user avatar" src={user.profileUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
