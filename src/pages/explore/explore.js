import React from "react";


import CenterExplore from "./centerExplore";
import Nav from "../home/components/nav/nav";
import ExploreRightBar from "./components/rightBar/rightBar";


export default function Explore() {
    return (
        <div className="flex w-full h-screen">
            <Nav/>
            <CenterExplore/>
            <ExploreRightBar/>
        </div>
    )
}