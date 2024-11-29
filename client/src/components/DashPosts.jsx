import { Alert, Button, Modal, Spinner, Table, Toast } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiFire,
  HiInformationCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const [postsLoading, setPostsLoading] = useState(false);
  const [error, setError] = useState(false);

  // console.log(userPosts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
          setPostsLoading(true);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
        setPostsLoading(true);
      }
    };
    if (currentUser) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?ownerId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModel(false);
    try {
      const res = await fetch(
        `/api/post/destroy/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      {postsLoading ? (
        <div className="table-auto overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
          {error && (
            <Alert color="failure" icon={HiInformationCircle}>
              {error}
            </Alert>
          )}
          {currentUser && userPosts.length ? (
            <>
              <Table
                hoverable
                className="shadow-sm shadow-black dark:shadow-white rounded-md"
              >
                <Table.Head>
                  <Table.HeadCell>Data updated</Table.HeadCell>
                  <Table.HeadCell>Post image</Table.HeadCell>
                  <Table.HeadCell>Post title</Table.HeadCell>
                  <Table.HeadCell>Category</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                  <Table.HeadCell>
                    <span>Edit</span>
                  </Table.HeadCell>
                </Table.Head>
                {userPosts.map((post) => (
                  //"key" is for Warning Handling in "Console"
                  <Table.Body key={post._id} className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>
                        {new Date(post.updatedAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`/post/${post.slug}`}>
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-20 h-10 object-cover bg-gray-500"
                          />
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <Link
                          className="font-medium text-gray-900 dark:text-white"
                          to={`/post/${post.slug}`}
                        >
                          {post.title}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>{post.category}</Table.Cell>
                      <Table.Cell>
                        <span
                          onClick={() => {
                            setShowModel(true);
                            setPostIdToDelete(post._id);
                          }}
                          className="font-medium text-red-500 hover:underline cursor-pointer"
                        >
                          Delete
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <Link
                          className="text-teal-500 hover:underline"
                          to={`/update-post/${post._id}`}
                        >
                          <span>Edit</span>
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
              </Table>
              {showMore && (
                <button
                  onClick={handleShowMore}
                  className="flex mx-auto text-teal-500 self-center text-sm py-7"
                >
                  Show more
                </button>
              )}
            </>
          ) : (
            <p className="text-red-500">You have no posts yet!</p>
          )}
          <Modal
            show={showModel}
            onClick={() => setShowModel(false)}
            popup
            size="md"
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                <div className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this post?
                </div>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={handleDeletePost}>
                    Yes, I'm sure
                  </Button>
                  <Button color="gray" onClick={() => setShowModel(false)}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      ) : (
        <div className="m-auto">
          <Spinner className="size-12" />
        </div>
      )}
    </>
  );
}
