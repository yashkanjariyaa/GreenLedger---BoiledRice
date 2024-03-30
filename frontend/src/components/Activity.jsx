import React from "react";
import { avatars, users } from "../constants/activity";
import "./activity.css"; // Import CSS file for styling

const Activity = () => {
  return (
    <div className="border-2 h-[27rem] w-[28rem] max-sm:w-[70vw] rounded-xl">
      <div className="acttable flex flex-col overflow-y-scroll h-[27rem] w-full p-5">
        {users.map((user) => {
          return (
            <div key={user.id} className="p-2 py-4 flex gap-4">
              <div>
                <img
                  src={
                    avatars[Math.floor(Math.random() * avatars.length)]
                  }
                  alt=""
                  className="w-12 bg-black rounded-full"
                />
              </div>
              <div className="flex flex-col w-[30%]">
                <h1 className="font-bold font-[system-ui] ">
                  {user.name}
                </h1>
                <h2 className="font-[system-ui] font-light">
                  Points: {user.points}
                </h2>
              </div>
              <div className="flex flex-col">
                <h1 className="font-[system-ui] ">{user.date}</h1>
                <h2 className="font-[system-ui] font-light">
                  Submitted {user.weight}kg of waste
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Activity;
