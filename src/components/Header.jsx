"use client";

import { FaImages, FaNewspaper } from "react-icons/fa6";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center shadow-md">
      {/* Logo / Home Link */}
      <Link
        href="/"
        className="text-3xl font-bold text-white hover:text-blue-400 transition-colors duration-300"
      >
 Dynamic
      </Link>

      {/* Navigation Links - Only Gallery and News */}
      <nav className="flex items-center space-x-6">
        <Link
          href="/gallery"
          className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          <FaImages className="mr-2 text-purple-400" />
          Gallery
        </Link>
        <Link
          href="/news"
          className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          <FaNewspaper className="mr-2 text-green-400" />
          News
        </Link>
      </nav>
    </header>
  );
};

export default Header;