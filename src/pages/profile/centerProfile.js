import React, { useEffect } from "react";
import { useState } from "react";
import ENDPOINTS from "../../service/API";
import perform from "../../service/Service";
import TweetCard from "../home/components/home/components/tweetCard";
import { getSubName, formatDateToMonthYear } from "../../utils/sub";

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
        userID: localStorage.getItem("id"),
        action: selected.action,
        page: page,
        limit: limnit,
      });
      if (response.success) {
        setTweets(response.data);
        // setTweets((prevTweets) => [...prevTweets, ...response.data]);
        // setPage((prevPage) => prevPage + 1);
        // console.log(response);
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
        userID: localStorage.getItem("id"),
      });
      if (response.success) {
        console.log(response.data);
        setUserInfo(response.data);
      }
    };

    // get follow
    const fetchFollowerInfo = async () => {
      let response = await perform(ENDPOINTS.USER.GET_FOLLOWER_OF_USER_ID, {
        userID: localStorage.getItem("id"),
      });
      if (response.success) {
        setFollower(response.data.total);
        setFollowers(response.data.followUserInfo);
      }
    };

    // get follow
    const fetchFollowingInfo = async () => {
      let response = await perform(ENDPOINTS.USER.GET_FOLLOWING_OF_USER_ID, {
        userID: localStorage.getItem("id"),
      });
      if (response.success) {
        setFollowing(response.data.total);
        setFollowings(response.data.followUserInfo);
      }
    };

    fetchUserInfo().catch((error) =>
      console.error("Error fetching data:", error)
    );

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
                <button className="ml-auto mr-4 px-4 py-2 mt-2 border border-gray-600 rounded-full text-black font-bold" onClick={openEditModal}>
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

        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-1/2">
              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

              <div className="mb-4">
                <label className="block mb-2 text-gray-700">
                  Background Image URL
                </label>
                <input
                  type="text"
                  value={editInfo.backgroundUrl}
                  onChange={(e) =>
                    setEditInfo({ ...editInfo, backgroundUrl: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-gray-700">
                  Avatar Image URL
                </label>
                <input
                  type="text"
                  value={editInfo.avatarUrl}
                  onChange={(e) =>
                    setEditInfo({ ...editInfo, avatarUrl: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={editInfo.fullName}
                  onChange={(e) =>
                    setEditInfo({ ...editInfo, fullName: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Sex</label>
                <select
                  value={editInfo.sex}
                  onChange={(e) =>
                    setEditInfo({ ...editInfo, sex: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={closeEditModal}
                  className="px-4 py-2 border border-gray-600 rounded text-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Xử lý lưu thông tin ở đây
                    setUserInfo(editInfo); // Lưu thông tin đã chỉnh sửa
                    closeEditModal();
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
