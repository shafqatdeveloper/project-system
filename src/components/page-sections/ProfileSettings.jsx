import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Input, Button, Modal, ModalBody } from "reactstrap";
import VideoUploadInput from "../inputs/VideoUploadInput";
import axiosInstance from "../../services/userServices";
import { toast } from "react-toastify";

const ProfileSettings = forwardRef(({ setIsLoading }, ref) => {
  const [profileSettings, setProfileSettings] = useState({
    title: "",
    content: "",
    videoUrl: null,
  });
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [inputType, setInputType] = useState("upload");
  const [manualVideoUrl, setManualVideoUrl] = useState("");

  const [updatedFields, setUpdatedFields] = useState({
    title: false,
    content: false,
  });

  const fetchProfileData = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axiosInstance.get(`/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setProfileSettings({
          title: response?.data?.title,
          content: response?.data?.content,
          videoUrl: response?.data?.vedioUrl,
        });
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    }
  };
  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleInputChange = (field, value) => {
    setProfileSettings((prev) => ({ ...prev, [field]: value }));
    setUpdatedFields((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleVideoChange = (file) => {
    setSelectedVideo(file);
  };

  const handleVideoUrlSubmit = () => {
    if (manualVideoUrl.trim() !== "") {
      setSelectedVideo(null);
      setProfileSettings((prev) => ({ ...prev, videoUrl: manualVideoUrl }));
      setVideoModalOpen(false);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
    setIsLoading(true);
    if (selectedVideo) {
      const form = new FormData();
      form.append("file", selectedVideo);
      try {
        const response = await axiosInstance.post(
          `/api/profile/intro/video`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success("Video uploaded successfully.");
          setSelectedVideo(null);
        }
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error.message ||
          "An unexpected error occurred. Please try again.";
        toast.error(errorMessage);
      }
    }
    if (manualVideoUrl) {
      try {
        const response = await axiosInstance.post(
          `/api/profile/intro/videourl`,
          { videoUrl: manualVideoUrl },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success("Video uploaded successfully.");
          setManualVideoUrl(null);
        }
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error.message ||
          "An unexpected error occurred. Please try again.";
        toast.error(errorMessage);
      }
    }

    if (updatedFields.title) {
      try {
        const response = await axiosInstance.post(
          `/api/profile/intro/title`,
          { title: profileSettings.title },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success("Title Updated Successfully.");
          setUpdatedFields({
            title: false,
            content: false,
          });
        }
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error.message ||
          "An unexpected error occurred. Please try again.";
        toast.error(errorMessage);
      }
    }
    if (updatedFields.content) {
      try {
        const response = await axiosInstance.post(
          `/api/profile/intro/content`,
          { content: profileSettings.content },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success("Content Updated Successfully.");
          setUpdatedFields({
            title: false,
            content: false,
          });
        }
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error.message ||
          "An unexpected error occurred. Please try again.";
        toast.error(errorMessage);
      }
    }
    if (
      !selectedVideo &&
      !manualVideoUrl &&
      !updatedFields.title &&
      !updatedFields.content
    ) {
      toast.error("No Change Detected");
    }
    fetchProfileData();
    setIsLoading(false);
  };

  useImperativeHandle(ref, () => ({
    save: handleSave,
  }));

  const closeModal = () => {
    setVideoModalOpen(false);
  };

  const extractYouTubeID = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  };

  return (
    <div>
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {selectedVideo ? (
          <video
            controls
            src={URL.createObjectURL(selectedVideo)}
            style={{
              width: "90%",
              maxWidth: "400px",
              height: "300px",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
            onError={() => console.error("Error loading video.")}
          >
            Your browser does not support the video tag.
          </video>
        ) : profileSettings.videoUrl ? (
          profileSettings.videoUrl.includes("youtube.com") ||
          profileSettings.videoUrl.includes("youtu.be") ? (
            <iframe
              width="90%"
              height="315"
              src={`https://www.youtube.com/embed/${extractYouTubeID(
                profileSettings.videoUrl
              )}`}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                maxWidth: "800px",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            ></iframe>
          ) : (
            <video
              controls
              src={profileSettings.videoUrl}
              style={{
                width: "90%",
                maxWidth: "400px",
                height: "auto",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
              onError={() => console.error("Error loading video.")}
            >
              Your browser does not support the video tag.
            </video>
          )
        ) : null}
        <Button
          onClick={() => setVideoModalOpen(true)}
          className="bg-transparent f-4"
          style={{
            border: "1px dashed #a9a9a9",
            padding: "10px 20px",
            borderRadius: "10px",
            color: "#a9a9a9",
          }}
        >
          {selectedVideo || profileSettings.videoUrl
            ? "Change Video"
            : "Add Video"}
        </Button>
      </div>
      {/* Video Modal */}
      <Modal centered toggle={closeModal} isOpen={videoModalOpen}>
        <ModalBody>
          <h5 className="mb-3 text-center">Add a Video</h5>
          <div className="d-flex justify-content-center mb-4">
            <Button
              onClick={() => setInputType("upload")}
              style={{
                marginRight: "10px",
                backgroundColor:
                  inputType === "upload" ? "#00c8c8" : "transparent",
                color: inputType === "upload" ? "black" : "#a9a9a9",
                border: "1px solid #00c8c8",
              }}
            >
              Upload Video
            </Button>
            <Button
              onClick={() => setInputType("url")}
              style={{
                backgroundColor:
                  inputType === "url" ? "#00c8c8" : "transparent",
                color: inputType === "url" ? "black" : "#a9a9a9",
                border: "1px solid #00c8c8",
              }}
            >
              Paste URL
            </Button>
          </div>

          {inputType === "upload" ? (
            <VideoUploadInput
              id={"intro-video"}
              setValue={handleVideoChange}
              closeModal={closeModal}
            />
          ) : (
            <div>
              <Input
                value={manualVideoUrl}
                onChange={(e) => setManualVideoUrl(e.target.value)}
                placeholder="Paste a video URL (e.g., YouTube)"
                style={{ marginBottom: "10px" }}
              />
              <Button
                onClick={handleVideoUrlSubmit}
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#00c8c8",
                  color: "black",
                  width: "100%",
                }}
              >
                Submit URL
              </Button>
            </div>
          )}
          <Button
            onClick={closeModal}
            style={{
              marginTop: "10px",
              borderRadius: "10px",
              backgroundColor: "transparent",
              color: "#a9a9a9",
              border: "1px solid #a9a9a9",
              width: "100%",
            }}
          >
            Cancel
          </Button>
        </ModalBody>
      </Modal>

      <div>
        <Input
          value={profileSettings?.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          size={"lg"}
          style={{ color: "#a9a9a9" }}
          type="text"
          className="bg-transparent border-none p-0 "
        />
        <Input
          value={profileSettings?.content}
          onChange={(e) => handleInputChange("content", e.target.value)}
          style={{ color: "#a9a9a9", height: "auto" }}
          type="textarea"
          className="bg-transparent border-none mb-2 p-0 "
        />
      </div>
    </div>
  );
});

export default ProfileSettings;
