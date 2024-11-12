import { useState } from "react";
import { Button, Card, Col, Row } from "reactstrap";
import { dummyOrderTemplates } from "../../dummyData";
import OrderNowCard from "../cards/OrderNowCard";
import { IoIosAddCircleOutline } from "react-icons/io";

const ProfileOrderNow = () => {
  const [currentTemplates, setCurrentTemplates] = useState(dummyOrderTemplates);

const handleNewTemplateCreate=()=>{
  let obj={title:'Write here '};
  setCurrentTemplates([...currentTemplates,obj])
}

  return (
    <Row className=" g-2" style={{marginTop:'10px'}}>
      {currentTemplates?.map((item, key) => (
        <Col md={6} lg={4} xl={3} key={key}>
          <OrderNowCard details={item} isEditable={true} />
        </Col>
      ))}
      <Col md={6} lg={4} xl={3}>
        <Button
         onClick={()=>handleNewTemplateCreate()}
         className="btn-grey p-0 full-width border-none bg-transparent">
          <Card  style={{height:'290px',borderRadius:'16px'}} className="order-now-card color-half-white gap-2 cursor-pointer d-flex align-items-center flex-column justify-content-center">
            <IoIosAddCircleOutline size={50} />
            <p className="m-0">Create Order Template</p>
          </Card>
        </Button>
      </Col>
    </Row>
  );
};

export default ProfileOrderNow;
