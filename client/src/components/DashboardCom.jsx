import { Alert, Button, Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiAnnotation,
  HiArrowCircleUp,
  HiArrowUp,
  HiDocument,
  HiDocumentText,
  HiInformationCircle,
  HiOutlineDocument,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashboardCom() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [lastMonthLikes, setLastMonthLikes] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalNoOfLikes, setTotalNoOfLikes] = useState(0);
  const [usersLoading, setUsersLoading] = useState(false);
  const [postsLoading, setPostsLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/user/getusers?limit=5");
      const data = await res.json();
      setUsers([...data.users]);
      setLastMonthUsers(data.lastMonthUsers);
      setTotalUsers(data.totalUsers);
      setUsersLoading(true);
    };
    const fetchPosts = async () => {
      const res = await fetch(
        currentUser.isAdmin
          ? `/api/post/getposts?limit=5`
          : `/api/post/getposts?limit=5&userId=${currentUser._id}`
      );
      const data = await res.json();
      setPosts([...data.posts]);
      setLastMonthPosts(data.lastMonthPosts);
      setTotalPosts(data.totalPosts);
      setPostsLoading(true);
    };
    const fetchComments = async () => {
      const res = await fetch(
        currentUser.isAdmin
          ? `/api/comment/getcomments?limit=5`
          : `/api/comment/getcomments?limit=5&userId=${currentUser._id}`
      );
      const data = await res.json();
      setComments([...data.comments]);
      setLastMonthComments(data.lastMonthComments);
      setTotalComments(data.totalComments);
      setLastMonthLikes(data.lastMonthLikes);
      setTotalNoOfLikes(data.totalNoOfLikes);
      setCommentsLoading(true);
    };
    if (currentUser) {
      fetchPosts();
      fetchComments();
    }
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex justify-center gap-4 flex-wrap mt-5 m-2">
        {currentUser.isAdmin && (
          <div className="shadow-black shadow-sm dark:shadow-white max-w-max max-h-max p-2 rounded-md">
            <div className="w-56 flex items-center justify-between">
              <div className="">
                <h1 className="uppercase text-gray-400">Total Users</h1>
                <span
                  className={totalUsers ? `text-2xl` : `text-2xl text-red-500`}
                >
                  {usersLoading ? totalUsers : <Spinner />}
                </span>
              </div>
              <HiOutlineUserGroup className="bg-teal-500 rounded-full text-4xl p-2" />
            </div>
            <div className="flex items-center text-gray-400 mt-2">
              <HiArrowUp
                className={lastMonthUsers ? `text-cyan-500` : `text-red-500`}
              />
              <span
                className={lastMonthUsers ? `text-cyan-500` : `text-red-500`}
              >
                {usersLoading ? lastMonthUsers : <Spinner className="size-4" />}
              </span>
              &nbsp;&nbsp;
              <span className="text-sm text-gray-500">Last month</span>
            </div>
          </div>
        )}
        <div className="shadow-black shadow-sm dark:shadow-white max-w-max max-h-max p-2 rounded-md">
          <div className="w-56 flex items-center justify-between">
            <div className="">
              <h1 className="uppercase text-gray-400">Total Posts</h1>
              <span
                className={totalUsers ? `text-2xl` : `text-2xl text-red-500`}
              >
                {postsLoading ? totalPosts : <Spinner />}
              </span>
            </div>
            <HiDocumentText className="bg-green-500 rounded-full text-4xl p-2" />
          </div>
          <div className="flex items-center text-gray-400 mt-2">
            <HiArrowUp
              className={lastMonthPosts ? `text-cyan-500` : `text-red-500`}
            />
            <span className={lastMonthPosts ? `text-cyan-500` : `text-red-500`}>
              {postsLoading ? lastMonthPosts : <Spinner className="size-4" />}
            </span>
            &nbsp;&nbsp;
            <span className="text-sm text-gray-500">Last month</span>
          </div>
        </div>
        <div className="shadow-black shadow-sm dark:shadow-white max-w-max max-h-max p-2 rounded-md">
          <div className="w-56 flex items-center justify-between">
            <div className="">
              <h1 className="uppercase text-gray-400">Total Comments</h1>
              <span
                className={totalUsers ? `text-2xl` : `text-2xl text-red-500`}
              >
                {commentsLoading ? totalComments : <Spinner />}
              </span>
            </div>
            <HiAnnotation className="bg-blue-500 rounded-full text-4xl p-2" />
          </div>
          <div className="flex items-center text-gray-400 mt-2">
            <HiArrowUp
              className={lastMonthComments ? `text-cyan-500` : `text-red-500`}
            />
            <span
              className={lastMonthComments ? `text-cyan-500` : `text-red-500`}
            >
              {commentsLoading ? (
                lastMonthComments
              ) : (
                <Spinner className="size-4" />
              )}
            </span>
            &nbsp;&nbsp;
            <span className="text-sm text-gray-500">Last month</span>
          </div>
        </div>
        <div className="shadow-black shadow-sm dark:shadow-white max-w-max max-h-max p-2 rounded-md">
          <div className="w-56 flex items-center justify-between">
            <div className="">
              <h1 className="uppercase text-gray-400">Total Likes</h1>
              <span
                className={totalUsers ? `text-2xl` : `text-2xl text-red-500`}
              >
                {commentsLoading ? totalNoOfLikes : <Spinner />}
              </span>
            </div>
            <HiAnnotation className="bg-blue-500 rounded-full text-4xl p-2" />
          </div>
          <div className="flex items-center text-gray-400 mt-2">
            <HiArrowUp
              className={lastMonthLikes ? `text-cyan-500` : `text-red-500`}
            />
            <span className={lastMonthLikes ? `text-cyan-500` : `text-red-500`}>
              {commentsLoading ? (
                lastMonthLikes
              ) : (
                <Spinner className="size-4" />
              )}
            </span>
            &nbsp;&nbsp;
            <span className="text-sm text-gray-500">Last month</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 justify-center my-7 m-2 md:ml-7">
        {currentUser.isAdmin && (
          <div className="shadow-black shadow-sm dark:shadow-white max-w-md p-4 rounded-md">
            <div className="flex justify-between items-center">
              <h2 className="text-gray-600 dark:text-gray-300">Recent Users</h2>
              <Link to={"/dashboard?tab=users"}>
                <Button
                  gradientDuoTone="purpleToPink"
                  outline
                  className="shadow-sm shadow-black dark:shadow-white"
                >
                  See all
                </Button>
              </Link>
            </div>
            <Table className="mt-4">
              <Table.Head>
                <Table.HeadCell>User Image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {usersLoading ? (
                  users.length > 0 ? (
                    users.map((user) => (
                      <Table.Row key={user._id}>
                        <Table.Cell>
                          <img
                            className="w-10 h-10 object-cover rounded-full"
                            src={user.profilePicture}
                            alt="user_img"
                          />
                        </Table.Cell>
                        <Table.Cell>{user.username}</Table.Cell>
                      </Table.Row>
                    ))
                  ) : (
                    <p className="text-red-500 mt-5 translate-x-1/2">
                      You have no users yet!
                    </p>
                  )
                ) : (
                  <p className="mt-5 translate-x-1/2">
                    <Spinner />
                  </p>
                )}
              </Table.Body>
            </Table>
          </div>
        )}
        <div className="shadow-black shadow-sm dark:shadow-white max-w-xl p-4 rounded-md">
          <div className="flex justify-between items-center">
            <h2 className="text-gray-600 dark:text-gray-300">Recent posts</h2>
            <Link to={"/dashboard?tab=posts"}>
              <Button
                gradientDuoTone="purpleToPink"
                outline
                className="shadow-sm shadow-black dark:shadow-white"
              >
                See all
              </Button>
            </Link>
          </div>
          <Table className="mt-4">
            <Table.Head>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {postsLoading ? (
                posts.length > 0 ? (
                  posts.map((post) => (
                    <Table.Row key={post._id}>
                      <Table.Cell>
                        <Link to={`/post/${post.slug}`}>
                          <img
                            className="w-20 h-10 object-cover rounded-sm"
                            src={post.image}
                            alt="post_img"
                          />
                        </Link>
                      </Table.Cell>
                      <Table.Cell className="line-clamp-2">
                        <Link to={`/post/${post.slug}`}>{post.title}</Link>
                      </Table.Cell>
                      <Table.Cell>{post.category}</Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <p className="text-red-500 mt-5 translate-x-1/2">
                    You have no posts yet!
                  </p>
                )
              ) : (
                <p className="mt-5 translate-x-1/2">
                  <Spinner />
                </p>
              )}
            </Table.Body>
          </Table>
        </div>
        <div className="shadow-black shadow-sm dark:shadow-white max-w-md p-4 rounded-md">
          <div className="flex justify-between items-center">
            <h2 className="text-gray-600 dark:text-gray-300 mr-5">
              Recent Comments
            </h2>
            <Link to={"/dashboard?tab=comments"}>
              <Button
                gradientDuoTone="purpleToPink"
                outline
                className="shadow-sm shadow-black dark:shadow-white"
              >
                See all
              </Button>
            </Link>
          </div>
          <Table className="mt-4">
            <Table.Head>
              <Table.HeadCell>Comment</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {commentsLoading ? (
                comments.length > 0 ? (
                  comments.map((comment) => (
                    <Table.Row key={comment._id}>
                      <Table.Cell className="line-clamp-2">
                        {comment.content}
                      </Table.Cell>
                      <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <p className="text-red-500 mt-5 translate-x-1/3">
                    You have no comments yet!
                  </p>
                )
              ) : (
                <p className="mt-5 translate-x-1/2">
                  <Spinner />
                </p>
              )}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}
