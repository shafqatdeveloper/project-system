import { useEffect, useRef, useState } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Button, Input } from "reactstrap";

const PriceCardsPoints = ({
  item,
  handlePointChecked,
  handlePointTextChange,
  handleRemovePoint,
  index,
  isEditing,
  formateValue,
}) => {
  const ref = useRef();
  const [isonNextLine, setIsOnNextLine] = useState(false);
  const editInputRef = useRef();

  const hasTwoLines = (element) => {
    const lineHeight = parseFloat(getComputedStyle(element)?.lineHeight);
    const computedHeight = parseFloat(getComputedStyle(element)?.height);
    const maxHeight = lineHeight; // Height for two lines
    return computedHeight > maxHeight;
  };

  const adjustHeight = () => {
    console.log('editInputRef',editInputRef.current?.style)
    if (editInputRef?.current?.style) {
      
      // Reset the height to 'auto' to get the correct scrollHeight
      editInputRef.current.style.height = "auto";
      // Set the height to the scrollHeight
      editInputRef.current.style.height = `${editInputRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (ref.current) {
      setIsOnNextLine(hasTwoLines(ref.current));
    }
    if (editInputRef.current) {
      adjustHeight();
    }
  }, [item, index, isEditing]);

  return (
    <div
      className={`d-flex  ${
        isonNextLine||isEditing ? "align-items-start" : "align-items-center"
      }  gap-2 `}
      style={{ marginBottom: "10px" }}
    >
      <div>
        <IoIosCheckmarkCircleOutline
          onClick={() => (isEditing ? handlePointChecked(index) : () => {})}
          size={30}
          color={item?.isChecked ? "#00c8c8" : "#555555"}
        />
      </div>

      {isEditing ? (
        <Input
          ref={editInputRef}
          type="textarea"
          style={{ wordBreak: "break-all" }}
          value={item?.text}
          onChange={(e) => handlePointTextChange(e?.target?.value, index)}
          className=" point editing text-start m-0  border-none  p-0 bg-transparent"
        />
      ) : (
        <p ref={ref} className="point m-0 full-width ">
          {formateValue(item?.text)}
        </p>
      )}
      {isEditing ? (
        <Button
          onClick={() => handleRemovePoint(index)}
          className="color-7777 p-0 bg-transparent border-none"
        >
          <RxCross2 size={20} />
        </Button>
      ) : (
        <div className="d-inline" style={{ height: 24, width: 20 }}></div>
      )}
    </div>
  );
};

export default PriceCardsPoints;
