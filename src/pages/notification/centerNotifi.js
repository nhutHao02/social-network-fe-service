import React, { useEffect } from "react";
import { useState } from "react";
import NotificationRow from "./components/NotificationRow";
import perform from "../../service/Service";
import ENDPOINTS from "../../service/API";

export default function CenterNotifi() {
  const [selected, setSelected] = useState("All");
  const [notifs, setNotifis] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, _] = useState(10);

  const fetchData = async () => {
    try {
      let response = await perform(ENDPOINTS.NOTIFICATION.GET_NOTIFICATIONS, {
        userID: localStorage.getItem("id"),
        page: page,
        limit: limit,
      });
      if (response.success) {
        setNotifis(response.data);
        console.log(response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const userID = localStorage.getItem("id");
    const token = localStorage.getItem("token"); 

    const ws = new WebSocket(`ws://localhost:9000/api/v1/ws/notifi?userID=${userID}&token=${token}`);

    ws.onopen = () => {
      console.log("WebSocket is connected...");
    };

    ws.onmessage = (event) => {
      console.log("WebSocket has new event");
      try {
        const newNotif = JSON.parse(event.data);
        setNotifis((prevNotifs = []) => {
          const safePrevNotifs = Array.isArray(prevNotifs) ? prevNotifs : [];
          console.log("Previous notifications:", safePrevNotifs);
          return [newNotif, ...safePrevNotifs];
        });
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }

    };

    ws.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setSocket(ws);

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);
  
  return (
    <div className="min-w-[50%] h-full ml-[calc(20%+100px)] mr-0">
      <p className="font-bold text-black text-[22px] mt-3 pl-5">
        Notifications
      </p>
      <div className="flex justify-center space-x-40 px-7 py-3 border-b-[1px] border-gray-300">
        <div
          onClick={() => setSelected("All")}
          className={`cursor-pointer ${
            selected === "All" ? "border-b-2 border-blue-700" : ""
          }`}
        >
          <p className="text-black font-bold">All</p>
        </div>
        <div
          onClick={() => setSelected("Verified")}
          className={`cursor-pointer ${
            selected === "Verified" ? "border-b-2 border-blue-700" : ""
          }`}
        >
          <p className="text-black font-bold">Verified</p>
        </div>
        <div
          onClick={() => setSelected("Mentions")}
          className={`cursor-pointer ${
            selected === "Mentions" ? "border-b-2 border-blue-700" : ""
          }`}
        >
          <p className="text-black font-bold">Mentions</p>
        </div>
      </div>

      {notifs && notifs.length > 0 ? (
        notifs.map((notif, index) => (
          <NotificationRow key={index} props={{ notif }} />
        ))
      ) : (
        <div className="justify-center text-center pt-3">
          <p className="font-bold text-[30px] text-black">
            Nothing to see here yet
          </p>
        </div>
      )}
    </div>
  );
}
