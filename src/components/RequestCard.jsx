// src/components/RequestCard.js

import axios from "axios";
import { baseUrl } from "../utlis/contants";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utlis/requestSlice";
import { toast } from "react-hot-toast";

// It's better to name this component to match the file name.
const RequestCard = ({ user, req_id }) => {
  const { firstName, lastName, age, gender, profileUrl, about } = user;

  const dispatch = useDispatch();

  const avatar =
    profileUrl ||
    `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&color=fff`;

  const handleAcceptRequest = async () => {
    try {
      await axios.post(
        baseUrl + "/request/review/accepted/" + req_id,
        {},
        {
          withCredentials: true,
        }
      );
      // **FIX 1: Use the request's ID (req_id) to remove it from the state.**
      toast.success("Request Accepted");
      dispatch(removeRequest(req_id));
    } catch (error) {
      console.error("Failed to accept request:", error);
      toast.error("Failed to accept request.");
    }
  };

  const handleDeclineRequest = async () => {
    // **FIX 2: Add full logic to the decline handler.**
    try {
      await axios.post(
        baseUrl + "/request/review/rejected/" + req_id,
        {},
        {
          withCredentials: true,
        }
      );
      // **FIX 3: Dispatch the remove action here as well, using req_id.**
      toast.success("Request Declined");
      dispatch(removeRequest(req_id));
    } catch (error) {
      console.error("Failed to decline request:", error);
      toast.error("Failed to decline request.");
    }
  };

  return (
    <div>
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
          <button
            className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white font-semibold py-2 px-5 rounded-lg transition-colors duration-300"
            onClick={handleAcceptRequest}
          >
            Accept
          </button>
          <button
            className="bg-red-500 hover:bg-red-800 hover:cursor-pointer text-white font-semibold py-2 px-5 rounded-lg transition-colors duration-300 ml-4"
            onClick={handleDeclineRequest}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
