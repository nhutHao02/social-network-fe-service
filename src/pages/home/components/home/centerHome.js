import React, { useState, useEffect } from "react";
import "./centerHome.css";
import perform from "../../../../service/Service";
import ENDPOINTS from "../../../../service/API";
import TweetCard from "./components/tweetCard";

export default function CenterHome() {
  const [tweets, setTweets] = useState([]);
  const [page, setPage] = useState(1);
  const [limnit, _] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState("Network");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let response = await perform(ENDPOINTS.TWEETS.GET_TWEETS, {
        page: page,
        limit: limnit,
      });
      if (response.success) {
        // setTweets(response.data);
        console.log(response);
        setTweets((prevTweets) => [...prevTweets, ...response.data]);
        setPage((prevPage) => prevPage + 1);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="home_center">
      {/* bar */}
      <div className="flex justify-evenly items-center">
      <div
        onClick={() => setTab("Network")}
        className={`cursor-pointer px-4 py-2 text-black font-bold ${tab === "Network" ? "border-b-2 border-blue-700" : ""}`}>
        Network
      </div>
      <div
        onClick={() => setTab("Following")}
        className={`cursor-pointer px-4 py-2 text-black font-bold ${tab === "Following" ? "border-b-2 border-blue-700" : ""}`}>
        Following
      </div>
      </div>
      {tweets && tweets.length > 0 ? (
        tweets.map((tweet, index) => (
          <TweetCard
            key={index}
            props={{tweet}}
          />
        ))
      ) : (
        <p>No tweets available</p>
      )}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}
