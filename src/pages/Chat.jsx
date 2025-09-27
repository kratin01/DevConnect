import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utlis/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../utlis/contants";
import { useTheme } from "../contexts/ThemeContext";


const Chat = () => {
  const { id } = useParams();
  const targetUserId = id;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((state) => state.user);
  const userId = user?._id;
  const messagesContainerRef = useRef(null);
  const { theme } = useTheme();

  const fetchChat = async () => {
    try {
      const res = await axios.get(baseUrl + `/chat/${targetUserId}`, {
        withCredentials: true,
      });
      const chatMessages = res?.data?.messages?.map((msg) => {
        return {
          firstName: msg?.senderId?.firstName,
          lastName: msg?.senderId?.lastName,
          text: msg?.text,
        };
      });
      setMessages(chatMessages);
    } catch (error) {
      console.log("Error while fetching chat", error);
    }
  };

  useEffect(() => {
    fetchChat();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId || !targetUserId) return;
    const socket = createSocketConnection();

    socket.emit("joinChat", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, text }) => {
      setMessages((prev) => [...prev, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  // smooth scroll to bottom
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div
      className={`w-3/4 mx-auto m-5 h-[70vh] flex flex-col rounded-lg shadow-lg border transition-colors duration-300 
        ${
          theme === "dark"
            ? "border-gray-700 text-gray-200"
            : "border-gray-300 text-gray-800"
        } 
        bg-transparent`}
    >
      <h1
        className={`p-5 border-b transition-colors duration-300 
          ${theme === "dark" ? "border-gray-700" : "border-gray-300"}
        `}
      >
        Chat
      </h1>

      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-5 space-y-3"
      >
        {messages.map((msg, index) => {
          const isMe = user.firstName === msg.firstName;
          return (
            <div
              key={index}
              className={"chat " + (isMe ? "chat-end" : "chat-start")}
            >
              <div className="chat-header capitalize">
                {msg.firstName} {msg.lastName}
              </div>
              <div
                className={`chat-bubble ${
                  isMe
                    ? theme === "dark"
                      ? "bg-gray-700 text-white"
                      : "bg-blue-200 text-gray-900"
                    : theme === "dark"
                    ? "bg-blue-400 text-gray-200"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={`p-5 border-t flex items-center gap-2 transition-colors duration-300 
          ${theme === "dark" ? "border-gray-700" : "border-gray-300"}
        `}
      >
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && newMessage.trim()) {
              handleSendMessage();
            }
          }}
          className={`flex-1 rounded p-2 outline-none transition-colors duration-300
            ${
              theme === "dark"
                ? "bg-gray-800 border border-gray-600 text-gray-200"
                : "bg-gray-100 border border-gray-300 text-gray-800"
            }`}
        />
        <button
          onClick={handleSendMessage}
          className={`btn transition-colors duration-300 ${
            theme === "dark" ? "btn-primary" : "btn-secondary"
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
