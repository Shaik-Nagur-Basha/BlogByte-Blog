import { Button, Modal, Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");
  const [commentsLoading, setCommentsLoading] = useState(false);

  // console.log(comments);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        // console.log(data);

        if (res.ok) {
          setComments([...data.comments]);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
          setCommentsLoading(true)
        }
      } catch (error) {
        console.log(error.message);
        setCommentsLoading(true)
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(`/api/user/getcomments?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
    setShowModel(false);
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      {commentsLoading ? (
        <div className="table-auto overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 ">
          {currentUser && currentUser.isAdmin && comments.length? (
            <>
              <Table
                hoverable
                className="shadow-sm shadow-black dark:shadow-white rounded-md"
              >
                <Table.Head>
                  <Table.HeadCell>Date updated</Table.HeadCell>
                  <Table.HeadCell>Comment</Table.HeadCell>
                  <Table.HeadCell>No of Likes</Table.HeadCell>
                  <Table.HeadCell>Comment Id</Table.HeadCell>
                  <Table.HeadCell>Post Id</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                {comments.map((comment) => (
                  //"key" is for Warning Handling in "Console"
                  <Table.Body key={comment._id} className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>
                        {new Date(comment.updatedAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>{comment.content}</Table.Cell>
                      <Table.Cell>
                        {/* <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/user/${post.slug}`}
                    > */}
                        {comment.numberOfLikes}
                        {/* </Link> */}
                      </Table.Cell>
                      <Table.Cell>{comment._id}</Table.Cell>
                      <Table.Cell>{comment.postId}</Table.Cell>
                      <Table.Cell>
                        <span
                          onClick={() => {
                            setShowModel(true);
                            setCommentIdToDelete(comment._id);
                          }}
                          className="font-medium text-red-500 hover:underline cursor-pointer"
                        >
                          Delete
                        </span>
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
            <p>You have no comments yet!</p>
          )}
          <Modal
            show={showModel}
            size="md"
            onClick={() => setShowModel(false)}
            popup
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                <div className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this comment?
                </div>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={handleDeleteComment}>
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
