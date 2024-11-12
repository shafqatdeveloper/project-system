import { useState } from "react";
import { IoIosCheckmarkCircleOutline, IoMdAddCircle } from "react-icons/io";
import { Button, Card, CardBody, Collapse, Input, Label } from "reactstrap";
import { FaRegEdit } from "react-icons/fa";
import { GrDocumentPdf } from "react-icons/gr";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import AddToFavourities from "../inputs/AddToFavourities";
import { EditIcon } from "../../assets/designPickedIcons";
import PriceCardsPoints from "./PriceCardsPoints";
import OrderTemplateModal from "../chat/OrderTemplateModal";

const PricingCard = ({
  details,
  onDetailsChange,
  isEditable,
  availableLists,
  handleNewListCreate,
  handleAddToFavourity,
  newListName,
  setNewListName,
}) => {
  const [currentDetails, setCurrentDetails] = useState(
    details ? { ...details } : {}
  );
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [isEditing, setisEditing] = useState(false);
  const [collapseOpen, setCollapseOpen] = useState(false);

  const handlePointChecked = (index) => {
    let array = [...currentDetails?.points];
    array[index].isChecked = !array[index].isChecked;
    setCurrentDetails((prev) => ({ ...prev, points: array }));
  };

  const handlePointTextChange = (newTitle, index) => {
    let array = [...currentDetails?.points];
    array[index].text = newTitle;
    setCurrentDetails((prev) => ({ ...prev, points: array }));
  };

  const handleRemovePoint = (index) => {
    let array = [...currentDetails?.points];
    array[index] = undefined;
    let newValues = array?.filter((v) => v !== undefined);
    setCurrentDetails((prev) => ({ ...prev, points: newValues }));
  };

  const handleAddNewPoint = () => {
    setCurrentDetails((prev) => ({
      ...prev,
      points: [...prev?.points, { text: "", isChecked: false }],
    }));
  };

  const formateValue = (value) => {
    console.log(value);
    let splits = value?.split("\n");
    let modifiedArray = [];
    splits.forEach((item, index) => {
      modifiedArray.push(item); // Add the original item
      if (index < splits.length - 1) {
        modifiedArray.push(<br></br>); // Add <br> after each item except the last one
      }
    });

    return modifiedArray;
  };

  return (
    <Card className="pricing-card position-relative">
      {isEditable ? (
        <Button
          onClick={() => setisEditing((prev) => !prev)}
          className="bg-transparent m-0 p-0 border-none hover-color-cyan position-absolute"
          style={{ right: 4, top: 4 }}
        >
          <EditIcon color={isEditing ? "#00c8c8" : "#555555"} size={30} />
        </Button>
      ) : (
        <div
          className="position-absolute  "
          style={{ right: "4px", top: "4px" }}
        >
          <AddToFavourities
            availableLists={availableLists}
            handleAddToFavourity={handleAddToFavourity}
            handleNewListCreate={handleNewListCreate}
            item={details}
            newListName={newListName}
            setNewListName={setNewListName}
          />
        </div>
      )}
      <CardBody className="d-flex align-items-center flex-column py-4 px-0">
        {
          <Input
            disabled={!isEditing}
            placeholder="Write title here"
            onChange={(e) =>
              setCurrentDetails((prev) => ({
                ...prev,
                title: e?.target?.value,
              }))
            }
            value={currentDetails?.title}
            className={`title  text-center m-0 ${
              isEditing ? "editing" : ""
            }  p-0 bg-transparent`}
          />
        }
        {
          <Input
            disabled={!isEditing}
            placeholder="Write price in dollars with symbol"
            type="text"
            onChange={(e) =>
              setCurrentDetails((prev) => ({
                ...prev,
                price: e?.target?.value,
              }))
            }
            value={currentDetails?.price}
            className={`price  text-center mt-2 mb-0 ${
              isEditing ? "editing" : ""
            }    p-0 bg-transparent`}
          />
        }
        {
          <Input
            disabled={!isEditing}
            onChange={(e) =>
              setCurrentDetails((prev) => ({
                ...prev,
                subtitle: e?.target?.value,
              }))
            }
            type="text"
            value={currentDetails?.subtitle}
            className={`subtitle  text-center m-0 ${
              isEditing ? "editing" : ""
            }  p-0 bg-transparent`}
          />
        }
        <Button
          onClick={() => (isEditing ? setTemplateModalOpen(true) : () => {})}
          className="orange-btn-1 d-flex align-items-center justify-content-center f-6"
          style={{
            gap: "18px",
            width: "90%",
            height: "60px",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          Order Now{" "}
          {isEditing && (
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 0a6 6 0 0 1 6 6v6a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6h6zm0 1H6a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h6a5 5 0 0 0 5-5V6a5 5 0 0 0-5-5zM9.53 4.47l.246.245.038.038.076.076.203.203.25.25.121.122.211.21.254.254.196.196.544.544.328.328.18.18.34.34.58.58.433.434a.75.75 0 0 1 0 1.06l-.245.246-.038.038-.076.076-.203.203-.25.25-.122.121-.21.211-.254.254-.196.196-.544.544-.328.328-.18.18-.34.34-.58.58-.434.433a.75.75 0 0 1-1.06-1.06l.83-.83.183-.183.34-.341.18-.18.328-.328.421-.42.32-.32.117-.118H4.75a.75.75 0 1 1 0-1.5h6.439l-.073-.074-.18-.18-.328-.327-.42-.421-.32-.32-.253-.253-.211-.21-.122-.122-.25-.25-.105-.105-.174-.174-.019-.019-.264-.265a.75.75 0 0 1 1.06-1.06z"
                fill="#000"
                fill-rule="nonzero"
              />
            </svg>
          )}
        </Button>
        <div style={{ width: "90%" }}>
          {currentDetails?.points?.map((item, index) => (
            <PriceCardsPoints
              handlePointChecked={handlePointChecked}
              handlePointTextChange={handlePointTextChange}
              handleRemovePoint={handleRemovePoint}
              formateValue={formateValue}
              isEditing={isEditing}
              item={item}
              index={index}
              key={index}
            />
          ))}
          {isEditing && (
            <div className="d-flex mt-4 mb-3 color-7777 align-items-center justify-content-between">
              <IoIosAddCircleOutline
                onClick={() => handleAddNewPoint()}
                className="cursor-pointer hover-color-cyan "
                size={25}
              />
              {!collapseOpen && (
                <GrDocumentPdf
                  onClick={() => setCollapseOpen((prev) => !prev)}
                  size={25}
                  className="cursor-pointer hover-color-cyan"
                />
              )}
            </div>
          )}
          <Collapse isOpen={collapseOpen}>
            <div
              className="p-2 d-flex align-items-center position-relative flex-column justify-content-center"
              style={{
                height: "100px",
                background: "#333333",
                border: "1px solid #555555",
                borderRadius: "10px",
              }}
            >
              <Button
                className="bg-transparent position-absolute top-0 border-none color-7777 "
                style={{ right: 0 }}
                onClick={() => setCollapseOpen((prev) => !prev)}
              >
                <RxCross2 size={20} />
              </Button>
              <Label
                for={`pricing-card-doc-${details?.title}`}
                className="f-5 m-0 text-center text-white"
              >
                <h4 className="m-0">PDF/Excel/Word</h4>
              </Label>
              <input
                className="d-none"
                type="file"
                id={`pricing-card-doc-${details?.title}`}
                onChange={(e) =>
                  setCurrentDetails((prev) => ({
                    ...prev,
                    document: e?.target?.files[0],
                  }))
                }
              />
            </div>
          </Collapse>
        </div>
      </CardBody>
      <OrderTemplateModal
        isOpen={templateModalOpen}
        toggle={() => setTemplateModalOpen((prev) => !prev)}
      />
    </Card>
  );
};

export default PricingCard;
