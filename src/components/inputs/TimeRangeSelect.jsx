import { useRef, useState } from "react";
import { Col, Row } from "reactstrap";
import { dummyTimeLists } from "../../dummyData";

const TimeRangeSelect = ({ value, setValue, className }) => {
  const allAMs = useRef(dummyTimeLists.ams);
  const allPMs = useRef(dummyTimeLists.pms);

  const [timesSelected, setTimesSelected] = useState([
    allAMs.current[0],
    allPMs?.current[1],
  ]);

  const handleRangeClick = (item) => {
    let array = [...timesSelected];
    let rangeIndex = array?.findIndex((i) => i === item);
    if (rangeIndex > -1) {
      array[rangeIndex] = undefined;
      setTimesSelected(array?.filter((i) => i !== undefined));
    } else setTimesSelected([...array, item]);
  };

  return (
    <div className={`${className} `}>
      <Row>
        <Col md={6}>
          <h6 className="color-5555 f-5 text-center">AM</h6>
        </Col>
        <Col md={6}>
          <h6 className="color-5555 f-5 text-center">PM</h6>
        </Col>
      </Row>
      <Row className="time-range-select">
        <Col md={6} className="p-0 d-flex flex-column">
          {allAMs?.current?.map((item, key) => (
            <div
              onClick={() => handleRangeClick(item)}
              key={key}
              className={`range left ${
                timesSelected?.includes(item) ? "active" : ""
              }`}
            >
              {item}
            </div>
          ))}
        </Col>
        <Col md={6} className="p-0 d-flex flex-column">
          {allPMs?.current?.map((item, key) => (
            <div
              onClick={() => handleRangeClick(item)}
              key={key}
              className={`range right ${
                timesSelected?.includes(item) ? "active" : ""
              }`}
            >
              {item}
            </div>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default TimeRangeSelect;
