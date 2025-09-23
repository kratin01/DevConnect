// src/components/ConnectionCard.js

import React from "react";

const ConnectionCard = ({ user }) => {
  const { firstName, lastName, age, gender, profileUrl, about } = user;

  // Fallback avatar if profileUrl is missing
  const avatar =
    profileUrl ||
    `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&color=fff`;

  return (
    <div className=" bg-base-100 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 ease-in-out hover:shadow-xl">
      <div className="p-6">
        <img
          className="w-28 h-28 rounded-full mx-auto border-4 border-gray-100 object-cover"
          src={avatar}
          alt={`${firstName} ${lastName}`}
        />
        <div className="text-center mt-4 capitalize">
          <h2 className="text-xl font-bold text-gray-400">
            {firstName} {lastName}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {age && gender ? `${age} years • ${gender}` : ""}
          </p>
          <p className="text-gray-600 text-sm mt-2">
            {about || "No bio available."}
          </p>
        </div>
      </div>
      <div className="bg-gray-600 p-4 border-t border-gray-200 text-center">
        {/* <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg transition-colors duration-300">
            View Profile
         </button> */}
      </div>
    </div>
  );
};

export default ConnectionCard;
