import React, { useEffect } from "react";
import { useState } from "react";
import ENDPOINTS from "../../service/API";
import perform from "../../service/Service";
import TweetCard from "../home/components/home/components/tweetCard";
import { getSubName, formatDateToMonthYear } from "../../utils/sub";
import { useParams } from "react-router-dom";
import EditInfo from "./conponents/editInfo";
import { AppsSharp } from "react-ionicons";

export default function CenterProfile() {
  const [tweets, setTweets] = useState([]);
  const [page, setPage] = useState(1);
  const [limnit, _] = useState(10);
  const [userInfo, setUserInfo] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [followings, setFollowings] = useState(null);
  const [follower, setFollower] = useState(0);
  const [following, setFollowing] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const { userID } = useParams();
  const [reloadUser, setReloadUser] = useState(false);
  const Tabs = {
    POSTS: {
      title: "Posts",
      action: "Post",
    },
    REPOSTS: {
      title: "RePosts",
      action: "Repost",
    },
    LOVES: {
      title: "Loves",
      action: "Love",
    },
    BOOKMARKS: {
      title: "Bookmarks",
      action: "Bookmark",
    },
  };
  const [selected, setSelected] = useState(Tabs.POSTS);
  const fetchData = async () => {
    try {
      setTweets([]);
      let response = await perform(ENDPOINTS.TWEETS.GET_TWEETS_BY_USERID, {
        userID: userID,
        action: selected.action,
        page: page,
        limit: limnit,
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
  }, [selected]);

  useEffect(() => {
     // get info
     const fetchUserInfo = async () => {
      let response = await perform(ENDPOINTS.USER.GET_INFO_BY_USER_ID, {
        userID: userID,
      });
      if (response.success) {
        console.log(response.data);
        setUserInfo(response.data);
      }
    };

    fetchUserInfo().catch((error) =>
      console.error("Error fetching data:", error)
    );
    
  }, [reloadUser]);
  useEffect(() => {
    // get follow
    const fetchFollowerInfo = async () => {
      let response = await perform(ENDPOINTS.USER.GET_FOLLOWER_OF_USER_ID, {
        userID: userID,
      });
      if (response.success) {
        setFollower(response.data.total);
        setFollowers(response.data.followUserInfo);
      }
    };

    // get follow
    const fetchFollowingInfo = async () => {
      let response = await perform(ENDPOINTS.USER.GET_FOLLOWING_OF_USER_ID, {
        userID: userID,
      });
      if (response.success) {
        setFollowing(response.data.total);
        setFollowings(response.data.followUserInfo);
      }
    };

    fetchFollowerInfo().catch((error) =>
      console.error("Error fetching data:", error)
    );

    fetchFollowingInfo().catch((error) =>
      console.error("Error fetching data:", error)
    );
  }, []);
  const [editInfo, setEditInfo] = useState({
    backgroundUrl: userInfo?.urlBackground,
    avatarUrl: userInfo?.urlAvt,
    fullName: userInfo?.fullName,
    sex: userInfo?.sex, // Giả sử userInfo có trường sex
  });
  const openEditModal = () => {
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
  };

  const updateInfo = async (payload) => {
    try {
      let response = await perform(
        ENDPOINTS.USER.UPDATE_USER_INFO,
        {},
        payload
      );
      if (response.success) {
        setReloadUser(!reloadUser);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="min-w-[50%] h-full ml-[calc(20%+100px)] mr-0">
      <div className="min-h-screen text-white">
        {userInfo ? (
          <div>
            <div className="relative">
              {/* background */}
              <img className="h-36" src={userInfo.urlBackground} />

              <div className="flex">
                <div className="absolute top-24 left-4 flex items-center">
                  <img
                    className="object-cover rounded-full w-28 h-28 items-center border-2 border-white"
                    src={userInfo.urlAvt}
                  />
                </div>
                <button
                  className="ml-auto mr-4 px-4 py-2 mt-2 border border-gray-600 rounded-full text-black font-bold"
                  onClick={openEditModal}
                >
                  Edit profile
                </button>
              </div>
            </div>

            <div className="mt-7 px-4">
              <h1 className="text-2xl font-bold">{userInfo.fullName}</h1>
              <p className="text-gray-500">@{getSubName(userInfo.email)}</p>

              <div className="mt-2 flex items-center text-gray-500">
                <ion-icon name="calendar-outline"></ion-icon>
                <span className="ml-2">
                  Joined {formatDateToMonthYear(userInfo.createdAt)}
                </span>
              </div>

              <div className="mt-2 flex text-gray-500 text-sm">
                <span className="mr-1 font-semibold">{follower}</span>
                <span className="mr-4">Followers</span>
                <span className="mr-1 font-semibold">{following}</span>
                <span>Followings</span>
              </div>
            </div>
          </div>
        ) : (
          <p>Proress</p>
        )}

        <div className="flex border-b-[1px] border-gray-300 justify-center space-x-24 px-7 py-3 ">
          <div
            onClick={() => setSelected(Tabs.POSTS)}
            className={`cursor-pointer ${
              selected.title === "Posts" ? "border-b-2 border-blue-700" : ""
            }`}
          >
            <p className="text-black font-bold">Posts</p>
          </div>
          <div
            onClick={() => setSelected(Tabs.REPOSTS)}
            className={`cursor-pointer ${
              selected.title === "RePosts" ? "border-b-2 border-blue-700" : ""
            }`}
          >
            <p className="text-black font-bold">RePosts</p>
          </div>
          <div
            onClick={() => setSelected(Tabs.LOVES)}
            className={`cursor-pointer ${
              selected.title === "Loves" ? "border-b-2 border-blue-700" : ""
            }`}
          >
            <p className="text-black font-bold">Loves</p>
          </div>
          <div
            onClick={() => setSelected(Tabs.BOOKMARKS)}
            className={`cursor-pointer ${
              selected.title === "Bookmarks" ? "border-b-2 border-blue-700" : ""
            }`}
          >
            <p className="text-black font-bold">Bookmarks</p>
          </div>
        </div>

        {tweets && tweets.length > 0 ? (
          tweets.map((tweet, index) => (
            <TweetCard key={index} props={{ tweet }} />
          ))
        ) : (
          <p>No tweets available</p>
        )}

        {isEditing && <EditInfo 
        userInfo={userInfo}
        closeEditModal={closeEditModal}
        updateInfo={updateInfo}
        />}
      </div>
    </div>
  );
}
