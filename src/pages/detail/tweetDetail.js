import React from "react";

import Nav from "../home/components/nav/nav";
import RightBar from "../home/components/rightBar/rightBar";
import CenterDetail from "./centerDetail";


export default function TweetDetail() {
    return (
        <div className="flex w-full h-screen">
            <Nav/>
            <CenterDetail/>
            <RightBar/>
        </div>
    )
}