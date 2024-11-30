import { useEffect, useState } from "react";
import { Button, Container, Row } from "reactstrap";
import AddToFavourities from "../../components/inputs/AddToFavourities";
import { dummyShowCaseItems } from "../../dummyData";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";
import StandardSlider from "../../components/sliders/StandardSlider";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/userServices";

const ShowcaseDetails = () => {
  const { state, pathname } = useLocation();

  const { sId } = useParams();

  const [currentSlide, setCurrentSlide] = useState(1);
  const [isAddedToFavourite, setisAddedToFavourite] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [availableLists, setAvailabeLists] = useState(["My Favourities"]);
  const [operationType, setOperationType] = useState(null);
  const navigateTo = useNavigate();

  //slider props
  const [items, setItems] = useState(state?.items ?? []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setItems(state?.items ?? []);
  }, [pathname]);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  //

  const handleAddToFavourity = (item) => {
    setisAddedToFavourite((prev) => !prev);
  };

  const handleNewListCreate = () => {
    if (newListName !== "") {
      setAvailabeLists([newListName, ...availableLists]);
    } else toast.error("List name cannot be empty");
  };

  const handleFileUpload = async (file) => {
    if (!file) {
      toast("You choosed nothing for upload");
    } else {
      const fid = getActiveFileId();
      const formdata = new FormData();
      formdata.append("file", file);
      if (file?.type?.includes("image")) {
        toast(`Uploading image`);
        if (operationType === "add") {
          try {
            const response = await axiosInstance.post(
              `/api/showcase/${sId}`,
              formdata
            );
            if (response.status === 200) {
              toast.success("File Uploaded successfully.");
              navigateTo("/profile/settings?goTo=1");
            }
          } catch (error) {
            const errorMessage =
              error?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
          }
        } else {
          try {
            const response = await axiosInstance.post(
              `/api/showcase/filedata/${fid}/change`,
              formdata
            );
            if (response.status === 200) {
              toast.success("Image Updated successfully.");
              navigateTo("/profile/settings?goTo=1");
            }
          } catch (error) {
            const errorMessage =
              error?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
          }
        }
      } else {
        toast(`Uploading video`);
        if (operationType === "add") {
          try {
            const response = await axiosInstance.post(
              `/api/showcase/${sId}`,
              formdata
            );
            if (response.status === 200) {
              toast.success("File Uploaded successfully.");
              navigateTo("/profile/settings?goTo=1");
            }
          } catch (error) {
            const errorMessage =
              error?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
          }
        } else {
          try {
            const response = await axiosInstance.post(
              `/api/showcase/filedata/${fid}/change`,
              formdata
            );
            if (response.status === 200) {
              toast.success("Video Updated successfully.");
              navigateTo("/profile/settings?goTo=1");
            }
          } catch (error) {
            const errorMessage =
              error?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
          }
        }
      }
    }
  };

  const handleDeleteItem = () => {
    let array = [...items];
    array[activeIndex] = undefined;
    setItems(array?.filter((i) => i !== undefined));
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    } else setActiveIndex(0);
  };

  const getActiveFileId = () => {
    return items[activeIndex]?.fid;
  };

  return (
    <div
      style={{ height: "100vh", width: "100vw" }}
      className="d-flex flex-column position-relative align-items-center"
    >
      <div className="full-width">
        <div className="d-flex p-xl-4 p-md-3 p-2 full-width align-items-center justify-content-between">
          <AddToFavourities
            availableLists={availableLists}
            handleAddToFavourity={handleAddToFavourity}
            handleNewListCreate={handleNewListCreate}
            newListName={newListName}
            setNewListName={setNewListName}
            iconsSize={60}
            item={{ isFavourite: isAddedToFavourite }}
          />
          <div className="d-flex align-items-center gap-2 ">
            <h2 className="f-5 m-0 color-cccc">{currentSlide}</h2>
            <h2 style={{ color: "#626262" }} className="m-0 f-5">
              / {items?.length}
            </h2>
          </div>
          <Button
            onClick={() => navigateTo("/profile/settings?goTo=1")}
            className="grey-btn-1 p-0 full-rounded border-none"
            style={{ height: "50px", width: "50px" }}
          >
            <RxCross2 size={50} />
          </Button>
        </div>
        <Container
          style={{ marginBottom: "15px" }}
          className="py-0 d-flex align-items-center justify-content-center position-relative"
        >
          <StandardSlider
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            setAnimating={setAnimating}
            onIndexChange={(slideNumber) => setCurrentSlide(slideNumber)}
            items={items?.map((item, index) => (
              <div
                key={index}
                className="full-width d-flex align-items-center justify-content-center"
                style={{
                  background: "#252525",
                  height: "75vh",
                  borderRadius: "23px",
                }}
              >
                {item?.type === "image" ? (
                  <img
                    src={
                      typeof item?.src === "object"
                        ? URL.createObjectURL(item?.src)
                        : item?.src
                    }
                    style={{ height: "75vh" }}
                    className="full-width object-fit-cover"
                  />
                ) : (
                  <video
                    src={
                      typeof item?.src === "object"
                        ? URL.createObjectURL(item?.src)
                        : item?.src
                    }
                    style={{ height: "75vh" }}
                    className="full-width object-fit-cover"
                    controls
                    muted
                  />
                )}
              </div>
            ))}
          />
          <div
            style={{ width: "100vw" }}
            className=" position-absolute px-3 px-xl-4 d-flex align-items-center justify-content-between"
          >
            {activeIndex !== 0 ? (
              <Button
                onClick={() => previous()}
                style={{ height: "50px", width: "50px" }}
                className="grey-btn-3 p-0 full-rounded"
              >
                <FaCaretLeft size={40} />
              </Button>
            ) : (
              <div></div>
            )}
            {activeIndex !== items?.length - 1 ? (
              <Button
                onClick={() => next()}
                style={{ height: "50px", width: "50px" }}
                className="grey-btn-3 p-0 full-rounded"
              >
                <FaCaretRight size={40} />
              </Button>
            ) : (
              <div></div>
            )}
          </div>
        </Container>
      </div>
      <Container className="py-0" style={{ marginBottom: "15px" }}>
        <div className="d-flex align-items-center gap-2 justify-content-between flex-wrap ">
          <div
            className="d-flex align-items-center flex-wrap "
            style={{ gap: "50px" }}
          >
            <label
              onClick={() => setOperationType("add")}
              htmlFor="showcase-img/video"
              className="btn cyan-btn-2 f-4 m-0"
              style={{ height: "40px", width: "300px" }}
            >
              + Upload New Image/Video
            </label>
            <label
              onClick={() => setOperationType("edit")}
              htmlFor="showcase-img/video"
              className="btn orange-btn-3 m-0 f-4"
              style={{ height: "40px", width: "300px" }}
            >
              Change Image/Video
            </label>
          </div>
          <Button
            onClick={() => handleDeleteItem()}
            className="red-bordered-btn-2 f-4"
            style={{ height: "40px", width: "120px" }}
          >
            Delete
          </Button>
        </div>
      </Container>
      <input
        className="d-none"
        id="showcase-img/video"
        type="file"
        onChange={(e) => handleFileUpload(e?.target?.files[0])}
      />
    </div>
  );
};

export default ShowcaseDetails;
