import React from "react";
import QRCode from "qrcode.react";
import Sidebar from "../components/Sidebar";

const QRCodeComponent = () => {
  const text = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUFcmljayA%3D";

  return (
    <div className="">
      <Sidebar />
      <div className="ml-[60px] p-5">
        <QRCode value={text} />
      </div>
    </div>
  );
};

export default QRCodeComponent;
