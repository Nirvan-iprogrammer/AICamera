import React, { useRef, useState } from 'react';

function LiveCam({ onCapture }) {
  const videoRef = useRef(null);
  const [isCameraStarted, setIsCameraStarted] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsCameraStarted(true);
    } catch (err) {
      console.error('Error accessing camera: ', err);
    }
  };

  const captureSnapshot = () => {
    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const snapshotData = canvas.toDataURL('image/jpeg'); // Get base64 image

    // Trigger the capture event to send the snapshot
    onCapture(snapshotData);
  };

  return (
    <div>
      {!isCameraStarted && <button onClick={startCamera}>Start Camera</button>}
      <video ref={videoRef} autoPlay width="100%" />
      {isCameraStarted && <button onClick={captureSnapshot}>Capture Snapshot</button>}
    </div>
  );
}

export default LiveCam;