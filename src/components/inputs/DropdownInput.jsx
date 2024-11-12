import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  UncontrolledDropdown,
} from "reactstrap";
import { FaCaretRight } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa6";
import NormalInput from "./NormalInput";
import { useState } from "react";

const DropdownInput = ({
  options,
  value,
  setValue,
  menuDirection,
  placeholder,
  menuStyle,
  disabled,
  className,
  searchAble,
  acceptText,
  label,
  showLabel
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = searchTerm
    ? options.filter((option) =>
        option.toUpperCase().includes(searchTerm.toUpperCase())
      )
    : options;

  return (
    <UncontrolledDropdown direction={menuDirection}>
      <DropdownToggle
        disabled={disabled}
        className={`normal-input br-0 f-4 full-width bg-transparent d-flex px-0 border-none py-2 align-items-center justify-content-between ${className}`}
      >
        <div className="mx-3 full-width text-start">{!showLabel?value ?? placeholder:label}</div>
        {acceptText && (
          <input
          value={value}
           onChange={(e)=>setValue(e?.target?.value)}
            className="bg-transparent px-2"
            type="text"
            placeholder="Write or Select"
          />
        )}
        <div className="mx-1">
          {menuDirection === "right" ? (
            <FaCaretRight size={20} />
          ) : (
            <FaCaretDown size={20} />
          )}
        </div>
      </DropdownToggle>
      <DropdownMenu>
        <div style={menuStyle}>
          {searchAble && (
            <NormalInput
              style={{ borderRadius: 0 }}
              placeholder={"Search"}
              className={"normal-input"}
              setValue={(v) => {
                setSearchTerm(v); // Update the search term
              }}
              type={"text"}
            />
          )}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, key) => (
              <DropdownItem
                className="f-4"
                onClick={() => {
                  if (setValue) {
                    setValue(opt);
                    setSearchTerm(""); // Clear search term on selection
                  }
                }}
                key={key}
              >
                {opt}
              </DropdownItem>
            ))
          ) : (
            <DropdownItem disabled>No options found</DropdownItem>
          )}
        </div>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default DropdownInput;
