import React from "react";


import Nav from "../home/components/nav/nav";
import RightBar from "../home/components/rightBar/rightBar";
import CenterExplore from "../explore/centerExplore";


export default function Message() {
    return (
        <div className="flex w-full h-screen">
            <Nav/>
            <CenterExplore/>
            <RightBar/>
        </div>
    )
}