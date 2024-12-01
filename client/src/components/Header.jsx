import {
  Avatar,
  Button,
  Dropdown,
  Navbar,
  Select,
  TextInput,
} from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice.js";
import { signoutSuccess } from "../redux/user/userSlice.js";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(searchTerm);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    searchTerm && urlParams.set("searchTerm", searchTerm.trim());
    category && urlParams.set("category", category);
    const searchQuery = urlParams.toString();
    navigate(`/posts?${searchQuery}`);
  };

  return (
    <Navbar className="border-b-2 sticky top-0 right-0 left-0 z-50 shadow-sm shadow-black dark:shadow-white">
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
      <form
        onSubmit={handleSubmit}
        className="lg:flex shadow-sm shadow-black dark:shadow-white rounded-full hidden"
      >
        <Select
          id="options"
          className="max-w-32"
          style={{
            borderWidth: "0.5px",
            borderRightWidth: "0",
            borderTopRightRadius: "0",
            borderBottomRightRadius: "0",
            borderTopLeftRadius: "1.5rem",
            borderBottomLeftRadius: "1.5rem",
            cursor: "pointer",
            // backgroundColor: "transparent",
            // backgroundColor: "black",
          }}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>-- Select --</option>
          <option value="javascript">JavaScript</option>
          <option value="mongodb">MongoDB</option>
          <option value="express">Express</option>
          <option value="uncategorized">Uncategorized</option>
        </Select>
        <TextInput
          type="text"
          id="searchTerm"
          value={searchTerm}
          placeholder="Search here ..."
          rightIcon={AiOutlineSearch}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            borderRadius: "1.5rem",
            paddingLeft: "1.5rem",
            paddingRight: "2.5rem",
            borderTopLeftRadius: "0",
            borderBottomLeftRadius: "0",
          }}
        />
      </form>
      <Link to={"/posts"}>
        <Button
          className="w-10 h-10 lg:hidden rounded-full shadow-sm shadow-black dark:shadow-white"
          color="gray"
          pill
        >
          <AiOutlineSearch className="self-center text-lg" />
        </Button>
      </Link>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-10 h-10 rounded-full shadow-sm shadow-black dark:shadow-white"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? (
            <FaSun className="self-center" />
          ) : (
            <FaMoon className="self-center" />
          )}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="user"
                img={currentUser.profilePicture}
                rounded
                className="shadow-sm shadow-black dark:shadow-white rounded-3xl"
              />
            }
            className="shadow-sm shadow-black dark:shadow-white rounded-md"
          >
            <Dropdown.Header>
              <span className="block text-sm">{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={currentUser ? "/create-post" : "/sign-in"}>
              <Dropdown.Item
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                className="bg-gradient-to-r dark:from-red-200 dark:via-red-300 dark:to-yellow-200 from-pink-500 to-orange-400 font-semibold"
              >
                CREATE A POST
              </Dropdown.Item>
            </Link>
            <Link to={"/projects"}>
              <Dropdown.Item
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                className="bg-gradient-to-r dark:from-red-200 dark:via-red-300 dark:to-yellow-200 from-pink-500 to-orange-400 font-semibold"
              >
                PROJECTS
              </Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Link to={"/dashboard?tab=dash"}>
              <Dropdown.Item
                style={{ letterSpacing: "1px" }}
                className="font-semibold"
              >
                Dashboard
              </Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Link to={"/"} className="md:hidden">
              <Dropdown.Item style={{ letterSpacing: "1px" }}>
                Home
              </Dropdown.Item>
            </Link>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item
                style={{ letterSpacing: "1px" }}
                className="font-semibold"
              >
                Profile
              </Dropdown.Item>
            </Link>
            {/* <Link to={"/projects"} className="md:hidden">
              <Dropdown.Item>Projects</Dropdown.Item>
            </Link> */}
            <Link to={"/about"} className="md:hidden">
              <Dropdown.Item style={{ letterSpacing: "1px" }}>
                About
              </Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={handleSignout}
              style={{ letterSpacing: "1px" }}
              className="font-semibold !text-red-500"
            >
              Sign out
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <>
            <Link to="/sign-in">
              <Button
                gradientDuoTone="purpleToBlue"
                outline
                className="shadow-sm shadow-black dark:shadow-white"
              >
                Sign In
              </Button>
            </Link>
            <Navbar.Toggle />
          </>
        )}
      </div>
      <Navbar.Collapse style={{ letterSpacing: "0.5px" }}>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link
          active={currentUser ? path === "/create-post" : path === "/sign-in"}
          as={"div"}
        >
          <Link
            to={currentUser ? "/create-post" : "/sign-in"}
            style={{
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            className="bg-gradient-to-r dark:from-red-200 dark:via-red-300 dark:to-yellow-200 from-pink-500 to-orange-400"
          >
            CREATE A POST
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link
            to={"/projects"}
            style={{
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            className="bg-gradient-to-r dark:from-red-200 dark:via-red-300 dark:to-yellow-200 from-pink-500 to-orange-400"
          >
            PROJECTS
          </Link>
        </Navbar.Link>
        {/* <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link> */}
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
