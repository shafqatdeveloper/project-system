import { Button, Col, Row } from "reactstrap";

const ListSelectInput = ({ items, value, setValue,className }) => {
  return (
    <Row className={`${className} g-1`}>
      {items?.map((item, key) => (
        <Col md={6} key={key}>
          <Button
            onClick={() => setValue(item)}
            className={`list-select-item ${value === item ? "active" : ""}`}
          >
            {item}
          </Button>
        </Col>
      ))}
    </Row>
  );
};

export default ListSelectInput;
