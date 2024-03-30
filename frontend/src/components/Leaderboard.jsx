import React from "react";
import { users } from "../constants/leaderboard"; // Assuming dummyData.js is the file where you export the dummy data

const Leaderboard = ({ id }) => {
  // Find the index of the user with the specified id
  const userIndex = users.findIndex((user) => user.id === id);
  const displayedUsers = users.slice(0, 5);
  return (
    <div className="w-full hover:cursor-default">
      <h1 className="text-[1.3rem]  my-5">Leaderboard</h1>
      {id > 5 && (
        <table className="w-full border-collapse border  bg-[#faf8f4]">
          <tbody>
            <tr className="border-2 border-[#cecaca]">
              <th className="py-2 px-4 text-left">Rank</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Points</th>
            </tr>
            {/* Display the first 4 records */}
            {users.slice(0, 4).map((user, index) => (
              <tr key={index} className="border-2  border-[#cecaca]">
                <td className="py-2 px-4">{user.rank}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.points}</td>
              </tr>
            ))}
            {/* If id is greater than 5, display an ellipsis */}
            {id > 5 && (
              <tr className="border-2 border-[#cecaca]">
                <td colSpan="3" className="py-2 px-4 text-center">
                  ...
                </td>
              </tr>
            )}
            {/* Display the user with the specified id */}
            <tr key={userIndex} className="border-2  border-[#cecaca]">
              <td className="py-2 px-4 font-bold">
                {users[userIndex].rank}
                <span className="font-normal"> (You)</span>
              </td>
              <td className="py-2 px-4 font-bold">{users[userIndex].name}</td>
              <td className="py-2 px-4 font-bold">{users[userIndex].points}</td>
            </tr>
            {/* If id is greater than 5, display another ellipsis */}
            {id > 5 && (
              <tr className="border-2 border-[#cecaca]">
                <td colSpan="3" className="py-2 px-4 text-center">
                  ...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {id <= 5 && (
        <table className="w-full border-collapse border  bg-[#faf8f4]">
          <tbody>
            <tr className="border-2 border-[#cecaca]">
              <th className="py-2 px-4 text-left">Rank</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Points</th>
            </tr>
            {displayedUsers.map((user, index) => (
              <tr key={index} className={`border-2  border-[#cecaca] ${user.id === id?'font-bold':''}`}>
                <td className="py-2 px-4">{user.rank} {user.id === id?<span className="font-normal"> (You)</span>:''}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.points}</td>
              </tr>
            ))}
            {/* Check if there are more users */}
            {users.length > 5 && (
              <tr className="border-2 border-[#cecaca]">
                <td colSpan="3" className="py-2 px-4 text-center">
                  ...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
