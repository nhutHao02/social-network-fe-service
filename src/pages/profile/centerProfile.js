import React, {useEffect} from "react";
import { useState } from "react";
import ENDPOINTS from "../../service/API";
import perform from "../../service/Service";
import { ResponseCode } from "../../service/Code";
import TweetCard from "../home/components/home/components/tweetCard";

export default function CenterProfile() {

  const [tweets, setTweets] = useState([]);
  const [page, setPage] = useState(0);
  const [limnit, _] = useState(10);
  const Tabs = {
    POSTS: {
      title: "Posts",
      endpoint: ENDPOINTS.TWEETS.GET_TWEETS_BY_USERID,
      params: {
        userID: localStorage.getItem("id"),
        page: page,
        limit: limnit,
      }
    },
    REPOSTS: {
      title: "RePosts",
      endpoint: ENDPOINTS.TWEETS.GET_REPOST_TWEETS_BY_USERID,
      params: {
        userID: localStorage.getItem("id"),
        page: page,
        limit: limnit,
      }
    },
    LOVES: {
      title: "Loves",
      endpoint: ENDPOINTS.TWEETS.GET_LOVE_TWEETS_BY_USERID,
      params: {
        userID: localStorage.getItem("id"),
        page: page,
        limit: limnit,
      }
    },
    BOOKMARKS: {
      title: "Bookmarks",
      endpoint: ENDPOINTS.TWEETS.GET_BOOKMARK_TWEETS,
      params: {
        userID: localStorage.getItem("id"),
        page: page,
        limit: limnit,
      }
    },
  }
  const [selected, setSelected] = useState(Tabs.POSTS);
  const fetchData = async () => {
    try {
      var response = await perform(selected.endpoint, 
        selected.params
      );
      if (response.code == ResponseCode.OK) {
        setTweets(response.data);
        // setTweets((prevTweets) => [...prevTweets, ...response.data]);
        // setPage((prevPage) => prevPage + 1);
        console.log(response);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selected]);

  return (
    <div className="min-w-[50%] h-full ml-[calc(20%+100px)] mr-0">
      <div className="min-h-screen text-white">
        <div className="relative">
          {/* background */}
          <div className="bg-gray-800 h-36"></div>

          <div className="flex">
            <div className="absolute top-24 left-4 flex items-center">
              <img
                className="object-cover rounded-full w-28 h-28 items-center border-2 border-white"
                src="https://img.freepik.com/free-psd/3d-illustration-bald-person-with-glasses_23-2149436184.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724630400&semt=ais_hybrid"
              />
            </div>
            <button className="ml-auto mr-4 px-4 py-2 mt-2 border border-gray-600 rounded-full text-black font-bold">
              Edit profile
            </button>
          </div>
        </div>

        <div className="mt-7 px-4">
          <h1 className="text-2xl font-bold">Hào Trần</h1>
          <p className="text-gray-500">@trannhuthao091</p>

          <div className="mt-2 flex items-center text-gray-500">
          <ion-icon name="calendar-outline" ></ion-icon>
            <span className="ml-2">Joined July 2024</span>
          </div>

          <div className="mt-2 flex text-gray-500 text-sm">
            <span className="mr-1 font-semibold">0</span>
            <span className="mr-4">Followers</span>
            <span className="mr-1 font-semibold">0</span>
            <span>Followers</span>
          </div>
        </div>

        <div className="flex border-b-[1px] border-gray-300 justify-center space-x-24 px-7 py-3 ">
            <div onClick={() => setSelected(Tabs.POSTS)} className={`cursor-pointer ${selected.title === 'Posts' ? 'border-b-2 border-blue-700' : ''}`}>
                <p className="text-black font-bold">Posts</p>
            </div>
            <div onClick={() => setSelected(Tabs.REPOSTS)} className={`cursor-pointer ${selected.title === 'RePosts' ? 'border-b-2 border-blue-700' : ''}`}>
                <p className="text-black font-bold">RePosts</p>
            </div>
            <div onClick={() => setSelected(Tabs.LOVES)} className={`cursor-pointer ${selected.title === 'Loves' ? 'border-b-2 border-blue-700' : ''}`}>
                <p className="text-black font-bold">Loves</p>
            </div>
            <div onClick={() => setSelected(Tabs.BOOKMARKS)} className={`cursor-pointer ${selected.title === 'Bookmarks' ? 'border-b-2 border-blue-700' : ''}`}>
                <p className="text-black font-bold">Bookmarks</p>
            </div>
        </div>
        
        {tweets && tweets.length > 0 ? (
        tweets.map((tweet, index) => (
          <TweetCard
            key={index}
            props={{
              id: tweet.id,
              urlAvt: tweet.user.urlAvt,
              fullName: tweet.user.fullName,
              urlImage: tweet.urlImage,
              urlVideo: tweet.urlVideo,
              loves: tweet.totalLove,
              comments: tweet.totalComment,
              reposts: tweet.totalRepost,
              saves: tweet.totalSaved,
              content: tweet.content,
              timestamp: tweet.createAt,
            }}
          />
        ))
      ) : (
        <p>No tweets available</p>
      )}
      </div>
    </div>
  );
}
