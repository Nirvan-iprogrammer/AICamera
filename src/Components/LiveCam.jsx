import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setItemEvent ,setItemSetting } from '../utils/userSlice';

// Table Component
const TableComponent = ({ dataToDisplay }) => {
  return (
    <div className="w-full p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3 text-left">User ID</th>
              <th className="p-3 text-left">User Name</th>
              <th className="p-3 text-left">User Type</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Camera</th>
              <th className="p-3 text-left">Valid Till</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataToDisplay.map((item, index) => (
              <tr key={index} className="odd:bg-gray-100 even:bg-white">
                <td className="p-3">{item.camera_name}</td>
                <td className="p-3">{item.image_name}</td>
                <td className="p-3">Testing</td>
                <td className="p-3">Testing</td>
                <td className="p-3">Testing</td>
                <td className="p-3">Testing</td>
                <td className="p-3">
                  <button
                    onClick={() => alert(`Details for ${item.camera_name}`)}
                    className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

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
    <div className="h-screen flex flex-col">
      {/* Start Camera Button */}
      {!isCameraStarted && (
        <button
          onClick={startCamera}
          className="self-center mt-4 px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          Start Camera
        </button>
      )}

      {/* Camera Feeds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 h-1/2">
      <div className="relative w-full h-full border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
  <div className="text-center">
    <p className="mb-4 text-gray-600">Add Camera</p>
    <button className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700">
      + Add User
    </button>
  </div>
</div>

        {videoRefs.map((videoRef, index) => (
          <div key={index} className="relative w-full h-full border border-gray-300 rounded-lg overflow-hidden">
            <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
          </div>
        ))}
         <div className="relative w-full h-full border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
  <div className="text-center">
    <p className="mb-4 text-gray-600">Add Camera</p>
    <button className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700">
      + Add User
    </button>
  </div>
</div>

      </div>

      {/* Table Section */}
      <div className="h-1/2 overflow-auto">
        <TableComponent dataToDisplay={tableData} />
      </div>
    </div>
  );
}

export default LiveCam;

// import React, { useRef, useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { setItemEvent } from '../utils/userSlice';
// import Events from './Events';

// const TableComponent = ({dataToDisplay}) =>{
//   return (
//     <div className="w-full p-4">   
//           <div className="mb-4">
//             <input
//               type="text"
//               placeholder="Search"
//               className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
    
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-800 text-white">
//                 <th className="p-3 text-left">User ID</th>
//                 <th className="p-3 text-left">User Name</th>
//                 <th className="p-3 text-left">User Type</th>
//                 <th className="p-3 text-left">Department</th>
//                 <th className="p-3 text-left">Camera</th>
//                 <th className="p-3 text-left">Valid Till</th>
//                 <th className="p-3 text-left">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {dataToDisplay.map((item, index) => (
//                 <tr key={index} className="odd:bg-gray-100 even:bg-white">
//                   <td className="p-3">{item.camera_name}</td>
//                   <td className="p-3">{item.image_name}</td>
//                   <td className="p-3">"testing"</td>
//                   <td className="p-3">"testing"</td>
//                   <td className="p-3">"testing"</td>
//                   <td className="p-3">"testing"</td>
//                   <td className="p-3">
//                     <button
//                       onClick={() => showDetails(item)}
//                       className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
//                     >
//                       Details
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
  
//         </div>
//   )
// }

// function LiveCam({ onCapture }) {
//   const videoRef = useRef(null);
//   const [isCameraStarted, setIsCameraStarted] = useState(false);
//   const [tableData, setTableData] = useState([])
//   const dispatch = useDispatch();

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       videoRef.current.srcObject = stream;
//       setIsCameraStarted(true);
//     } catch (err) {
//       console.error('Error accessing camera: ', err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const response = await fetch('http://192.168.151.19:5017/services/crowd');
//     const json = await response.json();
//     // const pageAsPerData = json.slice(intialPageFeed, endPageFeed);
//     console.log("json", json)
//     dispatch(setItemEvent(json.events))
//     setTableData(json.events)

//   }

//   const captureSnapshot = () => {
//     const canvas = document.createElement('canvas');
//     const video = videoRef.current;
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const snapshotData = canvas.toDataURL('image/jpeg'); // Get base64 image

//     // Trigger the capture event to send the snapshot
//     onCapture(snapshotData);
//   };

//   return (
//     <div>
//       {!isCameraStarted && <button onClick={startCamera}>Start Camera</button>}
//       <div><video ref={videoRef} autoPlay width="100%" /></div>
//       <div><video ref={videoRef} autoPlay width="100%" /></div>
//       <div><video ref={videoRef} autoPlay width="100%" /></div>
//       <TableComponent dataToDisplay={tableData} />
//     </div>
//   );
// }

// export default LiveCam;