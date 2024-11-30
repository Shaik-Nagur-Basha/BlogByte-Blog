import {
  Alert,
  Button,
  FileInput,
  FloatingLabel,
  Select,
  ToggleSwitch,
} from "flowbite-react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import JoditEditor from "jodit-react";

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const { postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [editorTheme, setEditorTheme] = useState(true);

  const editor = useRef(null);
  const config = useMemo(
    () => ({
      theme: editorTheme ? "light" : "dark",
      height: 200,
      minHeight: "21rem",
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: "Start typings...",
    }),
    [editorTheme]
  );

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        // console.log(data);
        if (!res.ok) {
          // console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      };
      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  const handleImageUpload = async () => {
    try {
      if (!file) {
        return setImageFileUploadError("Please select the image");
      }
      setImageFileUploadProgress(null);
      setImageFileUploadError(null);
      const storage = getStorage(app);
      const filename = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress(progress.toFixed(0));
          // setImageFileUploadProgress((progress.toFixed(0) * 0.92).toFixed(0));
        },
        (error) => {
          setImageFileUploadError(
            "Could not upload image (File must be less than 2MB"
          );
          setImageFileUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImageFileUploadProgress(null);
            // setImageFileUploadProgress(100);
            setImageFileUploadError(null);
            setFormData({ ...formData, image: downloadUrl });
          });
        }
      );
    } catch (error) {
      setImageFileUploadError("Image upload failed");
      setImageFileUploadProgress(null);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(formData);
      setPublishError(null);
      const res = await fetch(`/api/post/update/${postId}/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);

      if (!res.ok) {
        return setPublishError(data.message);
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto my-20">
      <h1 className="text-center text-3xl my-7 font-semibold">Update post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <div className="flex-1">
            <FloatingLabel
              variant="filled"
              label="Post Title"
              type="text"
              // placeholder="Title"
              id="title"
              required
              className="h-min"
              // disabled={imageFileUploadProgress && imageFileUploadProgress < 100}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              value={formData.title}
            />
          </div>
          <Select
            className="shadow-sm shadow-black dark:shadow-white rounded-lg mb-2"
            // disabled={imageFileUploadProgress && imageFileUploadProgress < 100}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}
            style={{
              height: "100%",
              cursor: "pointer",
            }}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="mongodb">MongoDB</option>
            <option value="express">Express</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="shadow-sm shadow-black dark:shadow-white rounded-lg"
          />

          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleImageUpload}
            disabled={imageFileUploadProgress}
            className="shadow-sm shadow-black dark:shadow-white"
          >
            {/* {imageFileUploadProgress && imageFileUploadProgress < 100 ? <></>:<></>} */}
            {imageFileUploadProgress ? (
              <div className="h-14 w-14">
                <CircularProgressbar
                  className="success"
                  value={imageFileUploadProgress || 0}
                  text={`${imageFileUploadProgress}%`}
                  styles={{
                    path: {
                      stroke: `rgba(26, 223, 26, ${
                        imageFileUploadProgress / 150
                      })`,
                    },
                    text: {
                      fill: "rgb(26, 223, 26)",
                    },
                  }}
                />
              </div>
            ) : (
              "Upload image"
            )}
          </Button>
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        {formData.image && (
          <img
            src={formData.image}
            alt="uploaded image"
            className="w-full h-72 object-cover shadow-sm shadow-black dark:shadow-white rounded-md"
          />
        )}
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-center">
            <span className="text-yellow-300">In Editor Click on</span>
            &nbsp;&nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-7 h-7 mx-2 p-1 dark:bg-red-400"
            >
              <path
                strokeWidth="0"
                d="M22,20.6L3.4,2H8V0H0v8h2V3.4L20.6,22H16v2h8v-8h-2V20.6z M16,0v2h4.7l-6.3,6.3l1.4,1.4L22,3.5V8h2V0H16z M8.3,14.3L2,20.6V16H0v8h8v-2H3.5l6.3-6.3L8.3,14.3z"
              />
            </svg>
            <span className="text-red-600 dark:text-red-300">
              For Full Size Editor
            </span>
            &nbsp;&nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1792 1792"
              className="w-7 h-7 mx-2 p-1 dark:bg-red-400 text-white"
            >
              <path d="M1664 960q-152-236-381-353 61 104 61 225 0 185-131.5 316.5t-316.5 131.5-316.5-131.5-131.5-316.5q0-121 61-225-229 117-381 353 133 205 333.5 326.5t434.5 121.5 434.5-121.5 333.5-326.5zm-720-384q0-20-14-34t-34-14q-125 0-214.5 89.5t-89.5 214.5q0 20 14 34t34 14 34-14 14-34q0-86 61-147t147-61q20 0 34-14t14-34zm848 384q0 34-20 69-140 230-376.5 368.5t-499.5 138.5-499.5-139-376.5-368q-20-35-20-69t20-69q140-229 376.5-368t499.5-139 499.5 139 376.5 368q20 35 20 69z" />{" "}
            </svg>
            <span className="text-red-600 dark:text-red-300">
              For Content Preview
            </span>
          </div>
          <ToggleSwitch
            checked={editorTheme}
            label="Change Editor Theme"
            onChange={setEditorTheme}
          />
        </div>
        <JoditEditor
          ref={editor}
          value={formData.content}
          config={config}
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToPink"
          className="shadow-sm shadow-black dark:shadow-white"
        >
          Update post
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
