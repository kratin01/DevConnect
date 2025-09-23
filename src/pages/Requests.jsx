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
          <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="card bg-base-100 w-full max-w-md shadow-2xl border border-base-content/10 rounded-2xl overflow-hidden">
              <div className="card-body text-center p-8 space-y-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-warning/20 to-info/20 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-warning"
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
                </div>
                <div className="space-y-2">
                  <h2 className="card-title text-2xl sm:text-3xl justify-center text-base-content">
                    No Requests Yet
                  </h2>
                  <p className="text-base-content/70 text-sm sm:text-base leading-relaxed">
                    No pending connection requests at the moment. Start exploring profiles to receive connection requests from other developers.
                  </p>
                </div>
                <div className="card-actions justify-center pt-4">
                  <Link 
                    to="/" 
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Explore Profiles
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-base-200 to-base-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-4">
            Connection Requests
          </h1>
          <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
            Review and manage your incoming connection requests from other developers
          </p>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Requests;
