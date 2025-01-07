import { useEffect, useRef, useState } from "react";
import React from "react";
import ENDPOINTS from "../../service/API";
import perform from "../../service/Service";

export default function CenterMessage() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, _] = useState(10);
  const [recentMessages, setRecentMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  const [chatMessages, setChatMessages] = useState([]);
  const [contenMessage, setContenMessage] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSelectChat = async (chatId) => {
    setSelectedChat(chatId);

    // Close the previous WebSocket connection if it exists
    if (socket) {
      socket.close();
    }

    await fetchPrivateMessage(chatId);

    const senderID = localStorage.getItem("id");
    const receiverID = chatId;
    const token = localStorage.getItem("token");
    // Create a new WebSocket connection
    const newSocket = new WebSocket(
      `ws://localhost:5000/api/v1/ws/messages?senderID=${senderID}&receiverID=${receiverID}&token=${token}`
    );

    // Set up WebSocket event handlers
    newSocket.onopen = () => {
      console.log(`WebSocket connected for chat ID: ${chatId}`);
    };

    newSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // console.log("New message received:", message);
      // Update chat messages dynamically
      setChatMessages((prevMessages) => [...prevMessages, message]);
    };

    newSocket.onclose = () => {
      console.log("WebSocket closed");
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Save the new WebSocket instance in the state
    setSocket(newSocket);
  };

  const fetchData = async () => {
    try {
      let response = await perform(ENDPOINTS.CHAT.RECENT_MESSAGES, {
        userID: localStorage.getItem("id"),
        page: page,
        limit: limit,
      });
      if (response.success) {
        // console.log(response.data);
        setRecentMessages(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchPrivateMessage = async (chatId) => {
    if (!chatId) return;
    try {
      setChatMessages([]);
      let response = await perform(ENDPOINTS.CHAT.GET_PRIVATE_MESSAGES, {
        senderID: localStorage.getItem("id"),
        receiverID: chatId,
        page: page,
        limit: limit,
      });
      if (response.success) {
        console.log(response.data);
        const sortedMessages = response.data.sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt);
        });
        setChatMessages(sortedMessages);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSendMessage = () => {
    if (!contenMessage.trim()) return;

    if (socket && socket.readyState === WebSocket.OPEN) {
      const payload = {
        message: contenMessage,
      };

      // Send the comment through WebSocket
      socket.send(JSON.stringify(payload));

      setContenMessage("");
    } else {
      console.error("WebSocket is not connected.");
    }
  };

  return (
    <div className="flex bg-gray-300 min-w-[70%] h-full ml-[calc(20%+100px)] mr-0 ">
      <div className="w-1/3 bg-white shadow-lg p-4 border-r border-gray-300">
        <h2 className="text-lg font-bold mb-4">Recent Messages</h2>
        <ul>
          {recentMessages.map((chat) => (
            <li
              key={chat.id}
              onClick={() => handleSelectChat(chat.info.id)}
              className={`p-3 mb-2 cursor-pointer rounded-lg hover:bg-gray-100 ${
                selectedChat === chat.info.id ? "bg-gray-200 font-semibold" : ""
              }`}
            >
              <div className="flex items-center ml-2 space-x-2">
                <div>
                  <img
                    className="object-cover rounded-full h-10 w-10 items-center"
                    src={chat.info.urlAvt}
                  />
                </div>

                <div>
                  <p className="text-black font-medium">{chat.info.fullName}</p>
                  <p className="text-xs text-gray-500">{chat.content}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Right panel for chat between users */}
      <div className="w-2/3 bg-gray-100 p-4">
        {selectedChat ? (
          <div>
            <h2 className="text-lg font-bold">
              Chat with{" "}
              {
                recentMessages.find((chat) => chat.info.id == selectedChat)
                  ?.info.fullName
              }
            </h2>
            <div className="mt-4 p-4 bg-white h-[70vh] rounded-lg shadow-md overflow-y-auto">
              {chatMessages.length > 0 ? (
                <ul>
                  {chatMessages.map((message, index) => {
                    const isSender =
                      message.senderID ==
                      parseInt(localStorage.getItem("id"), 10);

                    return (
                      <li
                        key={index}
                        className={`mb-2 flex ${
                          isSender ? "justify-end" : "justify-start"
                        }`}
                      >
                        {!isSender && (
                          <img
                            src={message.info.urlAvt}
                            alt="Sender Avatar"
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        )}
                        <div
                          className={`${
                            isSender
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-black"
                          } p-3 rounded-lg max-w-xs`}
                        >
                          <p className="text-sm font-medium">
                            {!isSender && message.info.fullName}
                          </p>
                          <p
                            className={`text-sm ${
                              isSender ? "text-white" : "text-black"
                            }`}
                          >
                            {message.content}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-gray-600">
                  No messages yet. Start the conversation!
                </p>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="mt-4 flex">
              <input
                type="text"
                value={contenMessage}
                onChange={(e) => setContenMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none"
              />
              <button
                className="px-4 bg-blue-500 text-white rounded-r-lg"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">
              Select a conversation to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
