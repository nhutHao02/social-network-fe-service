import React from "react";
import './home.css'

import Nav from "./components/nav/nav";
import RightBar from "./components/rightBar/rightBar";
import CenterHome from "./components/home/centerHome";

export default function Home() {
    return (
        <div className="home_container">
            <Nav/>
            <CenterHome/>
            <RightBar/>
        </div>
    )
}