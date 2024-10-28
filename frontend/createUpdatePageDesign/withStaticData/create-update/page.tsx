//@ Table with pagination & sorting features ->
// "use client";
// import React, { useState } from "react";
// import usersData from "@/public/users.json"; // Assuming the path is correct
// import Link from "next/link";
// import {
//   FaTrash,
//   FaSearch,
//   FaChevronLeft,
//   FaChevronRight,
// } from "react-icons/fa";
// import { MdModeEditOutline } from "react-icons/md";
// import Modal from "../components/modal/Modal";

// interface UserData {
//   id: number;
//   fullname: string;
//   email: string;
//   status: string;
//   description: string;
//   address: string;
//   designation: string;
// }

// const ITEMS_PER_PAGE_OPTIONS = [2, 5, 10];

// const UserPage: React.FC = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const filteredData = usersData.filter((user) => {
//     const matchesSearch = user.fullname
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesFilter = filterStatus ? user.status === filterStatus : true;
//     return matchesSearch && matchesFilter;
//   });

//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//   const currentItems = filteredData.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handleFilterChange = (status: string) => {
//     if (filterStatus === status) {
//       setFilterStatus(null); // Reset filter if clicked again
//     } else {
//       setFilterStatus(status);
//     }
//   };

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
//       <h1 className="text-3xl font-bold uppercase text-teal-600 mb-5">
//         User Information
//       </h1>

//       <div className="flex items-center justify-between gap-5 mb-4">
//         <div className="relative w-1/3">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="border border-gray-300 text-gray-900 rounded-lg py-2 px-4 w-full shadow-sm transition duration-200 focus:outline-none focus:ring focus:ring-teal-600 placeholder:text-teal-600"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <FaSearch className="absolute top-3 right-3 text-teal-600" />
//         </div>

//         <div className="flex space-x-2">
//           {["Active", "Pending", "Inactive"].map((status) => (
//             <span
//               key={status}
//               className="border border-teal-600 text-teal-600 bg-white font-semibold uppercase rounded-lg px-6 py-2 cursor-pointer transition duration-200 hover:bg-teal-600 hover:text-white"
//               onClick={() => handleFilterChange(status)}
//             >
//               {status}
//             </span>
//           ))}
//         </div>

//         <button
//           className="text-base font-semibold uppercase bg-teal-600 text-white border border-teal-600 rounded-lg px-4 py-2 flex items-center transition duration-200 hover:bg-white hover:text-teal-600"
//           onClick={handleOpenModal}
//         >
//           Add User
//         </button>
//       </div>

//       <div className="rounded-lg border border-gray-300 mb-6 shadow-md bg-white">
//         <div className="overflow-x-auto rounded-lg">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gradient-to-r from-teal-700 to-teal-800 text-white uppercase font-bold text-base">
//               <tr>
//                 {["ID", "Full Name", "Email", "Status", "Actions"].map(
//                   (header) => (
//                     <th key={header} className="px-4 py-3 font-medium">
//                       {header}
//                     </th>
//                   )
//                 )}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {currentItems.map((user: UserData, index) => (
//                 <tr
//                   key={user.id}
//                   className={`transition duration-200 ${
//                     index % 2 === 0 ? "bg-gray-100" : "bg-white"
//                   } hover:bg-gray-100`}
//                 >
//                   <td className="whitespace-nowrap px-4 py-3">{user.id}</td>
//                   <td className="whitespace-nowrap px-4 py-3">
//                     {user.fullname}
//                   </td>
//                   <td className="whitespace-nowrap px-4 py-3">{user.email}</td>
//                   <td className="whitespace-nowrap px-4 py-3">{user.status}</td>
//                   <td className="whitespace-nowrap px-4 py-3 flex space-x-2">
//                     <Link
//                       href={`/dashboard/users/${user.id}`}
//                       className="bg-teal-600 text-white border-2 border-teal-600 p-2 rounded-full hover:bg-white hover:text-teal-600 transition duration-200"
//                     >
//                       <MdModeEditOutline />
//                     </Link>
//                     <button
//                       className="bg-red-400 text-white border-2 border-red-400 p-2 rounded-full hover:bg-white hover:text-red-400 transition duration-200"
//                       onClick={() =>
//                         console.log(`Delete user with ID: ${user.id}`)
//                       }
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex justify-between items-center border-t border-gray-300 px-4 py-4 bg-gray-50">
//           <select
//             className="text-left border border-teal-600 text-teal-600 rounded-lg py-2 px-4 shadow-sm transition duration-200 focus:outline-none focus:ring focus:ring-teal-600 hover:bg-teal-600 hover:text-white"
//             value={itemsPerPage}
//             onChange={(e) => setItemsPerPage(Number(e.target.value))}
//           >
//             {ITEMS_PER_PAGE_OPTIONS.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>

