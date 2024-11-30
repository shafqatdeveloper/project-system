import React, { useRef, useState } from "react";
import { Button, Card, Input } from "reactstrap";
import AddToFavourities from "../inputs/AddToFavourities";
import { EditIcon } from "../../assets/designPickedIcons";
import { IoAddCircleOutline } from "react-icons/io5";
import dummyShowCase from "../../assets/dummy-showcase.jpg";
import dummyLogoImg from "../../assets/this-user.png";
import { Link } from "react-router-dom";
// import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import StandardSlider from "../sliders/StandardSlider";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";

const ShowCaseCard = ({
  toggleTemplatesModal,
  availableLists,
  handleAddToFavourity,
  handleNewListCreate,
  newListName,
  setNewListName,
  item,
  role,
  handleCardClick,
  index,
}) => {
  const [isinEditMode, setIsinEditMode] = useState(false);
  const scrollableRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [items, setItems] = useState(item?.files);
  const [title, setTitle] = useState(item?.title);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  console.log(items);

  return (
    <Card className="top-pick-card   d-flex flex-column justify-content-between ">
      <div
        style={{ padding: 4, position: "absolute", top: 0, zIndex: 3 }}
        className="d-flex align-items-center full-width justify-content-between"
      >
        <img
          src={dummyLogoImg}
          height={30}
          width={30}
          className="full-rounded"
        />
        {isinEditMode ? (
          <div className="d-flex align-items-center gap-2 ">
            <p className="f-5 m-0 text-white">{activeIndex + 1}</p>
            <p className="m-0 text-white f-5">/ {items?.length}</p>
          </div>
        ) : null}
        {role === "client" ? (
          <AddToFavourities
            availableLists={availableLists}
            handleAddToFavourity={handleAddToFavourity}
            handleNewListCreate={handleNewListCreate}
            newListName={newListName}
            setNewListName={setNewListName}
            item={item}
          />
        ) : (
          <EditIcon
            size={30}
            color={!isinEditMode ? "#555" : "#00C8C8"}
            onClick={() => setIsinEditMode((prev) => !prev)}
          />
        )}
      </div>
      <div
        ref={scrollableRef}
        className="overflow-hidden"
        style={{ height: 200 }}
      >
        {!isinEditMode ? (
          <div
            className="text-white cursor-pointer btn-grey"
            onClick={() => handleCardClick(item, index)}
          >
            <img
              src={dummyShowCase}
              height={200}
              style={{ borderRadius: "10px" }}
              className="full-width object-fit-contain"
            />
          </div>
        ) : (
          <StandardSlider
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            setAnimating={setAnimating}
            dontGiveSpace={true}
            items={items?.map((i, k) => (
              <>
                <Link
                  key={k}
                  className=" d-block"
                  state={item}
                  to={role === "client" ? "" : "/showcase-details/" + index}
                >
                  {i?.type === "image" ? (
                    <img
                      src={i?.url}
                      height={200}
                      style={{ borderRadius: "10px" }}
                      className="full-width object-fit-contain"
                    />
                  ) : (
                    <video
                      src={i?.src}
                      muted
                      loop
                      autoPlay
                      height={200}
                      controls
                      style={{ borderRadius: "10px" }}
                      className="full-width overflow-hidden object-fit-contain"
                    ></video>
                  )}
                </Link>
              </>
            ))}
          />
        )}
      </div>
      {isinEditMode && (
        <>
          <Button
            onClick={() => previous()}
            style={{ height: "30px", width: "30px", bottom: "80px", left: 5 }}
            className="grey-btn-3  p-0 full-rounded position-absolute "
          >
            <FaCaretLeft size={25} />
          </Button>
          <Button
            onClick={() => next()}
            style={{ height: "30px", width: "30px", bottom: "80px", right: 5 }}
            className="grey-btn-3  p-0 full-rounded position-absolute "
          >
            <FaCaretRight size={25} />
          </Button>
        </>
      )}
      <div
        style={{ position: "absolute", bottom: 0 }}
        className="border-none bg-transparent full-width p-2 d-flex justify-content-between align-items-center"
      >
        <br></br>
        <Input
          value={title}
          onChange={(e) => setTitle(e?.target?.value)}
          style={{ fontSize: ".875em" }}
          className={`d-block bg-transparent ${
            isinEditMode ? "color-cyan" : "color-half-white"
          } text-center`}
        ></Input>
        <IoAddCircleOutline
          onClick={() => toggleTemplatesModal()}
          className="cursor-pointer hover-color-cyan"
          size={30}
          color="#555555"
        />
      </div>
    </Card>
  );
};

export default ShowCaseCard;
