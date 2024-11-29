import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments.jsx";
import DashboardCom from "../components/DashboardCom.jsx";
import { useSelector } from "react-redux";
import ErrorPage from "./ErrorPage.jsx";

export default function Dashboard() {
  let location = useLocation();
  let [tab, setTab] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get("tab");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);
  return (
    <div className="flex flex-col md:flex-row">
      {/* sidebar */}
      <DashSidebar />
      {/* User */}
      {/* dashboard */}
      {currentUser && tab === "dash" && <DashboardCom />}
      {/* Profile */}
      {currentUser && tab === "profile" && <DashProfile />}
      {/* Posts */}
      {currentUser && tab === "posts" && <DashPosts />}
      {/* comments */}
      {currentUser && tab === "comments" && <DashComments />}
      {/* Admin User */}
      {/* users */}
      {currentUser && currentUser.isAdmin && tab === "users" && <DashUsers />}

      {/* Error Message */}
      {currentUser &&
        !currentUser.isAdmin &&
        !["dash", "profile", "posts", "comments"].includes(tab) && (
          <div className="flex mx-auto">
            <ErrorPage />
          </div>
        )}
      {currentUser &&
        currentUser.isAdmin &&
        !["dash", "profile", "posts", "comments", "users"].includes(tab) && (
          <div className="flex mx-auto">
            <ErrorPage />
          </div>
        )}
    </div>
  );
}
