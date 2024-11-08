import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white p-6 pt-20 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6">Navigasi</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link to="/" className="text-lg hover:underline" onClick={toggleSidebar}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/form" className="text-lg hover:underline" onClick={toggleSidebar}>
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
