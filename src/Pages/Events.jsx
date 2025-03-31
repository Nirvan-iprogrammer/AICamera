import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../Components/Modal';

const Events = () => {
  const [page, setPage] = useState(1);
  const [noPerPage] = useState(5);
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState("");

  const cartItem = useSelector((store) => store.service.items);

  const noOfPage = Math.floor(cartItem.length / noPerPage);
  const toDisplayPageNo = [...Array(noOfPage + 1).keys()].slice(1);

  const lastIndexPage = page * noPerPage;
  const firstIndexPage = lastIndexPage - noPerPage;
  const displayItems = cartItem.slice(firstIndexPage, lastIndexPage);

  const paginationForward = () => {
    if (page < noOfPage) setPage((p) => p + 1);
  };

  const paginationBackward = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  const showDetails = (item) => {
    setIsOpen(true);
    setModalData(item.image);
  };

  return (
    <div className="w-full p-4">
  <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-4 bg-white rounded-2xl shadow-xl max-w-lg">
          <img
            className="w-full h-52 object-cover rounded-xl"
            src={modalData}
            alt="profile-picture"
          />
        </div>
      </Modal>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

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
          {displayItems.map((item, index) => (
            <tr key={index} className="odd:bg-gray-100 even:bg-white">
              <td className="p-3">{item.camera_name}</td>
              <td className="p-3">{item.image_name}</td>
              <td className="p-3">"testing"</td>
              <td className="p-3">"testing"</td>
              <td className="p-3">"testing"</td>
              <td className="p-3">"testing"</td>
              <td className="p-3">
                <button
                  onClick={() => showDetails(item)}
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {displayItems.length === 0 && (
        <div className="mt-8 text-center">
          <p className="mb-4 text-gray-600">No Users Found! Add Users to start building the User List.</p>
          <button className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700">+ Add User</button>
        </div>
      )}

      {displayItems.length > 0 && (
        <div className="flex items-center justify-between mt-8">
          <button
            className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700"
            onClick={paginationBackward}
          >
            &laquo; Previous
          </button>

          <div className="flex space-x-2">
            {toDisplayPageNo.map((pageNo) => (
              <span
                key={pageNo}
                onClick={() => setPage(pageNo)}
                className={`cursor-pointer px-3 py-1 rounded-lg ${page === pageNo ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              >
                {pageNo}
              </span>
            ))}
          </div>

          <button
            className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700"
            onClick={paginationForward}
          >
            Next &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default Events;