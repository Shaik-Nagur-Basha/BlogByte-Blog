import { Button, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiAnnotation,
  HiArrowCircleUp,
  HiArrowUp,
  HiDocument,
  HiDocumentText,
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
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/user/getusers?limit=5");
      const data = await res.json();
      setUsers([...data.users]);
      setLastMonthUsers(data.lastMonthUsers);
      setTotalUsers(data.totalUsers);
    };
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getposts?limit=5");
      const data = await res.json();
      setPosts([...data.posts]);
      setLastMonthPosts(data.lastMonthPosts);
      setTotalPosts(data.totalPosts);
    };
    const fetchComments = async () => {
      const res = await fetch("/api/comment/getcomments?limit=5");
      const data = await res.json();
      setComments([...data.comments]);
      setLastMonthComments(data.lastMonthComments);
      setTotalComments(data.totalComments);
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, currentUser);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex justify-center gap-4 flex-wrap mt-5">
        <div className="shadow-md max-w-max max-h-max p-2 rounded-sm">
          <div className="w-56 flex items-center justify-between">
            <div className="">
              <h1 className="uppercase text-gray-400">Total Users</h1>
              <span className="text-2xl">{totalUsers}</span>
            </div>
            <HiOutlineUserGroup className="bg-teal-500 rounded-full text-4xl p-2" />
          </div>
          <div className="flex items-center text-gray-400 mt-2">
            <HiArrowUp className="text-cyan-500" />
            <span className="text-cyan-500">{lastMonthUsers}</span>
            &nbsp;&nbsp;
            <span className="text-sm text-gray-500">Last month</span>
          </div>
        </div>
        <div className="shadow-md max-w-max max-h-max p-2 rounded-sm">
          <div className="w-56 flex items-center justify-between">
            <div className="">
              <h1 className="uppercase text-gray-400">Total Comments</h1>
              <span className="text-2xl">{totalComments}</span>
            </div>
            <HiAnnotation className="bg-blue-500 rounded-full text-4xl p-2" />
          </div>
          <div className="flex items-center text-gray-400 mt-2">
            <HiArrowUp className="text-cyan-500" />
            <span className="text-cyan-500">{lastMonthComments}</span>
            &nbsp;&nbsp;
            <span className="text-sm text-gray-500">Last month</span>
          </div>
        </div>
        <div className="shadow-md max-w-max max-h-max p-2 rounded-sm">
          <div className="w-56 flex items-center justify-between">
            <div className="">
              <h1 className="uppercase text-gray-400">Total Posts</h1>
              <span className="text-2xl">{totalPosts}</span>
            </div>
            <HiDocumentText className="bg-green-500 rounded-full text-4xl p-2" />
          </div>
          <div className="flex items-center text-gray-400 mt-2">
            <HiArrowUp className="text-cyan-500" />
            <span className="text-cyan-500">{lastMonthPosts}</span>
            &nbsp;&nbsp;
            <span className="text-sm text-gray-500">Last month</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 justify-center my-7 md:ml-7">
        <div className="shadow-md max-w-md p-4 rounded-md">
          <div className="flex justify-between items-center">
            <h2 className="text-gray-600 dark:text-gray-300">Recent users</h2>
            <Link to={"/dashboard?tab=users"}>
              <Button gradientDuoTone="purpleToPink" outline>
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
              {users.map((user) => (
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
              ))}
            </Table.Body>
          </Table>
        </div>
        <div className="shadow-md max-w-md p-4 rounded-md">
          <div className="flex justify-between items-center">
            <h2 className="text-gray-600 dark:text-gray-300">
              Recent comments
            </h2>
            <Link to={"/dashboard?tab=comments"}>
              <Button gradientDuoTone="purpleToPink" outline>
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
              {comments.map((comment) => (
                <Table.Row key={comment._id}>
                  <Table.Cell className="line-clamp-2">
                    {comment.content}
                  </Table.Cell>
                  <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <div className="shadow-md max-w-xl p-4 rounded-md">
          <div className="flex justify-between items-center">
            <h2 className="text-gray-600 dark:text-gray-300">Recent posts</h2>
            <Link to={"/dashboard?tab=posts"}>
              <Button gradientDuoTone="purpleToPink" outline>
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
              {posts.map((post) => (
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
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}
