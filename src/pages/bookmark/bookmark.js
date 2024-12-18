import React from "react";

import Nav from "../home/components/nav/nav";
import RightBar from "../home/components/rightBar/rightBar";
import CenterBookMark from "./centerBookmark";


export default function Bookmarks() {
    return (
        <div className="flex w-full h-screen">
            <Nav/>
            <CenterBookMark/>
            <RightBar/>
        </div>
    )
}