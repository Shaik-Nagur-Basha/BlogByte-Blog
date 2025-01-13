import { useRef, useState } from "react";
import { Kbd } from "flowbite-react";
import { BsArrowsFullscreen, BsGithub } from "react-icons/bs";

export default function Projects() {
  const [activeTab, setActiveTab] = useState(0);
  const iframeRef = useRef();

  const tabs = [
    "NeoChat(Ongoing)",
    "BlogByte-Blog",
    "Listing-Hub",
    "Gradient-Craft",
    "Text-In-Image",
    "Spotify-Home-UI-Clone",
    "Random-Color",
    "Color-Your-Name",
    "Toggle-Sidebar-With-CSS",
  ];
  const tabContents = [
    "https://neochat-sk.onrender.com",
    "https://blogbyte-blog.onrender.com",
    "https://listing-hub.onrender.com",
    "https://shaik-nagur-basha.github.io/Gradient-Craft/",
    "https://shaik-nagur-basha.github.io/Text-In-Image/",
    "https://shaik-nagur-basha.github.io/Spotify-Home-UI-Clone/",
    "https://shaik-nagur-basha.github.io/Random-Color-Generator/",
    "https://shaik-nagur-basha.github.io/Color-Your-Name/",
    "https://shaik-nagur-basha.github.io/Toggle-Sidebar-With-CSS/",
  ];

  // Function to make the iframe go fullscreen
  const handleFullscreen = () => {
    if (iframeRef.current) {
      const element = iframeRef.current; // Get the iframe element
      if (element.getAttribute("src")) {
        location.href = element.getAttribute("src");
      }
    }
  };

  return (
    <div className="">
      <div className="">
        <div className="bg-white m-2 dark:bg-gray-800 sm:p-5 p-2 rounded-xl shadow-lg transition-all">
          {/* Tab buttons with underline effect */}
          <div className="flex justify-between min-[1330px]:items-center gap-4 sm:flex-col min-[1330px]:flex-row overflow-x-auto">
            <div>
              <div className="flex justify-between items-center">
                <Kbd>Major Projects</Kbd>
                <Kbd
                  onClick={handleFullscreen}
                  className="cursor-pointer sm:hidden"
                >
                  <BsArrowsFullscreen />
                </Kbd>
                <p className="text-gray-500 font-mono text-xs sm:text-sm flex justify-center items-center">
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
              <div className="flex space-x-6 border-transparent w-max">
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
                    style={{ lineHeight: "1.25rem" }}
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
            <div className="max-sm:hidden">
              <div className="flex justify-between items-center">
                <Kbd>Mini Projects</Kbd>
                <Kbd onClick={handleFullscreen} className="cursor-pointer">
                  <BsArrowsFullscreen />
                </Kbd>
              </div>
              <div className="flex space-x-6 border-b-4 border-transparent w-max">
                {tabs.slice(3, 7).map((tab, index) => (
                  <button
                    key={index + 3}
                    onClick={(e) => {
                      if (e.target.innerText === "Spotify-Home-UI-Clone") {
                        return (location.href =
                          "https://shaik-nagur-basha.github.io/Spotify-Home-UI-Clone/");
                      }
                      setActiveTab(index + 3);
                    }}
                    className={`relative py-3 text-lg font-semibold transition-all duration-300 transform hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none ${
                      activeTab === index + 3
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                    style={{ lineHeight: "1.25rem" }}
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
        </div>
        {/* Tab content with smooth transition */}
        <div
          className="bg-white mx-2 mb-2 dark:bg-gray-800 rounded-xl shadow-lg transition-all p-[0.5px] overflow-x-auto"
          style={{ transition: "opacity 0.3s ease-in-out" }}
        >
          <iframe
            src={tabContents[activeTab]}
            ref={iframeRef}
            className={`text-gray-800 rounded-lg dark:text-gray-100 text-lg max-sm:min-w-[412px] w-full min-h-screen`}
          ></iframe>
        </div>
      </div>
    </div>
  );
}
