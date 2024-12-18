import React from "react";

import Nav from "../home/components/nav/nav";
import RightBar from "../home/components/rightBar/rightBar";
import CenterProfile from "./centerProfile";


export default function Profile() {
    return (
        <div className="flex w-full h-screen">
            <Nav/>
            <CenterProfile/>
            <RightBar/>
        </div>
    )
}