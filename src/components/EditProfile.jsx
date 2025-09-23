import React, { useState } from "react";
import UserProfileCard from "./UserProfileCard";
import axios from "axios";
import { baseUrl } from "../utlis/contants";
import { useDispatch } from "react-redux";
import { addUser } from "../utlis/userSlice";
import { toast } from "react-hot-toast";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [profileUrl, setprofileUrl] = useState(user.profileUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const previewUser = {
    firstName,
    lastName,
    profileUrl,
    age,
    gender,
    about,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(baseUrl + "/profile/edit", previewUser, {
        withCredentials: true,
      });

      dispatch(addUser(res.data.user));
      toast.success("Profile updated successfully!");
    } catch (error) {
      const errorMessage = error?.response?.data || "Something Went Wrong";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-start gap-8 my-7 mx-4">
        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="card w-full lg:w-3/5 bg-base-300 shadow-xl"
        >
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl mb-4">
              Edit Your Profile
            </h2>

            {/* Name Fields */}
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  placeholder="First Name"
                  className="input input-bordered w-full"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input input-bordered w-full"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </div>

            {/* Photo URL */}
            <label className="form-control w-full mt-2">
              <div className="label">
                <span className="label-text">Photo URL</span>
              </div>
              <input
                type="text"
                placeholder="https://..."
                className="input input-bordered w-full"
                value={profileUrl}
                onChange={(e) => setprofileUrl(e.target.value)}
              />
            </label>

            {/* Age and Gender */}
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="number"
                  placeholder="Your Age"
                  className="input input-bordered w-full"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
              <label className="form-control w-full flex flex-col">
                <div className="label">
                  <span className="label-text">Gender</span>
                </div>
                <select
                  className="select select-bordered"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </label>
            </div>

            {/* About Section */}
            <label className="form-control w-full mt-2 flex flex-col">
              <div className="label">
                <span className="label-text">About Me</span>
              </div>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Tell us something about yourself"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </label>

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            <div className="card-actions justify-center mt-6">
              <button type="submit" className="btn btn-primary w-1/2">
                Save Changes
              </button>
            </div>
          </div>
        </form>

        {/* 3. Pass the 'previewUser' object to the UserCard for a live preview */}
        <div className="w-full lg:w-2/5">
          <UserProfileCard user={previewUser} />
        </div>
      </div>

    </>
  );
};

export default EditProfile;
