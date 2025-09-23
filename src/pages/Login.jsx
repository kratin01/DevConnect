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
      navigate(isLogin ? "/" : "/profile");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-base-200 to-base-300">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-content/10 rounded-2xl overflow-hidden">
        <div className="card-body p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gradient mb-2">
              {isLogin ? "Welcome Back" : "Join DevConnect"}
            </h2>
            <p className="text-base-content/70 text-sm">
              {isLogin ? "Sign in to your account" : "Create your developer profile"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="form-control w-full">
                  <label className="input input-bordered flex items-center gap-2 w-full focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required={!isLogin}
                      className="flex-1 focus:outline-none"
                    />
                  </label>
                </div>

                {/* Last Name */}
                <div className="form-control w-full">
                  <label className="input input-bordered flex items-center gap-2 w-full focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required={!isLogin}
                      className="flex-1 focus:outline-none"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Email */}
            <div className="form-control w-full">
              <label className="input input-bordered flex items-center gap-2 w-full focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 focus:outline-none"
                />
              </label>
            </div>

            {/* Password */}
            <div className="form-control w-full">
              <label className="input input-bordered flex items-center gap-2 w-full focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                  <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.5.5 0 0 0 0 1V9a.5.5 0 0 0 1 0V4.5a.5.5 0 0 0-1 0V4Z" clipRule="evenodd" />
                </svg>
                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  className="flex-1 focus:outline-none"
                />
              </label>
            </div>

            {/* Error */}
            {error && (
              <div className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                type="submit" 
                className="btn btn-primary w-full btn-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </div>
          </form>

          {/* Toggle */}
          <div className="text-center pt-4 border-t border-base-content/10">
            <p className="text-sm text-base-content/70">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                className="link link-primary font-semibold hover:no-underline"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign up here" : "Sign in here"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
