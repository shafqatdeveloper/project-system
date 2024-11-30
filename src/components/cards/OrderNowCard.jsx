import { Button, Card, CardBody, CardFooter, Input } from "reactstrap";
import dummProfileImg from "../../assets/dummy-avatar.png";
import { FaRegEdit } from "react-icons/fa";
import { AddImageIcon, EditIcon } from "../../assets/designPickedIcons";
import { useRef, useState } from "react";
import logoIcon from "../../assets/logo.png";
import { FaRegHeart } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const OrderNowCard = ({ details, isEditable }) => {
  const uniqueId = useRef(`order-now-img-${Math.floor(Math.random() * 10000)}`);
  const [currentDetails, setCurrentDetails] = useState({ ...details });

  const [isEditing, setisEditing] = useState(false);

  return (
    <Card className="order-now-card position-relative p-0 overflow-hidden">
      <div
        style={{ padding: 4 }}
        className="d-flex align-items-center justify-content-between position-absolute full-width top-0 left-0 "
      >
        <img
          src={dummProfileImg}
          height={30}
          width={30}
          className="object-fit-cover full-rounded"
        />
        {isEditable ? (
          <EditIcon
            onClick={() => setisEditing((prev) => !prev)}
            size={30}
            color={isEditing ? "#00c8c8" : "#777777"}
            className="hover-color-cyan cursor-pointer "
          />
        ) : (
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fill-rule="evenodd">
              <path d="M0 0h30v30H0z" />
              <path
                d="M16.457 8.863a5.037 5.037 0 0 1 4.97-.592A4.217 4.217 0 0 1 24 12.156v.86a7.066 7.066 0 0 1-3.146 5.88L15 22.798l-5.854-3.902A7.066 7.066 0 0 1 6 13.016v-.86a4.217 4.217 0 0 1 2.572-3.885 5.037 5.037 0 0 1 4.97.592L15 9.946z"
                stroke="#3D3D3D"
                stroke-width="2"
              />
            </g>
          </svg>
        )}
      </div>
      <CardBody
        style={{ height: "240px" }}
        className="d-flex align-items-center justify-content-center p-0"
      >
        {isEditing ? (
          <>
            <label htmlFor={uniqueId.current}>
              {!currentDetails?.image ? (
                <AddImageIcon height={156} width={144} />
              ) : (
                <div className="poistion-relative d-flex align-items-center justify-content-center">
                  <img
                    src={
                      typeof currentDetails?.image === "object"
                        ? URL.createObjectURL(currentDetails?.image)
                        : currentDetails?.image
                    }
                    height={240}
                    className="full-width object-fit-cover"
                  />
                  <Button
                    onClick={(e) => {
                      e?.stopPropagation();
                      setCurrentDetails((prev) => ({
                        ...prev,
                        image: undefined,
                      }));
                    }}
                    style={{
                      borderRadius: "50%",
                      padding: "10px",
                      height: 35,
                      width: 35,
                    }}
                    className="grey-btn-4 border-none position-absolute d-flex align-items-center justify-content-center"
                  >
                    <RxCross2 size={25} />
                  </Button>
                </div>
              )}
            </label>
            <input
              onChange={(e) =>
                setCurrentDetails((prev) => ({
                  ...prev,
                  image: e?.target?.files[0],
                }))
              }
              type="file"
              className="d-none"
              id={uniqueId.current}
            />
          </>
        ) : currentDetails?.image !== "" &&
          currentDetails?.image !== undefined ? (
          <img
            src={
              typeof currentDetails?.image === "object"
                ? URL.createObjectURL(currentDetails?.image)
                : currentDetails?.image
            }
            height={240}
            className="full-width object-fit-cover"
          />
        ) : (
          <img
            src={logoIcon}
            height={156}
            width={144}
            className="object-fit-contain"
          />
        )}
      </CardBody>
      <CardFooter
        tag={"h5"}
        style={{ minHeight: "50px", borderRadius: "0 0 15px 15px" }}
        className="bg-gradient-orange d-flex align-items-center justify-content-center m-0 text-center f-5"
      >
        {isEditing ? (
          <Input
            onChange={(e) =>
              setCurrentDetails((prev) => ({
                ...prev,
                title: e?.target?.value,
              }))
            }
            size="md"
            type="text"
            className="bg-transparent p-0 border-none text-center"
            value={currentDetails?.name}
          />
        ) : (
          currentDetails?.name
        )}
      </CardFooter>
    </Card>
  );
};

export default OrderNowCard;
