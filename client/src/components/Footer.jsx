import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTelegram,
  BsTwitter,
} from "react-icons/bs";
import logo from "../assets/logo.png";

export default function FooterCom() {
  return (
    <Footer
      container
      className="border border-t-8 border-teal-500 sticky top-full left-0 right-0"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white flex justify-center items-center"
            >
              <img
                src={logo}
                className="h-10 w-10 sm:h-12 sm:w-12 mx-2"
                alt="BlogByte Blog Logo"
              />
              <span className="px-1 pb-[2px] bg-gradient-to-br hover:bg-gradient-to-bl from-indigo-500 via-purple-500 to-pink-500 rounded-t-md text-white">
                BlogByte
              </span>
              &nbsp;Blog
            </Link>
          </div>
          <div
            className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6"
            style={{ letterSpacing: "1px" }}
          >
            <div>
              <Footer.Title title="Pages" />
              <Footer.LinkGroup className="grid gap-3">
                <Footer.Link href="/projects">Projects</Footer.Link>
                <Footer.Link href="/posts">Posts</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup className="grid gap-3">
                <Footer.Link
                  href="https://linkedin.com/in/nagur-basha"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Linked In
                </Footer.Link>
                <Footer.Link
                  href="https://github.com/Shaik-Nagur-Basha"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup className="grid gap-3">
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="/"
            by="BlogByte Blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 mt-4 sm:mt-0 sm:justify-center">
            <Footer.Icon
              href="https://github.com/Shaik-Nagur-Basha"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsGithub}
            />
            <Footer.Icon
              href="https://t.me/sknba"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsTelegram}
            />
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsInstagram} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
