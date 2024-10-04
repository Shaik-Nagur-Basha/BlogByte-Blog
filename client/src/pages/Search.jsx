import { Button, Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { useLocation } from "react-router-dom";

export default function Search() {
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const location = useLocation();
  const [search, setSearch] = useState("");
  //   console.log(formData);

  const urlParams = new URLSearchParams(location.search);
  const searchTermFromUrl = urlParams.get("searchTerm");
  const categoryFromUrl = urlParams.get("category");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/post/getposts?category=${categoryFromUrl}`
        );
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    if (categoryFromUrl) {
      fetchPosts();
    }
  }, [categoryFromUrl]);

  useEffect(() => {
    const fetchPosts = async () => {
      setSearch(searchTermFromUrl);
      setLoading(true);
      try {
        const res = await fetch(
          `/api/post/getposts?searchTerm=${searchTermFromUrl}`
        );
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    if (searchTermFromUrl) {
      fetchPosts();
    }
  }, [searchTermFromUrl]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/post/getposts");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    if (searchTermFromUrl === null && categoryFromUrl === null) {
      fetchPosts();
    }
  }, []);

  const handleShowMore = async () => {
    const startIndex = posts.length;
    try {
      const res = await fetch(`/api/post/getposts?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `/api/post/getposts?searchTerm=${
          formData.searchTerm ? formData.searchTerm : ""
        }&order=${formData.order ? formData.order : ""}&category=${
          formData.category ? formData.category : ""
        }`
      );
      const data = await res.json();
      setPosts([...data.posts]);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex sm:flex-row flex-col">
      {/* <div className=""> */}
      <form
        className="sm:border-r sm:border-b-0 border-b border-r-gray-500 border-b-gray-500 sm:w-[22rem] sm:h-auto p-6 flex flex-col gap-7 items-center"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <div className="flex gap-3 items-center">
          <Label value="Search Term:" className="text-md" />
          <TextInput
            type="text"
            id="searchTerm"
            defaultValue={search}
            placeholder="Search..."
            className="sm:w-20 md:w-24 lg:w-28 xl:w-32"
            onChange={(e) =>
              setFormData({ ...formData, searchTerm: e.target.value })
            }
          />
        </div>
        <div className="flex gap-3 items-center">
          <Label value="Sort:" className="text-md" />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, order: e.target.value })
            }
            defaultValue={formData.order}
          >
            <option value="desc">Latest</option>
            <option value="asc">Oldest</option>
          </Select>
        </div>
        <div className="flex gap-3 items-center">
          <Label value="Category:" className="text-md" />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            defaultValue={categoryFromUrl}
          >
            <option value="uncategorized">Uncategorized</option>
            <option value="javascript">JavaScript</option>
            <option value="mongodb">MongoDB</option>
            <option value="express">Express</option>
          </Select>
        </div>
        <Button
          type="submit"
          gradientDuoTone="purpleToPink"
          outline
          className="w-fit"
        >
          Apply Filters
        </Button>
      </form>
      {/* </div> */}
      <div className="w-full">
        <h2 className="text-3xl mt-5 p-3 sm:border-b border-gray-500">
          Posts results:
        </h2>
        <div className="">
          {loading ? (
            <p className="text-xl text-gray-500 m-7">Loading...</p>
          ) : (
            <>
              {posts && posts.length > 0 ? (
                <div className="flex flex-wrap gap-4 sm:justify-center p-5">
                  {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              ) : (
                <p className="text-xl text-gray-500 m-7">No posts found.</p>
              )}
            </>
          )}
        </div>
        {showMore && (
          <button
            onClick={handleShowMore}
            className="w-full text-teal-500 self-center text-sm py-7"
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
}

{
  /* <>  //   const [categoryFromUrl, setCategoryFromUrl] = useState("");
  //   const [searchTermFromUrl, setSearchTermFromUrl] = useState("");
  //   console.log(formData);

  //   {
  //     formData.category || formData.searchTerm
  //       ? formData.category
  //         ? `/api/post/getposts?category=${formData.category}`
  //         : `/api/post/getposts?searchTerm=${formData.searchTerm}`
  //       : "/api/post/getposts";
  //   }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    // setSearchTermFromUrl(urlParams.get("searchTerm"));
    // setCategoryFromUrl(urlParams.get("category"));
    setFormData({
      ...formData,
      searchTerm: urlParams.get("searchTerm") || formData.searchTerm,
      category: urlParams.get("category") || formData.category,
    });
    // setCategoryFromUrl(urlParams.get("category"));
  }, [location]);

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      try {
        const searchUrl =
          formData.category || formData.searchTerm
            ? formData.category
              ? `/api/post/getposts?category=${formData.category}`
              : `/api/post/getposts?searchTerm=${formData.searchTerm}`
            : "/api/post/getposts";
        const res = await fetch(searchUrl);

        // const res = await fetch(
        //     `/api/post/getposts?category=${
        //       categoryFromUrl === null ? "" : categoryFromUrl
        //     }&searchTerm=${searchTermFromUrl === null ? "" : searchTermFromUrl}`
        //   );

        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    fetchPosts();
  }, [formData.category, formData.searchTerm]);
    console.log(posts);</> */
}