//           <div className="flex items-center">
//             <button
//               onClick={handlePrevPage}
//               disabled={currentPage === 1}
//               className="bg-teal-600 text-white px-4 py-2 rounded-l-lg disabled:opacity-50 transition duration-200 hover:bg-white hover:text-teal-600 border-2 border-teal-600"
//             >
//               <FaChevronLeft />
//             </button>
//             <span className="mx-2 text-gray-700 font-semibold">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={handleNextPage}
//               disabled={currentPage === totalPages}
//               className="bg-teal-600 text-white px-4 py-2 rounded-r-lg disabled:opacity-50 transition duration-200 hover:bg-white hover:text-teal-600 border-2 border-teal-600"
//             >
//               <FaChevronRight />
//             </button>
//           </div>
//         </div>
//       </div>

//       <Modal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         modalTitle="Create a new user" // Modal title
//       />
//     </div>
//   );
// };

// export default UserPage;

//@ Table with infinity scroll features ->
"use client";
import React, { useState, useEffect } from "react";
import usersData from "@/public/users.json";
import Link from "next/link";
import { FaTrash, FaSearch } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import Modal from "../components/modal/Modal";

interface UserData {
  id: number;
  fullname: string;
  email: string;
  status: string;
  description: string;
  address: string;
  designation: string;
}

const LOAD_INCREMENT = 10;

const UserPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayedUsers, setDisplayedUsers] = useState<UserData[]>([]);
  const [visibleCount, setVisibleCount] = useState(LOAD_INCREMENT);

  useEffect(() => {
    // Filter and slice the data based on search term, filter status, and visible count
    const filteredData = usersData.filter((user) => {
      const matchesSearch = user.fullname
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus ? user.status === filterStatus : true;
      return matchesSearch && matchesFilter;
    });
    setDisplayedUsers(filteredData.slice(0, visibleCount));
  }, [searchTerm, filterStatus, visibleCount]);

  const handleScroll = () => {
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
    const bottomPosition = document.documentElement.offsetHeight - 50; // Trigger near the bottom

    if (scrollPosition >= bottomPosition) {
      setVisibleCount((prev) => prev + LOAD_INCREMENT);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFilterChange = (status: string) => {
    setFilterStatus(filterStatus === status ? null : status);
    setVisibleCount(LOAD_INCREMENT); // Reset visible count on filter change
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold uppercase text-teal-600 mb-4 md:mb-5">
        User Information
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-4">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 text-gray-900 rounded-lg py-2 px-4 w-full shadow-sm transition duration-200 focus:outline-none focus:ring focus:ring-teal-600 placeholder:text-teal-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute top-3 right-3 text-teal-600" />
        </div>

        <div className="flex space-x-2 mt-2 md:mt-0">
          {["Active", "Pending", "Inactive"].map((status) => (
            <span
              key={status}
              className={`border border-teal-600 text-teal-600 bg-white font-semibold uppercase rounded-lg px-5 py-2 cursor-pointer transition duration-200 hover:bg-teal-600 hover:text-white`}
              onClick={() => handleFilterChange(status)}
            >
              {status}
            </span>
          ))}
        </div>

        <button
          className="text-base font-semibold uppercase bg-teal-600 text-white border border-teal-600 rounded-lg px-4 py-2 mt-2 md:mt-0 flex items-center transition duration-200 hover:bg-white hover:text-teal-600"
          onClick={handleOpenModal}
        >
          Add User
        </button>
      </div>

      <div className="rounded-lg border border-gray-300 shadow-md bg-white">
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-teal-700 to-teal-800 text-white uppercase font-bold text-base text-left">
              <tr>
                {["ID", "Full Name", "Email", "Status", "Actions"].map(
                  (header) => (
                    <th key={header} className="px-4 py-3 font-medium">
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {displayedUsers.map((user: UserData, index) => (
                <tr
                  key={user.id}
                  className={`transition duration-200 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="whitespace-nowrap px-4 py-3">{user.id}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {user.fullname}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{user.email}</td>
                  <td className="whitespace-nowrap px-4 py-3">{user.status}</td>
                  <td className="whitespace-nowrap px-4 py-3 flex space-x-2">
                    <Link
                      href={`/dashboard/users/${user.id}`}
                      className="bg-teal-600 text-white border-2 border-teal-600 p-2 rounded-full hover:bg-white hover:text-teal-600 transition duration-200"
                    >
                      <MdModeEditOutline />
                    </Link>
                    <button
                      className="bg-red-400 text-white border-2 border-red-400 p-2 rounded-full hover:bg-white hover:text-red-400 transition duration-200"
                      onClick={() =>
                        console.log(`Delete user with ID: ${user.id}`)
                      }
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        modalTitle="Create a new user"
      />
    </div>
  );
};

export default UserPage;
