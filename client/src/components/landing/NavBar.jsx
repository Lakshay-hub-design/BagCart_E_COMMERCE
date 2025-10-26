import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 py-4 w-full bg-[#0F172A] z-50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-8">
        <nav className="flex justify-between items-center text-white">
          {/* Logo */}
          <a href="#" className="text-3xl font-bold tracking-wider hover:text-[#3B82F6] transition-colors">
            BagCart
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {["Home", "About Us", "Products", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "")}`}
                className="hover:text-[#3B82F6] transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to={'/user/login'}
              className="text-sm px-4 py-2 rounded-full border border-gray-500 hover:bg-[#1E40AF] transition-colors duration-300"
            >
              Login
            </Link>
            <Link
              to={'/user/register'}
              className="text-sm bg-[#2563EB] px-4 py-2 rounded-full font-semibold hover:bg-[#1E40AF] transition-colors duration-300"
            >
              Create Account
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white focus:outline-none hover:text-[#3B82F6] transition-colors"
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </nav>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden mt-4 space-y-2 bg-[#0F172A] rounded-lg p-4 shadow-lg">
            {["Home", "Products", "About Us", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "")}`}
                className="block py-2 px-4 text-sm rounded hover:bg-[#1E40AF] transition-colors duration-300"
                onClick={() => setOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-700 space-y-2">
              <Link
                to={'/user/login'}
                className="block text-center text-sm px-4 py-2 rounded-full border border-gray-500 hover:bg-[#1E40AF] transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                to={'/user/register'}
                className="block text-center text-sm bg-[#2563EB] px-4 py-2 rounded-full font-semibold hover:bg-[#1E40AF] transition-colors duration-300"
              >
                Create Account
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
