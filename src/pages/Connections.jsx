// src/components/Connections.js

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../utlis/contants";
import { addConnections } from "../utlis/connectionSlice";
import LoadingSpinner from "../components/LoadingSpinner"; // A simple loading component
import { Link } from "react-router-dom";
import ConnectionCard from "../components/ConnectionCard";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const [status, setStatus] = useState("idle"); // 'idle', 'loading', 'succeeded', 'failed'
  const [error, setError] = useState(null);

  const fetchConnections = async () => {
    // Only fetch if the store is empty
    if (connections && connections.length > 0) {
      setStatus("succeeded");
      return;
    }
    setStatus("loading");
    try {
      const res = await axios.get(`${baseUrl}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
      setStatus("succeeded");
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to fetch connections. Please try again later.");
      setStatus("failed");
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  // Conditional rendering based on the fetch status
  const renderContent = () => {
    switch (status) {
      case "loading":
        return <LoadingSpinner />;
      case "failed":
        return <p className="text-center text-red-500">{error}</p>;
      case "succeeded":
        return connections && connections.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {connections.map((user) => (
              <ConnectionCard key={user._id} user={user} />
            ))}
          </div>
        ) : (
          <div className="card card-dash w-96 shadow-xl mx-auto">
            <div className="card-body">
              <h2 className="card-title text-2xl">No Connections Yet</h2>
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
          Your Connections
        </h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default Connections;
