import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import Sidebar from "../components/Sidebar";
import "./qr.css";

const QRCodeComponent = () => {
  const [personalSignResult, setPersonalSignResult] = useState("");
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState("");

  useEffect(() => {
    const handlePersonalSign = async () => {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        });
        const account = accounts[0];
        const exampleMessage = "Example `personal_sign` message.";
        const from = account;

        if (!from) {
          throw new Error("No Ethereum account selected");
        }

        const hexMsg = stringToHex(exampleMessage);

        const sign = await window.ethereum.request({
          method: "personal_sign",
          params: [hexMsg, from],
        });

        setPersonalSignResult(sign);
        setLoading(false); // Once signature is received, loading is set to false
      } catch (err) {
        console.error(err);
        setError(`Error: ${err.message}`);
      }
    };

    handlePersonalSign();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const stringToHex = (str) => {
    return Array.from(str)
      .map((char) => char.charCodeAt(0).toString(16))
      .join('');
  };

  const dummyData = {
    username: "tirth",
    totalDays: 6,
    dailyPlan: "plastic",
    tokenId: "12345",
  };

  const url = `{url: "http://localhost:3000/api/user/update", body:{username:${
    localStorage.getItem("username") || ""
  }, totalDays:${dummyData.totalDays || ""}}, dates:${
    dummyData.dates || ""
  }, dailyPlan: ${dummyData.dailyPlan || ""}, signature:${
    personalSignResult || ""
  }, tokenId:${dummyData.tokenId || ""}, currentDate:${new Date()}}`;

  return (
    <div className="QRCode flex flex-col">
      <Sidebar />
      {loading ? ( // If loading is true, display loading indicator
        <div>Loading...</div>
      ) : (
        <>
          <div className="p-5">
            <QRCode value={url} style={{ height: "20vw", width: "20vw" }} />
          </div>
          <div className="font1">Scan this QR code</div>
          <div className="font2">
            This is your daily QR code for collection verification
          </div>
        </>
      )}
    </div>
  );
};

export default QRCodeComponent;
