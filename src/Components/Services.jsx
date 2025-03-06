import React, { useState , useEffect} from 'react';
import '../App.css';
import data from "../assets/dummyData.json"
import { useDispatch } from 'react-redux';
import { setItemEvent , setItemSetting} from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


export const ServiceCam = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeTab, setActveTab] = useState("")
  const [activeTabData, setActiveTabData] = useState([])
  const [page, setPage] = useState(1);
  const [noPerPage, setNoPerPage] = useState(1);

  console.log("services", activeTab);
  

  const dispatch = useDispatch();

  const navigate = useNavigate();


  async function callApi() {
    if (!activeTab) return; // Prevent call when activeTab is empty

    try {
      const res = await fetch(`http://192.168.151.19:5017/services/${activeTab}`);
      const jsonRes = await res.json();
      console.log('jsonRes', jsonRes);
      // Dispatch your actions here
      dispatch(setItemEvent(jsonRes.events))
      dispatch(setItemSetting(jsonRes.settings));
    } catch (error) {
      console.error('API call error:', error);
    }
  }

  useEffect(() => {
    if (activeTab) {
      callApi();
    }
  }, [activeTab]);


  // const paginationForward = (p) => {
  //   if (p !== noOfPage) setPage(p => p + 1);
  // }

  // const paginationBackward = (p) => {
  //   if (p !== 1) {
  //     setPage(p => p - 1);
  //   }

  // }
  // const noOfPage = Math.floor(activeTab.length / noPerPage);

  // const toDisplayPageNo = [...Array(noOfPage + 1).keys()].slice(1)

  // const lastIndexPage = page * noPerPage;
  // const fistIndexPage = lastIndexPage - noPerPage;

  // const displayItems = activeTab.slice(fistIndexPage, lastIndexPage);

  // console.log(noOfPage, toDisplayPageNo, displayItems)

  const handleHighlight = (index, user) => {
    setActiveIndex(index);
    setActveTab(user);


  };

  // const showDetails = (userData) => {
  //   console.log("userData", userData)
  //   dispatch(setItems(userData))
  //   navigate("/event")
  //   // navigate("/event",{ state: { from: 'services', items: userData } })
  // }

  return (
    <div style={{ width: '100%', display: 'flex' }}>
      <div className="left-section">
      <h2 className="text-gray-600">Services/<span>All Services</span></h2>

        <div className="header">
          <h1>Face Recognition cpu</h1>
          <label className="toggle-container">
            <input type="checkbox" style={{ display: 'none' }} />
          </label>
        </div>

        <button className="w-full mt-4 p-2 bg-gray-800 text-white rounded-lg text-center">+ Add Service</button>

     
        <div className="mt-4">
          {data.services.map((service, index) => (
            <div
              key={service.id}
              onClick={() => handleHighlight(index, service.name)}
              className={`flex items-center p-2 rounded-lg mb-2 cursor-pointer transition-all duration-300 ${activeIndex === index ? 'bg-gray-700 text-white' : 'bg-gray-200'
                }`}
            >
              <span className="mr-2">{service.icon}</span> {service.label}
            </div>
          ))}
        </div>
      </div>

       <div className="w-full p-4">
  <div className="mb-4">
    <input
      type="text"
      placeholder="Search"
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  
 
    <div className="mt-8 text-center">
      <p className="mb-4 text-gray-600">No Users Found! Add Users to start building the User List.</p>
      <button className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700">+ Add User</button>
    </div>


</div>

     
    </div>
  );
};

// import React, { useState } from 'react';
// import '../App.css';
// import data from "../assets/dummyData.json"
// import { useDispatch } from 'react-redux';
// import { setItems } from '../utils/userSlice';
// import { useNavigate } from 'react-router-dom';

// export const ServiceCam = () => {
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [activeTab, setActveTab] = useState([])
//   const [page, setPage] = useState(1);
//   const [noPerPage, setNoPerPage] = useState(1);

//   console.log("services", data.services)

//   const dispatch = useDispatch();

//   const navigate = useNavigate();


//   // useEffect(() => {
//   //   fetchData();
//   // }, [page]);

//   // const fetchData = async () => {
//   //   const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//   //   const json = await response.json();
//   //   // const pageAsPerData = json.slice(intialPageFeed, endPageFeed);
//   //   setData(json);

