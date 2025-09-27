import React from "react";
import { Link } from "react-router-dom";

// A small utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  if (!string || typeof string !== "string") return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const ConnectionCard = ({ user }) => {
  const {
    firstName = "User",
    lastName = "",
    age,
    gender,
    profileUrl,
    about = "No bio available.",
    _id
  } = user;

  // Format the names using the utility function
  const formattedFirstName = capitalizeFirstLetter(firstName);
  const formattedLastName = capitalizeFirstLetter(lastName);

  // Fallback avatar if profileUrl is missing
  const avatar =
    profileUrl ||
    `https://ui-avatars.com/api/?name=${formattedFirstName}+${formattedLastName}&background=random&size=200&bold=true`;

  return (
    <div className="card bg-base-100 w-full max-w-xs shadow-2xl border border-base-content/10 transition-all duration-300 hover:shadow-primary/30 hover:scale-[1.02] hover:-translate-y-1 rounded-2xl overflow-hidden group">
      <figure className="relative h-48 overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={avatar}
          alt={`Profile of ${formattedFirstName} ${formattedLastName}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-3 right-3">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
        </div>
      </figure>

      <div className="card-body p-4 space-y-3">
        <div className="text-center">
          <h2 className="card-title text-lg sm:text-xl font-bold text-base-content justify-center">
            {formattedFirstName} {formattedLastName}
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {age && (
            <div className="badge badge-info badge-sm font-medium">
              {age} years
            </div>
          )}
          {gender && (
            <div className="badge badge-neutral badge-sm font-medium">
              {gender}
            </div>
          )}
        </div>

        <div className="min-h-[60px] flex items-center">
          <p className="text-base-content/70 text-sm text-center leading-relaxed line-clamp-2">
            {about}
          </p>
        </div>

        <div className="card-actions justify-center pt-2">
          <Link to={`/chat/${_id}`} className="w-full">
            <button className="btn btn-primary btn-sm w-full shadow-lg hover:shadow-xl transition-all duration-200">
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
              Chat With {formattedFirstName}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
