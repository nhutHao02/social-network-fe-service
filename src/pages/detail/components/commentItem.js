import React, { useEffect, useState } from "react";
import { formatTimeFromNow, getSubName } from "../../../utils/sub";


export default function CommentItem({props}) {
    // const [comment, setComment] = useState(props.comment);
    const comment = props.comment;
  return (
    <div className="border-t-[1px] border-gray-300 ml-16 mr-5">
      <div className="p-2 mt-2 bg-gray-200 border border-gray-300 rounded-[10px]">
        {/* top */}
        <div className="flex justify-between p-2">
          <div className="flex space-x-2">
            <img
              className="object-cover rounded-full h-12 w-12 items-center"
              src={comment.userInfo.urlAvt}
            />
            <div>
              <div className="flex">
                <p className="font-semibold text-black">
                  {comment.userInfo.fullName}
                </p>
                <p className="text-gray-400 font-light pl-1 text-sm pt-[3px]">
                  {" "}
                  • {formatTimeFromNow(comment.createdAt)}
                </p>
              </div>
              <h3 className="text-gray-400 font-light">
              <p className="text-black">
                  {comment.description}
                </p>
              </h3>
            </div>
          </div>
          <div className="text-gray-500">
            <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
          </div>
        </div>
      </div>
    </div>
  );
}
