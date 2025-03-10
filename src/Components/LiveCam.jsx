import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setItemEvent, setItemSetting } from '../utils/userSlice';
import LiveStream from './LiveStream';



// Main LiveCam Component
function LiveCam({ onCapture }) {
  const videoRefs = [useRef(null)];
  const [isCameraStarted, setIsCameraStarted] = useState(false);
  const [tableData, setTableData] = useState([]);
  const dispatch = useDispatch();

  // Start Camera for all feeds
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRefs.forEach((videoRef) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      });
      setIsCameraStarted(true);
    } catch (err) {
      console.error('Error accessing camera: ', err);
    }
  };

  // Fetch Data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.151.19:5017/services/crowd');
        const json = await response.json();
        dispatch(setItemEvent(json.events));
        dispatch(setItemSetting(json.settings));
        setTableData(json.events);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Capture Snapshot from the first camera
  const captureSnapshot = () => {
    if (!videoRefs[0].current) return;

    const canvas = document.createElement('canvas');
    const video = videoRefs[0].current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const snapshotData = canvas.toDataURL('image/jpeg');
    onCapture(snapshotData);
  };

  return (
    <div className="flex flex-col">

      {/* Camera Feeds */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="relative w-full h-full border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
          <LiveStream />
        </div>

        {videoRefs.map((videoRef, index) => (
          <div key={index} className="relative w-full h-full border border-gray-300 rounded-lg overflow-hidden">
            <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
          </div>
        ))}


      </div>
    </div>
  );
}

export default LiveCam;