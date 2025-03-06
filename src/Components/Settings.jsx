import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Settings = () => {
  const settings = useSelector((store) => store.service.settings)
  const [formData, setFormData] = useState(settings[0]);

  //  fields disabled
  const readOnlyFields = ['id'];

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
    const handleSubmit = (e) => {
    e.preventDefault();
    postApi()

  };

  const postApi = async () => {
        // Exclude read-only fields from the payload
  const dataToSend = Object.fromEntries(
          Object.entries(formData).filter(([key]) => !readOnlyFields.includes(key))
        );
    
    try {
      const result = await axios.post("http://192.168.151.19:5017/settings", dataToSend);
      alert(result.data.message);
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Error updating data');
    }
  };


  return (
    <div className="min-h-screen text-white p-8 items-center justify-center px-70">
      {settings.length > 0 ? (
       <div>
          <h1 className="text-3xl text-black font-bold mb-8">Dynamic Form</h1>
         <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
           {Object.entries(formData).map(([key, value]) => (
             <div key={key}>
               <label className="block text-black mb-2">{key.replace('_', ' ').toUpperCase()}:</label>
               <input
                 type={typeof value === 'number' ? 'number' : 'text'}
                 value={value}
                 disabled={readOnlyFields.includes(key)}
                 onChange={(e) => handleChange(key, e.target.value)}
                 className="w-full p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
             </div>
           ))}
   
           <button
             type="submit"
             className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition"
           >
             Submit
           </button>
         </form>
        </div>
      ):(
        <div className="mt-8 text-center">
      <p className="mb-4 text-gray-600">No Users Found! Add Users to start building the User List.</p>
      <button className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700">+ Add User</button>
    </div>

      )}
     
    </div>
  );
};

export default Settings;


// import { useState } from 'react';
// import axios from "axios";
// import { setItemSetting } from '../utils/userSlice';
// import { useSelector } from 'react-redux';

// const Settings = () => {
//   const [cameraIP, setCameraIP] = useState('');
//   const [roiType, setROIType] = useState('rectangle');
//   const [roi, setROI] = useState({ x: 0, y: 0, width: 0, height: 0, radius: 0 });
//   const [crowdCount, setCrowdCount] = useState(0);

//   const settings = useSelector((store) => store.service.settings)

//   console.log("settings",settings);


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Camera IP:', cameraIP);
//     console.log('ROI Type:', roiType);
//     console.log('ROI:', roi);
//     console.log('Crowd Detection Count:', crowdCount);
//     // You can trigger your API call or detection logic here
//     postApi()

//   };

//   const postApi = async () => {
//     try {
//       const result = await axios.post("http://192.168.151.19:5017/settings", {
//         casename: cameraIP,
//         region: roiType,
//         max_person: crowdCount,
//         created_at: new Date().toISOString(), // Generates current timestamp
//       });
  
//       alert(result.data.message);
//     } catch (error) {
//       console.error("Error posting data:", error);
//       alert("Error occurred while submitting data.");
//     }
//   };

//   return (
//     <div className="min-h-screen text-white p-8 items-center justify-center px-70">
//       <h1 className="text-3xl font-bold text-black mb-8">Intrusion & Crowd Detection</h1>
//       <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
//         <div>
//           <label className="block text-black mb-2">Camera IP Address:</label>
//           <input
//             type="text"
//             value={cameraIP}
//             onChange={(e) => setCameraIP(e.target.value)}
//             placeholder="Enter Camera IP"
//             className="w-full p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block  text-black mb-2">ROI Type:</label>
//           <select
//             value={roiType}
//             onChange={(e) => setROIType(e.target.value)}
//             className="w-full p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="rectangle">Rectangle</option>
//             <option value="circle">Circle</option>
//           </select>
//         </div>

//         {/* {roiType === 'rectangle' ? (
//           <div>
//             <label className="block text-black mb-2">Region of Interest (Rectangle):</label>
//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="number"
//                 placeholder="X Coordinate"
//                 value={roi.x}
//                 onChange={(e) => setROI({ ...roi, x: e.target.value })}
//                 className="p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <input
//                 type="number"
//                 placeholder="Y Coordinate"
//                 value={roi.y}
//                 onChange={(e) => setROI({ ...roi, y: e.target.value })}
//                 className="p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <input
//                 type="number"
//                 placeholder="Width"
//                 value={roi.width}
//                 onChange={(e) => setROI({ ...roi, width: e.target.value })}
//                 className="p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <input
//                 type="number"
//                 placeholder="Height"
//                 value={roi.height}
//                 onChange={(e) => setROI({ ...roi, height: e.target.value })}
//                 className="p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//           </div>
//         ) : (
//           <div>
//             <label className="block  text-black mb-2">Region of Interest (Circle):</label>
//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="number"
//                 placeholder="Center X"
//                 value={roi.x}
//                 onChange={(e) => setROI({ ...roi, x: e.target.value })}
//                 className="p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <input
//                 type="number"
//                 placeholder="Center Y"
//                 value={roi.y}
//                 onChange={(e) => setROI({ ...roi, y: e.target.value })}
//                 className="p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <input
//                 type="number"
//                 placeholder="Radius"
//                 value={roi.radius}
//                 onChange={(e) => setROI({ ...roi, radius: e.target.value })}
//                 className="p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//           </div>
//         )} */}

//         <div>
//           <label className="block  text-black mb-2">Crowd Detection Count:</label>
//           <input
//             type="number"
//             value={crowdCount}
//             onChange={(e) => setCrowdCount(e.target.value)}
//             placeholder="Enter People Count"
//             className="w-full p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Settings;

// import { useState } from 'react';
// import useFetch from '../hooks/fetch';

// const Settings = () => {
//   const [cameraIP, setCameraIP] = useState('');
//   const [roi, setROI] = useState({ x: 0, y: 0, width: 0, height: 0 });
//   const [crowdCount, setCrowdCount] = useState(0);

//   const 

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Camera IP:', cameraIP);
//     console.log('ROI:', roi);
//     console.log('Crowd Detection Count:', crowdCount);
    
//   };

//   return (
//     <div className="min-h-screen text-white p-8 items-center justify-center px-70">
//       <h1 className="text-3xl text-black font-bold mb-8">Intrusion & Crowd Detection</h1>
//       <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
//         <div>
//           <label className="block mb-2 text-black">Camera IP Address:</label>
//           <input
//             type="text"
//             value={cameraIP}
//             onChange={(e) => setCameraIP(e.target.value)}
//             placeholder="Enter Camera IP"
//             className="w-full p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-2 text-black">Region of Interest (ROI):</label>
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="number"
//               placeholder="X Coordinate"
//               value={roi.x}
//               onChange={(e) => setROI({ ...roi, x: e.target.value })}
//               className="p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//             <input
//               type="number"
//               placeholder="Y Coordinate"
//               value={roi.y}
//               onChange={(e) => setROI({ ...roi, y: e.target.value })}
//               className="p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//             <input
//               type="number"
//               placeholder="Width"
//               value={roi.width}
//               onChange={(e) => setROI({ ...roi, width: e.target.value })}
//               className="p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//             <input
//               type="number"
//               placeholder="Height"
//               value={roi.height}
//               onChange={(e) => setROI({ ...roi, height: e.target.value })}
//               className="p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block mb-2">Crowd Detection Count:</label>
//           <input
//             type="number"
//             value={crowdCount}
//             onChange={(e) => setCrowdCount(e.target.value)}
//             placeholder="Enter People Count"
//             className="w-full p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Settings;
