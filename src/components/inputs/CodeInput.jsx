import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Input } from "reactstrap";

const CodeInput = ({
  totalDigits,
  value,
  setValue,
  maxNumberPerCell,
  onError,
}) => {
  const [currentDigitsValue, setCurrentDigitsValue] = useState([]);
  const inputRefs = useRef([]);

  const handleChangeValue = (newValue, index) => {
    if (newValue <= maxNumberPerCell) {
      let array = [...currentDigitsValue];
      array[index] = newValue;
      setValue(array?.join("-"));
      // Focus the next input if the current one is filled
      if (
        newValue.toString().length === maxNumberPerCell.toString().length &&
        index < totalDigits - 1
      ) {
        let nextInput = document.getElementById(
          `digit-input-index-${index + 1}`
        );
        if (nextInput) {
          nextInput?.focus();
        }
      }
    } else {
      if (onError) onError();
      toast.error(
        `Only values between 0 and ${maxNumberPerCell + 1} are allowed `
      );
    }
  };

  useEffect(() => {
    let firstValue = [];
    if (value !== "") {
      let array = value?.split("-");
      setCurrentDigitsValue(array);
    } else {
      for (let i = 0; i < totalDigits; i++) {
        firstValue.push("");
      }
      setCurrentDigitsValue(firstValue);
    }
  }, [value]);

  return (
    <div className="d-flex align-items-center justify-content-center ">
      {currentDigitsValue?.map((digitValue, index) => (
        <Input
          style={{ marginLeft: "5px", marginRight: "5px" }}
          key={index}
          className="digit-input"
          max={maxNumberPerCell}
          id={`digit-input-index-${index}`}
          placeholder="0"
          value={digitValue !== "" ? Number(digitValue) : ""}
          onChange={(e) =>
            handleChangeValue(Number(e?.target?.value)?.toPrecision(1), index)
          }
          ref={(el) => (inputRefs.current[index] = el)}
          type="number"
        />
      ))}
    </div>
  );
};

export default CodeInput;
