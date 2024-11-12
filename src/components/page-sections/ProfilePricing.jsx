import { useState } from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { dummyProfilePricing } from "../../dummyData";
import PricingCard from "../cards/PricingCard";
import { IoIosAddCircle, IoIosAddCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

const ProfilePricing = () => {
  const [currentPricings, setCurrentPricings] = useState(
    dummyProfilePricing?.map((i, key) => ({ ...i, id: key }))
  );
  const [availableLists, setAvailabeLists] = useState(["My Favourities"]);
  const [newListName, setNewListName] = useState("");

  const handleDetailsChange = (newDetails, index) => {};
  const handleAddToFavourity = (item) => {
    let array = [...currentPricings];
    let index = array?.findIndex((i) => i?.id === item?.id);
    array[index].isFavourite = !array[index].isFavourite;
    setCurrentPricings(array);
  };
  const handleNewListCreate = () => {
    if (newListName !== "") {
      setAvailabeLists([newListName, ...availableLists]);
    } else toast.error("List name cannot be empty");
  };

  return (
    <Row className="g-2 " style={{marginTop:'10px'}}>
      {currentPricings?.map((item, key) => (
        <Col key={key} md={6} lg={4} xl={currentPricings?.length <= 2 ? 4 : 3}>
          <PricingCard
            isEditable={true}
            handleAddToFavourity={handleAddToFavourity}
            availableLists={availableLists}
            handleNewListCreate={handleNewListCreate}
            details={item}
            newListName={newListName}
            setNewListName={setNewListName}
            onDetailsChange={handleDetailsChange}
          />
        </Col>
      ))}
      <Col md={6} lg={4} xl={currentPricings?.length <= 2 ? 4 : 3}>
        <Button className="btn-grey bg-transparent border-none p-0 full-width">
          <Card
            className="pricing-card cursor-pointer d-flex gap-2 align-items-center justify-content-center flex-column"
            onClick={() =>
              setCurrentPricings((prev) => [
                ...prev,
                {
                  title: "Write here",
                  subtitle: "Write here",
                  price: 0,
                  points: [{ isChecked: false, text: "Write here" }],
                },
              ])
            }
          >
            <IoIosAddCircleOutline size={50} className="color-7777" />
            <small className="color-7777">Create Pricing</small>
          </Card>
        </Button>
      </Col>
    </Row>
  );
};

export default ProfilePricing;
