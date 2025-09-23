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
    <div className="card bg-base-100 w-96 shadow-2xl border border-base-content/10 transition-shadow duration-300 hover:shadow-primary/50">
      <figure className="h-56">
        <img
          src={
            profileUrl ||
            `https://ui-avatars.com/api/?name=${formattedFirstName}+${formattedLastName}&background=random`
          }
          alt={`Profile of ${formattedFirstName} ${formattedLastName}`}
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold">
          {/* Use the formatted names here */}
          {formattedFirstName} {formattedLastName}
        </h2>

        <div className="flex gap-2 my-2">
          {age && <div className="badge badge-info">{age} years</div>}
          {gender && <div className="badge badge-neutral">{gender}</div>}
        </div>

        <p className="text-base-content/80 line-clamp-3 min-h-[72px]">
          {about}
        </p>

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-ghost" onClick={handleIgnore}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            Ignore
          </button>
          <button className="btn btn-primary" onClick={handleInterested}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
