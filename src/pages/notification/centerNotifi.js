import React, {useEffect} from "react";
import { useState } from "react";
import NotificationRow from "./components/NotificationRow";
import perform from "../../service/Service";
import ENDPOINTS from "../../service/API";
import { ResponseCode } from "../../service/Code";

export default function CenterNotifi() {
  const [selected, setSelected] = useState("All");
  const [notifs, setNotifis] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        var response = await perform(ENDPOINTS.NOTIFICATION.GET_NOTIFICATIONS, {
          userID: "6c58ffeb-38ef-46a1-823e-d83a27230200",
          page: 0,
          limit: 10,
        });
        if (response.code == ResponseCode.OK) {
          setNotifis(response.data);
          console.log(response);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
          <NotificationRow
            key={index}
            props={{
              content: notif.content,
              urlAvt: notif.user.urlAvt,
              fullName: notif.user.fullName,
              userID: notif.user.id
            }}
          />
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
