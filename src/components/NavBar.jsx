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
    <div className="navbar bg-base-100 shadow-lg border-b border-base-content/10 px-4 sm:px-6 lg:px-8">
      <div className="flex-1 w-1 flex items-center gap-3">
  {/* Logo (not clickable) */}
  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-sm">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
      />
    </svg>
  </div>

  {/* Brand Text (clickable link) */}
  <Link
    to="/"
    className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:underline transition-all duration-200"
  >
    DevConnect
  </Link>
</div>


      {!user ? (
        <div className="flex-none">
          <button 
            className="btn btn-primary btn-sm sm:btn-md shadow-lg hover:shadow-xl transition-all duration-200" 
            onClick={navigateLogin}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            <span className="hidden sm:inline">Login</span>
          </button>
        </div>
      ) : (
        <div className="flex-none flex items-center gap-2 sm:gap-3">
          <span className="hidden sm:inline font-medium text-sm lg:text-base text-base-content/80">
            Welcome, <span className="capitalize font-semibold text-base-content">{user.firstName}</span>
          </span>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:scale-105 transition-transform duration-200"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                <img 
                  alt="user avatar" 
                  src={user.profileUrl || `https://ui-avatars.com/api/?name=${user.firstName}&background=random&size=100&bold=true`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-50 mt-3 w-56 p-2 shadow-xl border border-base-content/10"
            >
              <li>
                <Link 
                  to="/profile" 
                  className="justify-between hover:bg-primary/10 rounded-xl transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Profile
                  </div>
                  <span className="badge badge-primary badge-sm">New</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/connections" 
                  className="hover:bg-primary/10 rounded-xl transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Connections
                </Link>
              </li>
              <li>
                <Link 
                  to="/requests" 
                  className="hover:bg-primary/10 rounded-xl transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-5 5v-5zM9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Requests
                </Link>
              </li>
              <div className="divider my-1"></div>
              <li>
                <button 
                  onClick={handleLogout}
                  className="hover:bg-error/10 text-error rounded-xl transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
