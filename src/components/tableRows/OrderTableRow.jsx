import moment from "moment";
import { Button, Modal, ModalBody } from "reactstrap";
import dummyAvatar from "../../assets/vercena.jpg";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const OrderTableRow = ({ item }) => {
  const [transforms, setTransforms] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [clientX, setClientX] = useState(0);
  const [difference, setDifference] = useState(0);

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
      <tr
        style={{ transform: transforms }}
        draggable={item?.status === "Cancelled" ? "true" : "false"}
        onDragStart={(e) => {
          e?.dataTransfer?.setDragImage(document?.createElement("div"), 0, 0);
          setClientX(e?.clientX);
        }}
        onDragEnd={(e) => {
          setTransforms("translateX(0)");
          setDifference(0);
          if (clientX - e?.clientX > 100) {
            setDeleteModalOpen(true);
          }
        }}
        onDrag={(e) => {
          if (e?.clientX < clientX) {
            setTransforms(`translateX(-${clientX - e?.clientX}px)`);
            setDifference(clientX - e?.clientX);
          }
        }}
        className={` position-relative ${
          item?.isRead && item?.status !== "Cancelled"
            ? "normal-order"
            : item?.status === "Cancelled"
            ? "bg-dark-red"
            : "un-read"
        }`}
      >
        <td>
          <div className="d-flex align-items-center " style={{ gap: "10px" }}>
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
        </td>
        <td>
          <div>
            <p className="f-4 m-0  color-cccc">
              {moment(item?.orderDate)?.format("DD/ MM / YYYY")}
            </p>
          </div>
        </td>
        <td>
          <p className="f-4 color-cccc m-0 text-center">
            {moment(item?.deliveryDate)?.format("DD/ MM / YYYY")}
          </p>
        </td>
        <td>
          <p className="color-ffcc m-0 f-4">{item?.total}</p>
        </td>
        <td>
          <div className="d-flex justify-content-center">
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
        </td>
        {item?.status === "Cancelled" && (
          <div
            className="bg-danger position-absolute p-3 d-flex justify-content-end align-items-center"
            style={{
              right: `-${difference}px`,
              height: "100%",
              width: "100%",
              borderRadius: "30px 10px 10px 30px",
              zIndex: -1,
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
      </tr>

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

export default OrderTableRow;
