import { useState } from "react";
import React from "react";

export default function CenterExplore() {
    const [selected, setSelected] = useState('Trending');
  return (
    <div className="min-w-[50%] h-full ml-[calc(20%+100px)] mr-0">
      <div className="border-b-[1px] border-gray-300">
        <div className="flex border-2 mx-2 bg-gray-300 rounded-full mt-4 sticky top-0 z-[1]">
            <div className="px-3 py-1">
            <i class="fa fa-search" aria-hidden="true"></i>
            </div>
            <input className="bg-gray-300 w-max focus:outline-none focus:text-black" placeholder="Search...." />
        </div>

        <div className="flex justify-center space-x-24 px-7 py-3">
            <div onClick={() => setSelected('Trending')} className={`cursor-pointer ${selected === 'Trending' ? 'border-b-2 border-blue-700' : ''}`}>
                <p className="text-black font-bold">Trending</p>
            </div>
            <div onClick={() => setSelected('Tweets')} className={`cursor-pointer ${selected === 'Tweets' ? 'border-b-2 border-blue-700' : ''}`}>
                <p className="text-black font-bold">Tweets</p>
            </div>
            <div onClick={() => setSelected('People')} className={`cursor-pointer ${selected === 'People' ? 'border-b-2 border-blue-700' : ''}`}>
                <p className="text-black font-bold">People</p>
            </div>
            <div onClick={() => setSelected('News')} className={`cursor-pointer ${selected === 'News' ? 'border-b-2 border-blue-700' : ''}`}>
                <p className="text-black font-bold">News</p>
            </div>
        </div>

      </div>

      <div className="mx-4 mt-2">
        <p className="p-2 font-bold text-black">Trending</p>
        <div className="px-2">
          <div className="flex justify-between">
            <p className="text-[11px]">Trending in VietNam</p>
            <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
          </div>
          <p className="text-[15px] font-semibold mt-[-2px] text-black">
            Beauty
          </p>
          <p className="text-[11px] mt-[-2px]">12.3K posts</p>
        </div>
        <div className="p-2">
          <div className="flex justify-between">
            <p className="text-[11px]">Trending in VietNam</p>
            <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
          </div>
          <p className="text-[15px] font-semibold mt-[-2px] text-black">AIDS</p>
          <p className="text-[11px] mt-[-2px]">123K posts</p>
        </div>
        <div className="p-2">
          <div className="flex justify-between">
            <p className="text-[11px]">Trending in VietNam</p>
            <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
          </div>
          <p className="text-[15px] font-semibold mt-[-2px] text-black">
            React
          </p>
          <p className="text-[11px] mt-[-2px]">23K posts</p>
        </div>
        <div className="p-2">
          <div className="flex justify-between">
            <p className="text-[11px]">Trending in VietNam</p>
            <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
          </div>
          <p className="text-[15px] font-semibold mt-[-2px] text-black">Baby</p>
          <p className="text-[11px] mt-[-2px]">3.2K posts</p>
        </div>
        <div className="p-2">
          <div className="flex justify-between">
            <p className="text-[11px]">Trending in VietNam</p>
            <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
          </div>
          <p className="text-[15px] font-semibold mt-[-2px] text-black">
            HelloWord
          </p>
          <p className="text-[11px] mt-[-2px]">153.2K posts</p>
        </div>
        <div className="p-2">
          <div className="flex justify-between">
            <p className="text-[11px]">Trending in VietNam</p>
            <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
          </div>
          <p className="text-[15px] font-semibold mt-[-2px] text-black">
            Golang
          </p>
          <p className="text-[11px] mt-[-2px]">22.7K posts</p>
        </div>
        <div className="p-2">
          <div className="flex justify-between">
            <p className="text-[11px]">Trending in VietNam</p>
            <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
          </div>
          <p className="text-[15px] font-semibold mt-[-2px] text-black">
            JavaScript
          </p>
          <p className="text-[11px] mt-[-2px]">1.2K posts</p>
        </div>
      </div>
    </div>
  );
}
