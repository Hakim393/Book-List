import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineBook } from "react-icons/ai";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Tombol untuk membuka/menutup sidebar di layar kecil */}
      <button
        className="fixed top-4 left-4 z-50 p-2 text-white bg-gray-800 rounded-md shadow-md md:hidden"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Sidebar container dengan pengaturan responsif */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white p-6 pt-20 transform shadow-lg rounded-r-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:translate-x-0 md:block`}
      >
        <h2 className="text-3xl font-semibold mb-8 text-center">Navigasi</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="flex items-center text-lg hover:bg-gray-700 px-4 py-2 rounded-md transition-colors"
                onClick={toggleSidebar}
              >
                <AiOutlineHome className="mr-3 text-xl" />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/form"
                className="flex items-center text-lg hover:bg-gray-700 px-4 py-2 rounded-md transition-colors"
                onClick={toggleSidebar}
              >
                <AiOutlineBook className="mr-3 text-xl" />
                Tambahkan Book
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