//   // }
//   const paginationForward = (p) => {
//     if (p !== noOfPage) setPage(p => p + 1);
//   }

//   const paginationBackward = (p) => {
//     if (p !== 1) {
//       setPage(p => p - 1);
//     }

//   }
//   const noOfPage = Math.floor(activeTab.length / noPerPage);

//   const toDisplayPageNo = [...Array(noOfPage + 1).keys()].slice(1)

//   const lastIndexPage = page * noPerPage;
//   const fistIndexPage = lastIndexPage - noPerPage;

//   const displayItems = activeTab.slice(fistIndexPage, lastIndexPage);

//   console.log(noOfPage, toDisplayPageNo, displayItems)

//   const handleHighlight = (index, user) => {
//     setActiveIndex(index);
//     setActveTab(user);
//     console.log("dispatch(setItems(userData))", index, user[0].Images)
//     dispatch(setItems(user[0].Images))
//   };

//   const showDetails = (userData) => {
//     console.log("userData", userData)
//     dispatch(setItems(userData))
//     navigate("/event")
//     // navigate("/event",{ state: { from: 'services', items: userData } })
//   }

//   return (
//     <div style={{ width: '100%', display: 'flex' }}>
//       <div className="left-section">
//       <h2 className="text-gray-600">Services/<span>All Services</span></h2>

//         <div className="header">
//           <h1>Face Recognition cpu</h1>
//           <label className="toggle-container">
//             <input type="checkbox" style={{ display: 'none' }} />
//           </label>
//         </div>

//         <button className="w-full mt-4 p-2 bg-gray-800 text-white rounded-lg text-center">+ Add Service</button>

     
//         <div className="mt-4">
//           {data.services.map((service, index) => (
//             <div
//               key={service.id}
//               onClick={() => handleHighlight(index, service.Day)}
//               className={`flex items-center p-2 rounded-lg mb-2 cursor-pointer transition-all duration-300 ${activeIndex === index ? 'bg-gray-700 text-white' : 'bg-gray-200'
//                 }`}
//             >
//               <span className="mr-2">{service.icon}</span> {service.label}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="w-full p-4">
//   <div className="mb-4">
//     <input
//       type="text"
//       placeholder="Search"
//       className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//     />
//   </div>

//   <table className="w-full border-collapse">
//     <thead>
//       <tr className="bg-gray-800 text-white">
//         <th className="p-3 text-left">User ID</th>
//         <th className="p-3 text-left">User Name</th>
//         <th className="p-3 text-left">User Type</th>
//         <th className="p-3 text-left">Department</th>
//         <th className="p-3 text-left">Camera</th>
//         <th className="p-3 text-left">Valid Till</th>
//         <th className="p-3 text-left">Action</th>
//       </tr>
//     </thead>
//     <tbody>
//       {displayItems.map((item, index) => (
//         <tr key={index} className="odd:bg-gray-100 even:bg-white">
//           <td className="p-3">{item.userId}</td>
//           <td className="p-3">{item.name}</td>
//           <td className="p-3">"testing"</td>
//           <td className="p-3">"testing"</td>
//           <td className="p-3">"testing"</td>
//           <td className="p-3">"testing"</td>
//           <td className="p-3">
//             <button
//               onClick={() => showDetails(item.Images)}
//               className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
//             >
//               Details
//             </button>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>

//   {displayItems.length === 0 && (
//     <div className="mt-8 text-center">
//       <p className="mb-4 text-gray-600">No Users Found! Add Users to start building the User List.</p>
//       <button className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700">+ Add User</button>
//     </div>
//   )}

//   {displayItems.length > 0 && (
//     <div className="flex items-center justify-between mt-8">
//       <button
//         className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700"
//         onClick={paginationBackward}
//       >
//         &laquo; Previous
//       </button>

//       <div className="flex space-x-2">
//         {toDisplayPageNo.map((pageNo) => (
//           <span
//             key={pageNo}
//             onClick={() => setPage(pageNo)}
//             className={`cursor-pointer px-3 py-1 rounded-lg ${page === pageNo ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
//           >
//             {pageNo}
//           </span>
//         ))}
//       </div>

//       <button
//         className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700"
//         onClick={paginationForward}
//       >
//         Next &raquo;
//       </button>
//     </div>
//   )}
// </div>
//     </div>
//   );
// };