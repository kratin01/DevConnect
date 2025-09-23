import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { baseUrl } from "../utlis/contants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utlis/userSlice";
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(baseUrl + "/profile", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
