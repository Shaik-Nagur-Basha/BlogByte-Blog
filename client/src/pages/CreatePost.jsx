import {
  Alert,
  Button,
  FileInput,
  FloatingLabel,
  Kbd,
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
import React, { useRef, useState, useMemo } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import { BsArrowsFullscreen, BsEye } from "react-icons/bs";

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [editorTheme, setEditorTheme] = useState(true);
  const navigate = useNavigate();
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
  // console.log(formData);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(formData);
      setPublishError(null);
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
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
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
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
            />
          </div>
          <Select
            className="shadow-sm shadow-black dark:shadow-white rounded-lg mb-2"
            // disabled={imageFileUploadProgress && imageFileUploadProgress < 100}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
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
            <Kbd>
              <BsArrowsFullscreen size={"1rem"} />
            </Kbd>
            <span className="text-red-600 dark:text-red-300 ml-2">
              For Full Size Editor
            </span>
            &nbsp;&nbsp;
            <Kbd>
              <BsEye size={"1rem"} />
            </Kbd>
            <span className="text-red-600 dark:text-red-300 ml-2">
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
          config={config}
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToPink"
          className="shadow-sm shadow-black dark:shadow-white mt-5"
        >
          Publish
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
