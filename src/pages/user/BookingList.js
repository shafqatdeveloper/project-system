import { Table } from "reactstrap";
import logo from "../../assets/logo.png";
import dummyAvatar from "../../assets/vercena.jpg";
import { dummyBookings } from "../../dummyData";
import { useState } from "react";
import { useScreenWidth } from "../../utils";

const BookingList = () => {
  const [currentBookings, setCurrentBookings] = useState(dummyBookings);
  const { isSmaller } = useScreenWidth(576);

  const renderClassName = (status) => {
    switch (status) {
      case "Starting Soon":
        return "bg-cyan text-black ";
      case "Completed":
        return "bg-grey text-white";
      case "Cancelled":
        return "bg-dark-red text-white";
      case "Upcomming":
        return "bg-orange text-black";
      
    }
  };

  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex align-items-center flex-column justify-content-center "
    >
      <div className="auth-logo-container" style={{ width: "414px" }}>
        <img src={logo} height={26} width={46} className="object-fit-contain" />
      </div>
      <div
        className="full-width px-xl-5 px-lg-4"
        style={{ height: "70vh", overflowY: "scroll", overflowX: "hidden" }}
      >
        {!isSmaller ? (
          <Table responsive className="bg-transparent">
            <thead>
              <tr>
                <th className="color-7777 f-4">Communication Summary</th>
                <th className="color-7777 f-4">Booking Time</th>
                <th className="color-7777 f-4">Project Scale</th>
                <th className="color-7777 f-4">Budget Range</th>
                <th className="color-7777 f-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {dummyBookings?.map((item, key) => (
                <tr
                  key={key}
                  className={`${
                    item?.isRead && item?.status !== "Cancelled"
                      ? "normal"
                      : item?.status === "Cancelled"
                      ? "bg-dark-red"
                      : "un-read"
                  }`}
                >
                  <th>
                    <div className="d-flex align-items-center gap-1">
                      <img
                        src={dummyAvatar}
                        height={50}
                        width={50}
                        className="full-rounded object-fit-cover"
                      />
                      <div>
                        <p className="m-0 f-4 text-start text-white">
                          {item?.type}
                        </p>
                        <small className="f-4  color-cccc">
                          {item?.communicationSummary}
                        </small>
                      </div>
                    </div>
                  </th>
                  <th>
                    <div>
                      <p className="f-4 m-0  color-cccc">{item?.date}</p>
                      <small className="f-4 d-block color-cccc">
                        {item?.time}
                      </small>
                    </div>
                  </th>
                  <th>
                    <div>
                      <p className="f-4 text-white m-0 text-center">
                        {item?.projectScale}
                      </p>
                      <small className="color-cccc f-4 text-center d-block">
                        {item?.scaleUnit}
                      </small>
                    </div>
                  </th>
                  <th>
                    <p className="color-ffcc m-0 f-4">{item?.budgetRange}</p>
                  </th>
                  <th>
                    <div className="d-flex justify-content-center">
                      <div
                        style={{
                          height: "50px",
                          width: "146px",
                          borderRadius: "10px",
                        }}
                        className={`f-4 ${renderClassName(
                          item?.status
                        )} d-flex align-items-center justify-content-center`}
                      >
                        {item?.status}
                      </div>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="p-1 my-2">
            {currentBookings?.map((item, key) => (
              <div
                key={key}
                style={{ borderRadius: "30px" }}
                className={`p-2 flex-wrap d-flex align-items-center justify-content-between ${
                  item?.isRead ? "normal" : "un-read"
                }`}
              >
                <div className="d-flex gap-2 align-items-center">
                  <img
                    src={dummyAvatar}
                    height={50}
                    width={50}
                    className="object-fit-cover full-rounded"
                  />
                  <div>
                    <h6 className="f-4 m-0">{item?.type}</h6>
                    <p className="color-cccc f-4 m-0">{item?.date}</p>
                  </div>
                </div>
                <div
                  style={{
                    height: "50px",
                    width: "146px",
                    borderRadius: "10px",
                  }}
                  className={`f-4 ${renderClassName(
                    item?.status
                  )} d-flex align-items-center justify-content-center`}
                >
                  {item?.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingList;
