import axios from "axios";
import { baseUrl } from "../utlis/contants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utlis/feedSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import UserCard from "../components/UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const fetchFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(baseUrl + "/feed", { withCredentials: true });
      dispatch(addFeed(res.data));
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (!feed || feed.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="card bg-base-100 w-full max-w-md shadow-2xl border border-base-content/10 rounded-2xl overflow-hidden">
          <div className="card-body text-center p-8 space-y-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-primary"
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
            </div>
            <div className="space-y-2">
              <h2 className="card-title text-2xl sm:text-3xl justify-center text-base-content">
                You've seen everyone!
              </h2>
              <p className="text-base-content/70 text-sm sm:text-base leading-relaxed">
                Check back later for new profiles or expand your search criteria to discover more amazing people.
              </p>
            </div>
            <div className="card-actions justify-center pt-4">
              <Link 
                to="/connections" 
                className="btn btn-primary btn-lg px-8 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                Explore Your Connections
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-sm xl:max-w-md">
        <UserCard user={feed[0]} />
      </div>
    </div>
  );
};

export default Feed;
