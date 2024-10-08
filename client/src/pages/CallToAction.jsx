import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col max-w-fit mx-auto lg:flex-row gap-8 border border-teal-500 p-8 rounded-tl-3xl rounded-br-3xl calltoaction">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-lg font-semibold sm:text-2xl dark:text-white">
          Want to learn more about javascript?
        </h2>
        <p className="text-gray-500 my-2 text-xs sm:text-sm">
          Checkout these resources with 100 JS Practice's
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none w-2/4 mt-5"
        >
          <a
            href="https://www.javascript.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            JavaScript
          </a>
        </Button>
      </div>
      <div className="flex justify-center items-center">
        <img
          className="max-h-72 max-w-96 object-cover p-4"
          src="https://miro.medium.com/v2/resize:fit:700/1*WKk1knUrSfH-Inlkg0kEMw.png"
          alt="image"
        />
      </div>
    </div>
  );
}
