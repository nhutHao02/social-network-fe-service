import React, { useState } from "react";
import perform from "../../../../../service/Service";
import ENDPOINTS from "../../../../../service/API";
import { getSubName } from "../../../../../utils/sub";

export default function TweetCard({ props }) {
  const [tweet, setTweet] = useState(props.tweet);

  function formatTimeFromNow(dateString) {
    const inputDate = new Date(dateString);
    const now = new Date();
    const diffInMs = now - inputDate;

    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds <= 30) {
      return "1m ago";
    } else if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays < 31) {
      return `${diffInDays}d ago`;
    } else {
      const day = inputDate.getDate().toString().padStart(2, "0");
      const month = (inputDate.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
      const year = inputDate.getFullYear();
      return `${day}/${month}/${year}`;
    }
  }

  async function handleActionToTweet(action, actionType) {
    try {
      let url = actionType ? ENDPOINTS.TWEETS.ACTION_TWEET_BY_USERID : ENDPOINTS.TWEETS.DELETE_ACTION_TWEET_BY_USERID;
      let updatedAction = {...tweet.action};
      let updatedStatistics = { ...tweet.statistics }; 
  
      // Determine which action to take
      switch(action) {
        case "Love":
          updatedAction = {
            ...tweet.action,
            love: !tweet.action.love
          };
          updatedStatistics.totalLove = actionType 
            ? updatedStatistics.totalLove + 1 
            : updatedStatistics.totalLove - 1;
          break;
        case "Bookmark":
          updatedAction = {
            ...tweet.action,
            bookmark: !tweet.action.bookmark
          };
          updatedStatistics.totalBookmark = actionType 
            ? updatedStatistics.totalBookmark + 1 
            : updatedStatistics.totalBookmark - 1;
          break;
        case "Repost":
          updatedAction = {
            ...tweet.action,
            repost: !tweet.action.repost
          };
          updatedStatistics.totalRepost = actionType 
            ? updatedStatistics.totalRepost + 1 
            : updatedStatistics.totalRepost - 1;
          break;
        default:
          return;
      }
  
      // Call the API
      let response = await perform(url, {}, {
        userID: parseInt(localStorage.getItem("id")),
        tweetID: tweet.id,
        action: action
      });
  
      // If the response is successful, update the state
      if (response.success) {
        setTweet(prevTweet => ({
          ...prevTweet,
          action: updatedAction,
          statistics: updatedStatistics
        }));
      }
    } catch (error) {
      console.error("Error when action to tweet", error);
    }
  }

  function handleClick(action, actionType) {
    handleActionToTweet(action, actionType)
  }

  return (
    <div className="border-t-[1px] border-gray-300">
      <div className="p-2">
        {/* top */}
        <div className="flex justify-between p-2">
          <div className="flex space-x-2">
            <img
              className="object-cover rounded-full h-12 w-12 items-center"
              src={tweet.userInfo.urlAvt}
            />
            <div>
              <div className="flex">
                <p className="font-semibold text-black">{tweet.userInfo.fullName}</p>
                <p className="text-gray-400 font-light pl-1 text-sm pt-[3px]">
                  {" "}
                  • {formatTimeFromNow(tweet.createdAt)}
                </p>
              </div>
              <h3 className="text-gray-400 font-light">@{getSubName(tweet.userInfo.email)}</h3>
              <div>
                <p className="text-black">{tweet.content}</p>
              </div>
            </div>
          </div>
          <div className="text-gray-500">
            <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
          </div>
        </div>

        {/* image-video */}
        <img
          className="object-cover rounded-2xl h-96 w-full items-center pl-16 pr-5"
          src={tweet.urlImg}
        />

        <div className="flex justify-between py-1 pl-16 pr-5 text-lg">
          <div className="flex justify-center items-center space-x-1">
            <ion-icon name={tweet.action.love ? "heart" : "heart-outline"} onClick={()=>handleClick("Love", !tweet.action.love)} style={{ color: "gray" }}></ion-icon>
            <p className="w-6 text-left">{tweet.statistics.totalLove}</p>
          </div>
          <div className="flex justify-center items-center space-x-1">
            <ion-icon name="chatbubble-ellipses-outline" style={{ color: "gray" }}></ion-icon>
            <p className="w-6 text-left">{tweet.statistics.totalComment}</p>
          </div>
          <div className="flex justify-center items-center space-x-1">
            <ion-icon name={tweet.action.repost ? "git-compare" : "git-compare-outline"} onClick={()=>handleClick("Repost", !tweet.action.repost)} style={{ color: "gray" }}></ion-icon>
            <p className="w-6 text-left">{tweet.statistics.totalRepost}</p>
          </div>
          <div className="flex justify-center items-center space-x-1">
            <ion-icon name={tweet.action.bookmark ? "bookmark" : "bookmark-outline"} onClick={()=>handleClick("Bookmark", !tweet.action.bookmark)} style={{ color: "gray" }}></ion-icon>
            <p className="w-6 text-left">{tweet.statistics.totalBookmark}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
