import React, { useState, useEffect } from "react";
import { Button, Tooltip } from "flowbite-react";
import { useSelector } from "react-redux";

export const FloatingActionButton = () => {
  const [showButton, setShowButton] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-center space-y-3 z-50">
      {/* Dropdown Menu */}
      <div
        onMouseEnter={() => setMenuOpen(true)}
        // onMouseLeave={() => setTimeout(() => setMenuOpen(false), 5000)}
        className="relative"
      >
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-500 transition"
          aria-label="Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Menu Items */}
        {menuOpen && (
          <div
            className="absolute w-max place-items-center font-mono bottom-full right-0 mb-3 rounded-lg p-3 space-y-2"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <a
              href="/"
              className="block px-4 py-2 hover:bg-gradient-to-bl hover:scale-105 text-black dark:text-white bg-gradient-to-br from-pink-500 to-orange-400 rounded-full transition shadow-sm shadow-black dark:shadow-white"
            >
              Home
            </a>
            <a
              href="/posts"
              className="block px-4 py-2 hover:bg-gradient-to-bl hover:scale-105 text-black dark:text-white bg-gradient-to-br from-pink-500 to-orange-400 rounded-full transition shadow-sm shadow-black dark:shadow-white"
            >
              Posts
            </a>
            {/* <a
              href="/projects"
              className="block px-4 py-2 hover:bg-gradient-to-bl text-gray-900 dark:text-white bg-gradient-to-br from-pink-500 to-orange-400 rounded-full transition shadow-sm shadow-black dark:shadow-white"
            >
              Projects
            </a> */}
            <Button
              gradientDuoTone="purpleToPink"
              style={{ letterSpacing: "0.5px" }}
              href="/projects"
              className="rounded-full shadow-sm shadow-black dark:shadow-white font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-black dark:text-white hover:bg-gradient-to-l hover:scale-105"
            >
              Projects
            </Button>
            <a
              href="/dashboard?tab=dash"
              className="block px-4 py-2 hover:bg-gradient-to-bl hover:scale-105 text-black dark:text-white bg-gradient-to-br from-pink-500 to-orange-400 rounded-full transition shadow-sm shadow-black dark:shadow-white"
            >
              Dashboard
            </a>
            <Button
              gradientDuoTone="purpleToPink"
              style={{ letterSpacing: "0.5px" }}
              href={currentUser ? "/create-post" : "/sign-in"}
              className="rounded-full shadow-sm shadow-black dark:shadow-white bg-gradient-to-r font-semibold font-mono from-purple-500 to-pink-500 text-black dark:text-white hover:bg-gradient-to-l hover:scale-105"
            >
              CREATE A POST
            </Button>
          </div>
        )}
      </div>

      {/* Scroll-to-Top Button */}
      {showButton && (
        <Tooltip content="Scroll to top" placement="left">
          <button
            onClick={scrollToTop}
            className="w-14 h-14 border bg-gray-800 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-700 transition focus:ring-4 focus:ring-gray-300"
            aria-label="Scroll to Top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
        </Tooltip>
      )}
    </div>
  );
};
