import { RxCross2 } from "react-icons/rx";
import { Button, Col, Modal, ModalBody, Row } from "reactstrap";
import NavigatorTab from "../navigators/NavigatorTab";
import { useRef, useState } from "react";
import Calendar from "react-calendar";
import { FaCaretRight } from "react-icons/fa";
import { FaCaretLeft } from "react-icons/fa";
import moment from "moment";
import TimeRangeSelect from "./TimeRangeSelect";
import ListSelectInput from "./ListSelectInput";
import NormalInput from "./NormalInput";
import { IoIosAddCircleOutline } from "react-icons/io";
import DropdownInput from "./DropdownInput";
import DateWriteInput from "./DateWriteInput";
import { IoIosLink } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa6";

const dummyAvailableDates = [
  moment(new Date())?.add(2, "day")?.format(`DD/MM/YYYY`),
  moment(new Date())?.add(3, "day")?.format(`DD/MM/YYYY`),
  moment(new Date())?.add(4, "day")?.format(`DD/MM/YYYY`),
];

const Booking = ({ isOpen, toggle, onBookingSuccess }) => {
  const [flowAt, setFlowAt] = useState(0);
  const [step, setCurrentStep] = useState(1);
  const [selectedDates, setSelectedDates] = useState([]);
  const [availableBookingDates, setBookingDatesSelected] = useState(
    dummyAvailableDates?.map((i) => ({ date: i, isSelected: false }))
  );
  const bookingId = useRef(
    `Booking BK-${Math.floor(Math.random() * 1000000)} `
  );
  const [bookingTypeSelected, setBookingTypeSelected] = useState();
  const [bookingDate, setBookingDate] = useState("");
  const [bookingSummary, setBookingSummary] = useState("");
  const isAvailableForBooking = (date) => {
    let bookingsDates = [...availableBookingDates];
    return bookingsDates?.find(
      (item) => item?.date === moment(date)?.format("DD/MM/YYYY")
    );
  };
  const [projectPieces, setProjectPieces] = useState("10 pcs");
  const [budgetRange, setBudgetRange] = useState("10");

  const isAvailable = (date) => {
    return [...availableBookingDates]?.find((i) => i?.date === date);
  };
  const handleAddSelectedDate = (date) => {
    setSelectedDates([...selectedDates, { date: date, isSelected: true }]);
  };

  const handleRemoveDate = (date) => {
    let array = [...availableBookingDates]?.filter(
      (item) => item?.date !== date
    );
    setBookingDatesSelected(array);
  };

  const isSelected = (date) => {
    return [...selectedDates]?.find(
      (d) => d?.date === moment(date)?.format("DD/MM/YYYY")
    );
  };

  const renderComponent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <NavigatorTab
              className={"mb-2"}
              flowAt={flowAt}
              onItemClick={(item) => setFlowAt(item?.flowAt)}
              items={[
                { title: "Taipie Time", flowAt: 0 },
                { title: "Pacific Time", flowAt: 1 },
              ]}
            />
            <Calendar
              onClickDay={(e) => {
                let date = moment(e)?.format("DD/MM/YYYY");
                handleAddSelectedDate(date);
              }}
              className={"mb-2"}
              tileClassName={({ date }) => {
                if (isSelected(date)) return "selected-date";
                else if (isAvailableForBooking(date)) {
                  return `booked-date`;
                }
              }}
              nextLabel={<FaCaretRight />}
              prevLabel={<FaCaretLeft />}
            />
            <TimeRangeSelect className={"mb-3"} />
          </>
        );
      case 2:
        return (
          <>
            <p className="color-5555 f-4 text-center">
              Please choose the type closest to your needs...
            </p>
            <ListSelectInput
              className={"mb-3"}
              items={[
                "Interior Design",
                "Painting Carpentry",
                "Plumbing",
                "FLooring and Tiling",
                "Electric Work",
              ]}
              setValue={setBookingTypeSelected}
              value={bookingTypeSelected}
            />
          </>
        );
      case 3:
        return (
          <>
            <div className="rounded-div" style={{ marginBottom: "20px" }}>
              <textarea
                value={bookingSummary}
                onChange={(e) => setBookingSummary(e?.target?.value)}
                className="bg-transparent p-3 border-none full-width color-7777"
                style={{ minHeight: "100px" }}
                placeholder="Communication summary upto 150 words"
              ></textarea>
              <div className="d-flex p-3 align-items-center justify-content-between">
                <p className="color-5555 m-0">Attach References</p>
                <label className="m-0 " htmlFor="references">
                  <IoIosAddCircleOutline
                    className="color-5555 hover-color-cyan cursor-pointer"
                    size={30}
                  />
                </label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => {}}
                  id="references"
                  className="d-none"
                />
              </div>
            </div>
            <div className="rounded-div " style={{ marginBottom: "20px" }}>
              <DropdownInput
                showLabel={true}
                acceptText={true}
                label={"Project Scale"}
                options={["10 pcs", "20 pcs ", "30 pcs", "50 pcs"]}
                value={projectPieces}
                setValue={setProjectPieces}
              />
              <DropdownInput
                showLabel={true}
                acceptText={true}
                value={budgetRange}
                setValue={setBudgetRange}
                label={"Budget Range"}
                options={["10", "20 ", "30", "50"]}
              />
            </div>
            <div style={{ marginBottom: "50px" }} className="rounded-div ">
              <DateWriteInput
                value={bookingDate}
                setValue={setBookingDate}
                label={"Delivery Date"}
                placeholder="(Optional)"
              />
            </div>
          </>
        );
      case 4:
        return (
          <>
            <div style={{ height: "112px" }} className="p-3 mb-1">
              <p className="m-0">{bookingSummary}</p>
            </div>
            <p className="color-5555 m-0 px-3">Attach References</p>
            <div className="my-3">
              <Button
                style={{ borderRadius: "10px" }}
                className="cyan-btn f-5 px-3 mb-2 full-width d-flex align-items-center justify-content-between"
              >
                <div className="d-flex align-items-center gap-1 full-width">
                  <div>
                    {" "}
                    <IoIosLink />
                  </div>
                  <p className="m-0">Link name</p>
                </div>
                <p className="m-0 full-width">https:www.google.com/</p>
                <div>
                  <FaCaretDown />
                </div>
              </Button>
              <Button
                style={{ borderRadius: "10px" }}
                className="cyan-btn px-3 f-5 full-width d-flex align-items-center justify-content-between"
              >
                <p className="m-0">filename.pdf</p>

                <div>
                  {" "}
                  <FaCaretDown />
                </div>
              </Button>
            </div>
            <Row className="px-3 px-lg-4 g-2 mb-4">
              <Col md={6}>
                <p className="color-5555 m-0">Project Scale</p>
                <small className="text-white d-block">50 Pcs</small>
              </Col>
              <Col md={6}>
                <p className="color-5555 m-0">Quantity</p>
                <small className="text-white d-block"></small>
              </Col>
              <Col md={6}>
                <p className="color-5555 m-0">Budget Range</p>
                <small className="text-white d-block">20</small>
              </Col>
              <Col md={6}>
                <p className="color-5555 m-0">USD</p>
                <small className="text-white d-block"></small>
              </Col>
              <Col md={6}>
                <p className="color-5555 m-0">Delivery Date</p>
                <small className="text-white d-block">{bookingDate}</small>
              </Col>
              <Col md={6}>
                <p className="color-5555 m-0">Type</p>
                <small className="text-white d-block">Not specified</small>
              </Col>
            </Row>
          </>
        );
    }
  };

  const renderTitle = () => {
    switch (step) {
      case 1:
        return "Booking Schedule";
      case 2:
        return "Consultation Type";
      case 3:
        return "Communication Summary";
      default:
        return bookingId?.current;
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalBody>
        <div className="d-flex mb-3 align-items-center justify-content-between">
          <h5 className="f-4 m-0 color-5555">{renderTitle()}</h5>
          <Button
            onClick={() => toggle()}
            className="grey-btn-1 p-0 full-rounded border-none"
            style={{ height: "30px", width: "30px" }}
          >
            <RxCross2 size={30} />
          </Button>
        </div>
        {renderComponent()}
        {step < 4 &&
          (step < 3 ? (
            <Button
              onClick={() => setCurrentStep((prev) => prev + 1)}
              style={{ height: "40px" }}
              className="cyan-btn-2 full-width"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={() => {
                setCurrentStep(4);
                onBookingSuccess();
              }}
              className="orange-btn-1 full-width"
              style={{ height: "40px", borderRadius: "20px" }}
            >
              Book
            </Button>
          ))}
        {step === 4 && (
          <div
            className="d-flex align-items-center flex-wrap flex-md-nowrap justify-content-center "
            style={{ gap: "20px" }}
          >
            <Button
              style={{ borderRadius: "20px", height: "40px", width: "100%" }}
              className="orange-btn-1 f-4 border-none"
              onClick={() => setCurrentStep(1)}
            >
              Change Time
            </Button>
            <Button
              style={{ borderRadius: "20px", height: "40px", width: "120px" }}
              className="bg-danger border-none f-4 text-black py-0"
              onClick={() => {
                setFlowAt(1);
                toggle();
              }}
            >
              Cancel
            </Button>
          </div>
        )}
      </ModalBody>
    </Modal>
  );
};

export default Booking;
