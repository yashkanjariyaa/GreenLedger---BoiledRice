import React from "react";
import QRCode from "qrcode.react";

const QRCodeComponent = () => {
  const text = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUFcmljayA%3D";

  return (
    <div>
      <QRCode value={text} />
    </div>
  );
};

export default QRCodeComponent;
