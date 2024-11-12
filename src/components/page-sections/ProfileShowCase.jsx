import {
  Button,
  Card,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import { dummyShowCaseItems } from "../../dummyData";
import { IoAddCircleOutline } from "react-icons/io5";
import { useState } from "react";

import { toast } from "react-toastify";
import OrderTemplateModal from "../chat/OrderTemplateModal";
import { useNavigate, useParams } from "react-router-dom";
import ShowCaseCard from "../cards/ShowCaseCard";

const ProfileShowCase = () => {
  const navigateTo = useNavigate();
  const [availableLists, setAvailabeLists] = useState(["My Favourities"]);
  const [currentShowCaseList, setCurrentShowCaseList] =
    useState(dummyShowCaseItems);
  const [newListName, setNewListName] = useState("");
  const [tempaltesModalOpen, setTemplatesModalOpen] = useState(false);
  const toggleTemplatesModal = () => setTemplatesModalOpen((prev) => !prev);

  const handleAddToFavourity = (item) => {
    let array = [...currentShowCaseList];
    let index = array?.findIndex((i) => i?.id === item?.id);
    array[index].isFavourite = !array[index].isFavourite;
    setCurrentShowCaseList(array);
  };
  const handleNewListCreate = () => {
    if (newListName !== "") {
      setAvailabeLists([newListName, ...availableLists]);
    } else toast.error("List name cannot be empty");
  };

  const handleNewShowcaseCreate = () => {
    let obj = {
      id: currentShowCaseList?.length + 1,
      type: "JUST NEW",
      isFavourite: false,
      items:[]
    };
    setCurrentShowCaseList([...currentShowCaseList, obj]);
  };

  const handleCardClick = (item, index) => {
    if (item?.role !== "client") {
      navigateTo(`/showcase-details/${index}`, { state: item });
    }
  };

  const role = localStorage.getItem("role") ?? "provider";

  return (
    <Row className="g-2 g-md-1 " style={{marginTop:'10px'}}>
      {currentShowCaseList?.map((item, key) => (
        <Col xl={3} lg={4} md={6} key={key}>
          <ShowCaseCard
            availableLists={availableLists}
            handleAddToFavourity={handleAddToFavourity}
            handleNewListCreate={handleNewListCreate}
            newListName={newListName}
            item={item}
            setNewListName={setNewListName}
            toggleTemplatesModal={toggleTemplatesModal}
            handleCardClick={handleCardClick}
            role={item?.role}
            index={key}
          />
        </Col>
      ))}

      <Col xl={3} lg={4} md={6}>
        <Button
          style={{ height: "100%" }}
          onClick={() => handleNewShowcaseCreate()}
          className="btn-grey  border-none full-width bg-transparent p-0"
        >
          <Card
            style={{ height: "100%", borderRadius: "16px" }}
            className="top-pick-card cursor-pointer gap-1 d-flex flex-column align-items-center justify-content-center "
          >
            <IoAddCircleOutline
              data-role="add"
              size={50}
              className="color-half-white"
            />
            <small className="color-half-white ">Create Success</small>
          </Card>
        </Button>
      </Col>
      <OrderTemplateModal
        isOpen={tempaltesModalOpen}
        toggle={() => toggleTemplatesModal()}
      />
    </Row>
  );
};

export default ProfileShowCase;
