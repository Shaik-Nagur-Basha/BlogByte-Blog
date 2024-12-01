import { useRef, useState } from "react";
import { Kbd } from "flowbite-react";
import { BsArrowsFullscreen, BsGithub } from "react-icons/bs";

export default function Projects() {
  const [activeTab, setActiveTab] = useState(0);
  const iframeRef = useRef();

  const tabs = [
    "BlogByte-Blog",
    "Listing-Hub",
    "NeoChat(Ongoing)",
    "Spotify-Home-UI-Clone",
    "Random-Color-Generator",
    "Color-Your-Name",
    "Toggle-Sidebar-With-CSS",
  ];
  const tabContents = [
    "https://blogbyte-blog.onrender.com",
    "https://listing-hub.onrender.com",
    "https://t.me/sknba/200",
    "https://shaik-nagur-basha.github.io/Spotify-Home-UI-Clone/",
    "https://shaik-nagur-basha.github.io/Random-Color-Generator/",
    "https://shaik-nagur-basha.github.io/Color-Your-Name/",
    "https://shaik-nagur-basha.github.io/Toggle-Sidebar-With-CSS/",
  ];

  // Function to make the iframe go fullscreen
  const handleFullscreen = () => {
    if (iframeRef.current) {
      const element = iframeRef.current; // Get the iframe element
      if (
        element.getAttribute("src") ===
        "https://shaik-nagur-basha.github.io/Spotify-Home-UI-Clone/"
      ) {
        return (location.href =
          "https://shaik-nagur-basha.github.io/Spotify-Home-UI-Clone/");
      }
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
  };

  return (
    <div className="">
      <div className="m-4">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg transition-all">
          {/* Tab buttons with underline effect */}
          <div className="flex justify-between overflow-x-auto">
            <div>
              <div className="flex justify-between items-center">
                <Kbd>Major Projects</Kbd>
                <p className="text-gray-500 font-mono my-2 text-xs sm:text-sm flex justify-center items-center">
                  Source Codes on
                  <a
                    href="https://github.com/Shaik-Nagur-Basha?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-500 cursor-pointer hover:underline flex justify-center items-center ml-2"
                  >
                    <BsGithub />
                    /Shaik-Nagur-Basha
                  </a>
                </p>
              </div>
              <div className="flex space-x-6 border-b-4 border-transparent">
                {tabs.slice(0, 3).map((tab, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      if (e.target.innerText === "NeoChat(Ongoing)") {
                        return (location.href = "https://t.me/sknba/200");
                      }
                      setActiveTab(index);
                    }}
                    className={`relative py-3 text-lg font-semibold transition-all duration-300 transform hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none ${
                      activeTab === index
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {tab}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-1 bg-blue-600 dark:bg-blue-400 transition-all duration-300 transform ${
                        activeTab === index ? "scale-x-100" : "scale-x-0"
                      } origin-bottom-left`}
                    ></span>
                  </button>
                ))}
              </div>
            </div>
            <div className="">
              <div className="flex justify-between items-center">
                <Kbd>Mini Projects</Kbd>
                <Kbd onClick={handleFullscreen} className="cursor-pointer">
                  <BsArrowsFullscreen />
                </Kbd>
              </div>
              <div className="flex space-x-6 border-b-4 border-transparent">
                {tabs.slice(3, 7).map((tab, index) => (
                  <button
                    key={index + 3}
                    onClick={() => setActiveTab(index + 3)}
                    className={`relative py-3 text-lg font-semibold transition-all duration-300 transform hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none ${
                      activeTab === index + 3
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {tab}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-1 bg-blue-600 dark:bg-blue-400 transition-all duration-300 transform ${
                        activeTab === index + 3 ? "scale-x-100" : "scale-x-0"
                      } origin-bottom-left`}
                    ></span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Tab content with smooth transition */}
          <div
            className="mt-4 rounded-lg p-[0.5px] transition-all overflow-x-auto shadow-sm shadow-black dark:shadow-white"
            style={{ transition: "opacity 0.3s ease-in-out" }}
          >
            <iframe
              src={tabContents[activeTab]}
              ref={iframeRef}
              className={`text-gray-800 rounded-lg dark:text-gray-100 text-lg
                ${
                  tabContents[activeTab] ===
                  "https://shaik-nagur-basha.github.io/Spotify-Home-UI-Clone/"
                    ? "!w-[100vw]  h-[86vh]"
                    : "w-full min-h-screen"
                }
              `}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
