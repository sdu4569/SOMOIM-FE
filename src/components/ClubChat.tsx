import { useEffect, useRef } from "react";
import BottomTabNavigator from "./BottomTabNavigator";
import Button from "./Button";

export default function ClubChat() {
  const chatList = useRef<HTMLLIElement>(null);
  useEffect(() => {
    chatList.current?.scrollIntoView();
  });
  return (
    <div>
      <ul className="mb-[48px] flex flex-col space-y-4 p-2 overflow-scroll">
        <li className="flex justify-center items-center">
          <div className="bg-gray-400 text-gray-300 px-2 py-1 rounded-full text-center w-min">
            <p className="tranlate-y-[2px] whitespace-nowrap text-sm">
              2022년 2월 28일 화요일
            </p>
          </div>
        </li>
        <li className="flex flex-row-reverse">
          <div className="flex items-end">
            <p className="text-xs text-gray-400 mx-2">오후 1:40</p>
            <p className="p-2 rounded-md bg-blue-300 max-w-[160px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
              voluptate corporis porro dolor aliquid sequi quae debitis possimus
              dolorem asperiores! Voluptatem iure minus corporis cumque
              exercitationem dolorem corrupti molestias eligendi.
            </p>
          </div>
        </li>
        <li className="flex">
          <div className="flex items-end flex-row-reverse">
            <p className="text-xs text-gray-400 mx-2">오후 1:40</p>
            <p className="p-2 rounded-md bg-red-300 max-w-[160px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
              voluptate corporis porro dolor aliquid sequi quae debitis possimus
              dolorem asperiores! Voluptatem iure minus corporis cumque
              exercitationem dolorem corrupti molestias eligendi.
            </p>
          </div>
        </li>
        <li className="flex flex-row-reverse">
          <div className="flex items-end">
            <p className="text-xs text-gray-400 mx-2">오후 1:40</p>
            <p className="p-2 rounded-md bg-blue-300 max-w-[160px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
              voluptate corporis porro dolor aliquid sequi quae debitis possimus
              dolorem asperiores! Voluptatem iure minus corporis cumque
              exercitationem dolorem corrupti molestias eligendi.
            </p>
          </div>
        </li>
        <li ref={chatList} className="flex">
          <div className="flex items-end flex-row-reverse">
            <p className="text-xs text-gray-400 mx-2">오후 1:40</p>
            <p className="p-2 rounded-md bg-red-300 max-w-[160px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
              voluptate corporis porro dolor aliquid sequi quae debitis possimus
              dolorem asperiores! Voluptatem iure minus corporis cumque
              exercitationem dolorem corrupti molestias eligendi.
            </p>
          </div>
        </li>
      </ul>
      <BottomTabNavigator className="space-x-2 px-2">
        <input
          type="text"
          className="bg-gray-300 p-4 rounded-lg flex-1 outline-none"
        />
        <Button>전송</Button>
      </BottomTabNavigator>
    </div>
  );
}
