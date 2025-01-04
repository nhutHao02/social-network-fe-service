import React, { useEffect, useState } from "react";
import "./nav.css";
import { NavLink, Link } from "react-router-dom";
import perform from "../../../../service/Service";
import ENDPOINTS from "../../../../service/API";
import { getSubName } from "../../../../utils/sub";

export default function Nav() {
  const [userInfo, setUserInfo] = useState(null);
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

    fetchUserInfo().catch((error) =>
      console.error("Error fetching data:", error)
    );
  }, []);
  if (!userInfo) {
    return <p>Loading...</p>;
  }
  return (
    <div className="nav_container">
      <Link to="/" className="logo">
        <p className="text-[#c6c3ff]">RPM</p>
      </Link>
      <NavLink exact to="/home" activeClassName="active" className="row">
        <p className="flex">
        <div className="size-[42px]"><i className="fa-solid fa-house"></i></div>Home
        </p>
      </NavLink>
      <NavLink to="/explore" activeClassName="active" className="row">
        <p className="flex">
          <div className="size-[42px]"><i className="fa-solid fa-magnifying-glass"></i></div>Explore
        </p>
      </NavLink>
      <NavLink to="/notifications" activeClassName="active" className="row">
        <p className="flex">
           <div className="size-[42px]"><i className="fa-regular fa-bell"></i></div>Notifications
        </p>
      </NavLink>
      <NavLink to="/message" activeClassName="active" className="row">
        <p className="flex">
           <div className="size-[42px]"><i className="fa-regular fa-envelope"></i></div>Message
        </p>
      </NavLink>
      <NavLink to="/bookmarks" activeClassName="active" className="row">
        <p className="flex">
           <div className="size-[42px]"><i className="fa-regular fa-bookmark"></i></div>Bookmarks
        </p>
      </NavLink>
      <NavLink to={`/profile/${localStorage.getItem("id")}`} activeClassName="active" className="row">
        <p className="flex">
           <div className="size-[42px]"><i className="fa-regular fa-user"></i></div>Profile
        </p>
      </NavLink>
      <NavLink to="/more" activeClassName="active" className="row">
        <p className="flex">
          {" "}
           <div className="size-[42px]"><i className="fa-solid fa-ellipsis"></i></div>More
        </p>
      </NavLink>
      <div className="btn btn-primary">
        <p className="text-center">Post</p>
      </div>
      <div className="info_user">
        <div className="img">
          <img src={userInfo.urlAvt}></img>
        </div>
        <div className="info">
          <p className="name">{userInfo.fullName}</p>
          <p>@{getSubName(userInfo.email)}</p>
        </div>
      </div>
    </div>
  );
}
