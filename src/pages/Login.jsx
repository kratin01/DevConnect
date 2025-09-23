import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utlis/userSlice";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utlis/contants";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "/login" : "/signup";
      const body = isLogin
        ? { email, password }
        : { firstName, lastName, email, password };

      const res = await axios.post(baseUrl + endpoint, body, {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
      setTimeout(() => {
        return navigate(isLogin ? "/" : "/profile");
      }, 0);
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="card w-96 bg-base-300 shadow-md">
        <div className="card-body">
          <h2 className="card-title justify-center mb-4">
            {isLogin ? "Login" : "Signup"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            {!isLogin && (
              <>
                {/* First Name */}
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required={!isLogin}
                    className="grow"
                  />
                </label>

                {/* Last Name */}
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required={!isLogin}
                    className="grow"
                  />
                </label>
              </>
            )}

            {/* Email */}
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="grow"
              />
            </label>

            {/* Password */}
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
              />
            </label>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Submit Button */}
            <div className="card-actions justify-center mt-4">
              <button type="submit" className="btn btn-primary w-full">
                {isLogin ? "Login" : "Signup"}
              </button>
            </div>
          </form>

          {/* Toggle */}
          <p className="text-center text-sm mt-3">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              className="link link-primary"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Signup" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
