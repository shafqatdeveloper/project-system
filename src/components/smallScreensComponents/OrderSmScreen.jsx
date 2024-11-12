import moment from "moment";
import { Button, Modal, ModalBody } from "reactstrap";
import dummyAvatar from "../../assets/vercena.jpg";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const OrderSmScreen = ({ item }) => {
  const [transforms, setTransforms] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [clientX, setClientX] = useState(0);
  const [difference, setDifference] = useState(0);
  const isDraggable = item?.status === "Cancelled";

  const renderClassName = (status) => {
    switch (status) {
      case "Awaiting Confirmation":
        return "grey-btn-2 color-cccc ";
      case "Delivered":
        return "cyan-btn ";
      case "Quote/Accept":
        return " orange-btn-1 text-black";
      case "Cancelled":
        return "bg-dark-red color-7777";
      case "In Progress":
        return " color-green bg-transparent";
      case "Awaiting Delivery":
        return "bg-transparent color-yellow";
    }
  };

  return (
    <>
      <div
        style={{
          transform: transforms,
          minHeight: "30px",
          marginBottom: "2px",
        }}
        draggable={item?.status === "Cancelled" ? "true" : "false"}
        onTouchStart={(e) => {
          if (isDraggable) setClientX(e?.targetTouches[0]?.clientX);
        }}
        onTouchEnd={(e) => {
          setTransforms("translateX(0)");
          setDifference(0);

          if (clientX - e?.changedTouches[0]?.clientX > 100) {
            setDeleteModalOpen(true);
          }
        }}
        onTouchMove={(e) => {
          if (e?.targetTouches[0]?.clientX < clientX) {
            setTransforms(
              `translateX(-${clientX - e?.targetTouches[0]?.clientX}px)`
            );
            setDifference(clientX - e?.targetTouches[0]?.clientX);
          }
        }}
        className={` position-relative  d-flex align-items-center justify-content-between ${
          item?.isRead && item?.status !== "Cancelled"
            ? "normal-order"
            : item?.status === "Cancelled"
            ? "bg-dark-red"
            : "un-read"
        }`}
      >
        <div
          className="d-flex align-items-center p-2 full-width  "
          style={{ gap: "10px", background: "inherit" }}
        >
          <img
            src={dummyAvatar}
            height={50}
            width={50}
            className="full-rounded object-fit-cover"
          />
          <div>
            <p className="m-0 f-4 text-start text-white">{item?.type}</p>
            <small className="f-4 d-block text-start  color-cccc">
              {item?.corporation}
            </small>
          </div>
        </div>
        <div
          className="d-flex align-items-center px-1 py-2 justify-content-end "
          style={{ background: "inherit" }}
        >
          <Button
            style={{
              height: "50px",
              width: "146px",
              borderRadius: "10px",
            }}
            className={`f-5 ${renderClassName(
              item?.status
            )} d-flex align-items-center border-none justify-content-center`}
          >
            {item?.status}
          </Button>
        </div>

        {item?.status === "Cancelled" && (
          <div
            className="bg-danger position-absolute p-3 d-flex justify-content-end align-items-center"
            style={{
              right: `-${difference}px`,
              height: "100%",
              width: "100%",
              borderRadius: "30px 10px 10px 30px",
              zIndex: -2,
            }}
          >
            <RxCross2
              size={20}
              color="black"
              style={{ border: "1px solid black" }}
              className="full-rounded"
            />
          </div>
        )}
      </div>

      <Modal
        centered
        toggle={() => setDeleteModalOpen((prev) => !prev)}
        isOpen={deleteModalOpen}
      >
        <ModalBody style={{ background: "#222222", borderRadius: "10px" }}>
          <div className="p-2">
            <h5 className="mb-1 color-7777 f-5">Delete {item?.type}</h5>
            <p className="mb-5 f-4 color-7777">Delete this order ?</p>
            <div className="d-flex align-items-center justify-content-between">
              <Button
                onClick={() => setDeleteModalOpen((prev) => !prev)}
                className="red-bordered-btn"
              >
                Delete
              </Button>
              <Button
                onClick={() => setDeleteModalOpen((prev) => !prev)}
                className="grey-bordered-btn"
              >
                Cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default OrderSmScreen;
