import React, { useState } from "react";

export default function NotificationRow({ props }) {
  const [notif, setNotifi] = useState(props.notif);

  return (
    <div className="flex mt-2 mx-2 border-b-[1px] border-gray-300">
      <div className="align-text-top font-extrabold text-blue-700 mr-0  pr-0 text-[20px]">
        <ion-icon name="information"></ion-icon>
      </div>
      <div className="flex items-center ml-2 space-x-2">
        <div className="flex space-x-2">
          <img
            className="object-cover rounded-full h-10 w-10 items-center"
            src={notif.authorInfo.urlAvt}
          />
        </div>
        <div>
          <p className="text-black font-semibold">
            {notif.authorInfo.fullName}
          </p>
          <p className="line-clamp-2">{notif.message}</p>
        </div>
      </div>
    </div>
  );
}
