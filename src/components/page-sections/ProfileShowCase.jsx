import {
  Button,
  Card,
  Col,
  Row,
  Modal,
  ModalBody,
  Input,
  Spinner,
} from "reactstrap";
import { IoAddCircleOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import OrderTemplateModal from "../chat/OrderTemplateModal";
import { useNavigate } from "react-router-dom";
import ShowCaseCard from "../cards/ShowCaseCard";
import axiosInstance from "../../services/userServices";

const ProfileShowCase = () => {
  const navigateTo = useNavigate();
  const [availableLists, setAvailabeLists] = useState(["My Favourities"]);
  const [currentShowCaseList, setCurrentShowCaseList] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [tempaltesModalOpen, setTemplatesModalOpen] = useState(false);
  const [newShowcaseModalOpen, setNewShowcaseModalOpen] = useState(false);
  const [newShowcaseTitle, setNewShowcaseTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleTemplatesModal = () => setTemplatesModalOpen((prev) => !prev);

  const toggleNewShowcaseModal = () => setNewShowcaseModalOpen((prev) => !prev); // Toggle modal

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

  const handleCardClick = (item, itemId) => {
    if (item?.role !== "client") {
      navigateTo(`/showcase-details/${itemId}`, {
        state: { items: item.files },
      });
    }
  };

  // Fetch My Showcases
  const fetchShowcaseList = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/api/showcase/me`);
      if (response.status === 200) {
        setCurrentShowCaseList(response.data);
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShowcaseList();
  }, []);

  // Create New Showcase
  const handleNewShowcaseCreate = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        `/api/showcase?title=${encodeURIComponent(newShowcaseTitle)}`
      );
      if (response.status === 200) {
        setNewShowcaseTitle("");
        toggleNewShowcaseModal();
        toast.success("Showcase created successfully.");
        fetchShowcaseList();
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Row className="g-2 g-md-1 " style={{ marginTop: "10px" }}>
      {isLoading ? (
        <Col
          xl={12}
          lg={4}
          md={6}
          style={{
            height: "8rem",
          }}
          className="d-flex justify-content-center align-items-center"
        >
          <Spinner animation="border" size={"xl"} color={"success"} />
        </Col>
      ) : (
        currentShowCaseList?.map((item, key) => (
          <Col xl={3} lg={4} md={6} key={key}>
            <ShowCaseCard
              availableLists={availableLists}
              handleAddToFavourity={handleAddToFavourity}
              handleNewListCreate={handleNewListCreate}
              newListName={newListName}
              item={item}
              setNewListName={setNewListName}
              toggleTemplatesModal={toggleTemplatesModal}
              handleCardClick={() => handleCardClick(item, item.sid)}
              role={item?.role}
              index={key}
            />
          </Col>
        ))
      )}

      <Col xl={3} lg={4} md={6}>
        <Button
          style={{ height: "100%" }}
          onClick={toggleNewShowcaseModal}
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

      {/* Modal for creating new showcase with title input only */}
      <Modal
        centered
        toggle={toggleNewShowcaseModal}
        isOpen={newShowcaseModalOpen}
      >
        <ModalBody>
          <h5 className="mb-3 text-center">Add a New Showcase</h5>
          <div className="d-flex justify-content-center mb-4">
            <Input
              value={newShowcaseTitle}
              onChange={(e) => setNewShowcaseTitle(e.target.value)}
              placeholder="Enter showcase title"
              style={{ marginBottom: "10px", width: "100%" }}
            />
          </div>

          <Button
            onClick={handleNewShowcaseCreate}
            style={{
              borderRadius: "10px",
              backgroundColor: "#00c8c8",
              color: "black",
              width: "100%",
            }}
          >
            {isLoading ? <Spinner size={"sm"} /> : "Create"}
          </Button>

          <Button
            onClick={toggleNewShowcaseModal}
            style={{
              marginTop: "10px",
              borderRadius: "10px",
              backgroundColor: "transparent",
              color: "#a9a9a9",
              border: "1px solid #a9a9a9",
              width: "100%",
            }}
          >
            Cancel
          </Button>
        </ModalBody>
      </Modal>

      <OrderTemplateModal
        isOpen={tempaltesModalOpen}
        toggle={() => toggleTemplatesModal()}
      />
    </Row>
  );
};

export default ProfileShowCase;
