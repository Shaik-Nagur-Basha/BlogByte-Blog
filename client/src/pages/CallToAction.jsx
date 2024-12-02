import { Button } from "flowbite-react";
import callToActionImage from "../assets/projects.gif";
import { BsGithub } from "react-icons/bs";

export default function CallToAction() {
  return (
    <div className="flex flex-col max-w-fit mx-auto lg:flex-row gap-8 border border-teal-500 p-8 rounded-tl-3xl rounded-br-3xl calltoaction shadow-sm shadow-black dark:shadow-white rounded-md">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-lg font-semibold sm:text-2xl dark:text-white">
          Eager to learn more about my projects?
        </h2>
        <p className="text-gray-500 font-mono my-2 text-xs sm:text-sm flex justify-center items-center">
          Checkout Source Codes on
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
        <Button
          gradientDuoTone="purpleToPink"
          href="/projects"
          className="rounded-tl-xl rounded-bl-none rounded-tr-none font-semibold w-2/4 mt-5 shadow-sm shadow-black dark:shadow-white"
          style={{ letterSpacing: "1px" }}
        >
          Projects
        </Button>
      </div>
      <div className="flex justify-center items-center">
        <img
          className="max-h-72 max-w-96 object-cover p-4 sm:shadow-sm sm:shadow-black sm:dark:shadow-white sm:rounded-md"
          src={callToActionImage}
          alt="image"
        />
      </div>
    </div>
    // <div className="flex flex-col gap-8 border border-teal-500 p-4 rounded-tl-3xl rounded-br-3xl shadow-sm shadow-black dark:shadow-white rounded-md">
    //   <div className="place-items-center flex-1">
    //     <h2 className="text-xl font-semibold">Eager to learn more about my projects?</h2>
    //     <p className="text-gray-500 font-mono my-2 text-xs sm:text-sm flex justify-center items-center">
    //       Checkout Source Codes on
    //       <a
    //         href="https://github.com/Shaik-Nagur-Basha?tab=repositories"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="text-cyan-500 cursor-pointer hover:underline flex justify-center items-center ml-2"
    //       >
    //         <BsGithub />
    //         /Shaik-Nagur-Basha
    //       </a>
    //     </p>
    //     <Button
    //       gradientDuoTone="purpleToPink"
    //       className="rounded-tl-xl py-0 px-4 rounded-bl-none rounded-tr-none shadow-sm shadow-black dark:shadow-white"
    //     >
    //       <a
    //         href="/projects"
    //         style={{ letterSpacing: "1px" }}
    //         className="font-semibold"
    //       >
    //         Projects
    //       </a>
    //     </Button>
    //   </div>
    //   <div className="flex-1">
    //     <img
    //       className="object-cover p-2 shadow-sm shadow-black dark:shadow-white rounded-md"
    //       src={callToActionImage}
    //       alt="image"
    //     />
    //   </div>
    // </div>
  );
}
