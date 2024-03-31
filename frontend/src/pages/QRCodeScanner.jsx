import React, { useState, useEffect } from 'react';
import { BrowserQRCodeReader } from '@zxing/library';
import Webcam from 'react-webcam';

const QRCodeScanner = () => {
  const [result, setResult] = useState('');
  const [reader, setReader] = useState(null);
  const email = localStorage.getItem("email")
  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();
    setReader(codeReader);

    return () => {
      codeReader.reset();
    };
  }, []);

  const scanCode = async () => {
    try {
      const videoElement = document.getElementById('webcam');
      const result = await reader.decodeFromVideoElement(videoElement);
      setResult(result.getText());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Webcam
        id="webcam"
        audio={false}
        width={400}
        height={400}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: 'environment',
        }}
      />
      <button onClick={scanCode}>Scan QR Code</button>
      <p>{result}</p>
    </div>
  );
}

export default QRCodeScanner;
