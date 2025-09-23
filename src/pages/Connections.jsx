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
          <div className="min-h-[60vh] flex items-center justify-center px-4">
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
                    No Connections Yet
                  </h2>
                  <p className="text-base-content/70 text-sm sm:text-base leading-relaxed">
                    Start networking and grow your professional circle by exploring profiles and connecting with like-minded developers.
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
            Your Connections
          </h1>
          <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
            Connect with amazing developers and build your professional network
          </p>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Connections;
