import { io } from "socket.io-client";
import { baseUrl } from "./contants";

//in this basically what happen is whenever we call this function it will create a new socket connection with the backend
// and return that socket connection to us
export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(baseUrl);
  } else {
    return io("/", { path: "/api/socket.io" });
  }
};
