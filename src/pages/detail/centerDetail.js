import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TweetCard from "../home/components/home/components/tweetCard";
import perform from "../../service/Service";
import ENDPOINTS from "../../service/API";
import CommentItem from "./components/commentItem";

export default function CenterDetail() {
  const { state } = useLocation();
  const tweet = state?.tweet;
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [limnit, _] = useState(10);
  const [socket, setSocket] = useState(null);

  const fetchData = async () => {
    try {
      let response = await perform(ENDPOINTS.TWEETS.GET_TWEET_COMMENTS, {
        tweetID: tweet.id,
        page: page,
        limit: limnit,
      });
      if (response.success) {
        console.log(response.data);
        setComments(response.data);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const userID = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const tweetID = tweet.id;

    // Log the URL being generated for WebSocket
    const wsURL = `ws://localhost:4000/api/v1/comment-tweet-websocket?tweetID=${tweetID}&userID=${userID}&token=${token}`;

    const ws = new WebSocket(wsURL);

    ws.onopen = () => {
      console.log("WebSocket comment is connected...");
    };

    ws.onmessage = (event) => {
      try {
        const newComment = JSON.parse(event.data);
        setComments((prevComments) => {
          return [
            newComment,
            ...(Array.isArray(prevComments) ? prevComments : []),
          ];
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
        console.log("Closing WebSocket connection...");
        ws.close();
      }
    };
  }, [tweet.id]);

  if (!tweet) {
    return <p>No tweet data available.</p>;
  }

  return (
    <div className="min-w-[50%] h-full ml-[calc(20%+100px)] mr-0">
      <div className="ml-[12px]" onClick={() => navigate(-1)}>
        <ion-icon name="arrow-back-outline" size="large"></ion-icon>
      </div>
      <TweetCard props={{ tweet }} />
      <div>
        {comments && comments.length > 0 ? (
          comments.map((comment, index) => (
            <CommentItem key={index} props={{ comment }} />
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
