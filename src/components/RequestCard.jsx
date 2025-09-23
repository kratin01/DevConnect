import axios from "axios";
import { baseUrl } from "../utlis/contants";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utlis/requestSlice";
import { toast } from "react-hot-toast";

// A small utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  if (!string || typeof string !== "string") return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const RequestCard = ({ user, req_id }) => {
  const { firstName = "User", lastName = "", age, gender, profileUrl, about = "No bio available." } = user;

  const dispatch = useDispatch();

  // Format the names using the utility function
  const formattedFirstName = capitalizeFirstLetter(firstName);
  const formattedLastName = capitalizeFirstLetter(lastName);

  const avatar =
    profileUrl ||
    `https://ui-avatars.com/api/?name=${formattedFirstName}+${formattedLastName}&background=random&size=200&bold=true`;

  const handleAcceptRequest = async () => {
    try {
      await axios.post(
        baseUrl + "/request/review/accepted/" + req_id,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success("Request Accepted");
      dispatch(removeRequest(req_id));
    } catch (error) {
      console.error("Failed to accept request:", error);
      toast.error("Failed to accept request.");
    }
  };

  const handleDeclineRequest = async () => {
    try {
      await axios.post(
        baseUrl + "/request/review/rejected/" + req_id,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success("Request Declined");
      dispatch(removeRequest(req_id));
    } catch (error) {
      console.error("Failed to decline request:", error);
      toast.error("Failed to decline request.");
    }
  };

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
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-lg"></div>
        </div>
        <div className="absolute top-3 left-3">
          <div className="badge badge-warning badge-sm font-medium">
            New Request
          </div>
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

        <div className="card-actions justify-between gap-2 pt-2">
          <button
            className="btn btn-error btn-sm flex-1 shadow-lg hover:shadow-xl transition-all duration-200"
            onClick={handleDeclineRequest}
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Decline
          </button>
          <button
            className="btn btn-primary btn-sm flex-1 shadow-lg hover:shadow-xl transition-all duration-200"
            onClick={handleAcceptRequest}
          >
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
