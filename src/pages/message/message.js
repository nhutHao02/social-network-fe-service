import React from "react";


import Nav from "../home/components/nav/nav";
import RightBar from "../home/components/rightBar/rightBar";
import CenterMessage from "./centerMessage";


export default function Message() {
    return (
        <div className="flex w-full h-screen">
            <Nav/>
            <CenterMessage/>
        </div>
    )
}