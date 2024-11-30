import { Label } from "reactstrap";
import { IoIosAddCircleOutline } from "react-icons/io";

const VideoUploadInput = ({ value, id, setValue, closeModal }) => {
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue(file);
      closeModal();
    }
  };

  return (
    <>
      <Label
        for={id}
        style={{ minHeight: "130px", width: "100%", background: "#1d1d1d" }}
        className="d-flex cursor-pointer align-items-center justify-content-center"
      >
        <div className="color-half-white text-center">
          <IoIosAddCircleOutline className="mb-2" size={50} />
          <small className="f-4 d-block">Introduction Video</small>
        </div>
      </Label>
      <input
        type="file"
        id={id}
        accept="video/*"
        onChange={handleVideoChange}
        className="d-none"
      />
    </>
  );
};

export default VideoUploadInput;
