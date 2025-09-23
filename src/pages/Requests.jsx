import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../utlis/contants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utlis/requestSlice";
import { Link } from "react-router-dom";
import RequestCard from "../components/RequestCard";


const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const [status, setStatus] = useState("idle"); // 'idle', 'loading', 'succeeded', 'failed'
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    if (requests && requests.length > 0) {
      setStatus("succeeded");
      return;
    }
    try {
      const res = await axios.get(baseUrl + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequest(res.data));
      setStatus("succeeded");
      // console.log(requests);
    } catch (error) {
      console.error("Fetch Error:", err);
      setError("Failed to fetch requests. Please try again later.");
      setStatus("failed");
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  const renderContent = () => {
    switch (status) {
      case "loading":
        return <LoadingSpinner />;
      case "failed":
        return <p className="text-center text-red-500">{error}</p>;
      case "succeeded":
        return requests && requests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {requests.map((user) => (
              <RequestCard
                key={user._id}
                user={user.fromUserId}
                req_id={user._id}
              />
            ))}
          </div>
        ) : (
          <div className="card card-dash w-96 shadow-xl mx-auto">
            <div className="card-body">
              <h2 className="card-title text-2xl">No requests Yet</h2>
              <p>
                Start networking and grow your professional circle by exploring
                profiles.
              </p>
              <div className="card-actions justify-center mt-4">
                <Link to="/">
                  <button className="btn btn-primary">Explore Profiles</button>
                </Link>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#1c222c] min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-300 mb-8 border-b-2 border-gray-200 pb-4">
          Your requests
        </h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default Requests;
