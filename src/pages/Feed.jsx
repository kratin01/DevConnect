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
      <div className="card card-dash w-96 shadow-xl mx-auto mt-20  ">
        <div className="card-body flex justify-center">
          <h2 className="card-title text-2xl"> You have seen everyone!</h2>
          <p>
            Check back later for new profiles or expand your search criteria.
          </p>
          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary">
              <Link to="/connections">Explore Your Connections</Link>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center my-20">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
