import React, { useState, useEffect } from "react";
import perform from "../../service/Service";
import ENDPOINTS from "../../service/API";
import TweetCard from "../home/components/home/components/tweetCard";

export default function CenterBookMark() {
  const [tweets, setTweets] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, _] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setTweets([]);
      let response = await perform(ENDPOINTS.TWEETS.GET_TWEETS_BY_USERID, {
        userID: localStorage.getItem("id"),
        action: "Bookmark",
        page: page,
        limit: limit,
      });
      if (response.success) {
        setTweets(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

    return (
        <div className="min-w-[50%] h-full ml-[calc(20%+100px)] mr-0">
            <div className=""></div>
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
    )
}

