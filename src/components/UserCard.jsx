import axios from "axios";
import React from "react";
import { baseUrl } from "../utlis/contants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utlis/feedSlice";

// A small utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  // Return an empty string if the input is not a valid string
  if (!string || typeof string !== "string") return "";
  // Capitalize the first letter and concatenate the rest of the string
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const UserCard = ({ user }) => {
  const {
    firstName = "User",
    lastName = "",
    profileUrl,
    age,
    gender,
    about = "No bio available.",
    _id,
  } = user;

  // Format the names using the utility function
  const formattedFirstName = capitalizeFirstLetter(firstName);
  const formattedLastName = capitalizeFirstLetter(lastName);

  const dispatch = useDispatch();

  const handleInterested = async () => {
    try {
      const res = await axios.post(
        baseUrl + "/request/send/interested/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const handleIgnore = async () => {
    try {
      const res = await axios.post(
        baseUrl + "/request/send/ignored/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-sm xl:max-w-md shadow-2xl border border-base-content/10 transition-all duration-300 hover:shadow-primary/30 hover:scale-[1.02] hover:-translate-y-1 rounded-2xl overflow-hidden">
      <figure className="relative h-64 sm:h-72 md:h-80 lg:h-64 xl:h-72 overflow-hidden">
        <img
          src={
            profileUrl ||
            `https://ui-avatars.com/api/?name=${formattedFirstName}+${formattedLastName}&background=random&size=400&bold=true`
          }
          alt={`Profile of ${formattedFirstName} ${formattedLastName}`}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </figure>
      
      <div className="card-body p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="card-title text-xl sm:text-2xl font-bold text-base-content">
            {formattedFirstName} {formattedLastName}
          </h2>
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>

        <div className="flex flex-wrap gap-2">
          {age && (
            <div className="badge badge-info badge-lg font-medium px-3 py-2">
              {age} years
            </div>
          )}
          {gender && (
            <div className="badge badge-neutral badge-lg font-medium px-3 py-2">
              {gender}
            </div>
          )}
        </div>

        <div className="min-h-[80px]">
          <p className="text-base-content/80 text-sm sm:text-base leading-relaxed line-clamp-3">
            {about}
          </p>
        </div>

        <div className="card-actions justify-between mt-6">
          <button 
            className="btn btn-ghost btn-sm sm:btn-md hover:btn-error transition-all duration-200 flex-1 max-w-[120px]"
            onClick={handleIgnore}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="hidden sm:inline">Ignore</span>
          </button>
          
          <button 
            className="btn btn-primary btn-sm sm:btn-md hover:btn-secondary transition-all duration-200 flex-1 max-w-[120px] shadow-lg hover:shadow-xl"
            onClick={handleInterested}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="hidden sm:inline">Interested</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
