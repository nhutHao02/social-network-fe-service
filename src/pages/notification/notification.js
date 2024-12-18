import React from "react";

import Nav from "../home/components/nav/nav";
import RightBar from "../home/components/rightBar/rightBar";
import CenterNotifi from "./centerNotifi";


export default function Notification() {
    return (
        <div className="flex w-full h-screen">
            <Nav/>
            <CenterNotifi/>
            <RightBar/>
        </div>
    )
}