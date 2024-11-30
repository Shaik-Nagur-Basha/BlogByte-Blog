import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CallToAction from "./CallToAction";
import PostCard from "../components/PostCard";
import { Spinner } from "flowbite-react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  useEffect(() => {
    // setPostsLoading(null);
    try {
      // setPostsLoading(true);
      const fetchPosts = async () => {
        const res = await fetch("/api/post/getposts");
        const data = await res.json();
        setPosts(data.posts);
        setPostsLoading(true);
      };
      fetchPosts();
    } catch (error) {
      console.log(error.message);
      setPostsLoading(true);
    }
  }, []);
  return (
    <div className="">
      <div className="flex flex-col flex-nowrap gap-5 max-w-full md:p-28 p-5 my-7">
        <h1 className="text-3xl font-bold md:text-5xl">
          Welcome to BlogByte Blog
        </h1>
        <p className="text-xs md:text-sm text-gray-500">
          Here you'll find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.
        </p>
        <Link
          to={"/search"}
          className="text-teal-500 hover:underline font-bold w-fit"
        >
          View all posts
        </Link>
      </div>
      <div className="home bg-amber-50 p-1 dark:bg-[#334155]">
        <CallToAction />
      </div>
      <div className="my-12">
        <h2 className="text-2xl font-bold text-center mb-5">Recent Posts</h2>
        <div className="flex flex-wrap lg:gap-10 gap-4 justify-center p-4">
          {postsLoading ? (
            posts.length ? (
              posts.map((post) => <PostCard key={post._id} post={post} />)
            ) : (
              <p className="text-red-600">No Recent posts yet!</p>
            )
          ) : (
            <Spinner />
          )}
        </div>
        {posts.length && (
          <div className="flex justify-center items-center mt-4">
            <Link
              to={"/search"}
              className="text-teal-500 hover:underline font-bold w-fit"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
