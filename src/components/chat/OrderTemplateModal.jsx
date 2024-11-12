import { Button, Col, Modal, ModalBody, Row } from "reactstrap";
import { dummyOrderTemplates } from "../../dummyData";
import OrderNowCard from "../cards/OrderNowCard";
import { RxCross2 } from "react-icons/rx";

const OrderTemplateModal = ({ isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} size="xl" toggle={toggle} centered>
      <ModalBody>
        <div className="d-flex align-items-center justify-content-between p-2">
          <h5 className="color-7777">Select from Templates</h5>
          <Button
            onClick={() => toggle()}
            className="border-none color-7777 bg-transparent "
          >
            <RxCross2 size={20}/>
          </Button>
        </div>
        <Row className="mt-3 g-2 g-md-1">
          {dummyOrderTemplates?.map((item, key) => (
            <Col md={6} xl={4} onClick={() => toggle()}>
              <OrderNowCard details={item} key={key} />
            </Col>
          ))}
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default OrderTemplateModal;
