import { useEffect, useRef, useState } from "react";
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  UncontrolledDropdown,
} from "reactstrap";
import { phoneCodesList } from "./CountriesAndFlagsLists";
import NormalInput from "./NormalInput";
import Flag from "react-world-flags";
import { FaCaretDown } from "react-icons/fa";

const PhoneInput = ({ value, setValue, placeholder }) => {
  const countriesCodeRef = useRef(phoneCodesList);
  const [codeSelected, setCodeSelected] = useState(phoneCodesList[0].phoneCode);
  const [searchQuery, setSearchQuery] = useState("");

  // Format value to exclude the code part
  const formattedValue = value ? value.split("-")[1] : "";

  useEffect(() => {
    if (value) {
      const initialCode = value.split("-")[0];
      setCodeSelected(initialCode);
    }
  }, [value]);

  // Filter the countries based on the search query
  const filteredCountries = countriesCodeRef.current.filter((item) =>
    item.countryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="d-flex align-items-center bg-transparent full-width br-0 normal-input gap-2 py-2">
      <UncontrolledDropdown>
        <DropdownToggle
          style={{ height: "auto" }}
          className=" br-0 d-flex align-items-center gap-1 bg-transparent border-none px-0 py-2 f-4"
        >
          {codeSelected}
          <FaCaretDown />
        </DropdownToggle>
        <DropdownMenu>
          {/* Search Input */}
          <Input
            type="text"
            placeholder="Search country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="normal-input bg-transparent search br-0 placeholder-white "
          />
          <div
            style={{
              height: "300px",
              overflowX: "hidden",
              overflowY: "scroll",
            }}
          >
            {filteredCountries.map((item, key) => (
              <DropdownItem
                key={key}
                onClick={() => {
                  setCodeSelected(item.phoneCode);
                  setSearchQuery(""); // Clear search query on selection
                  setValue(`${item.phoneCode}-${formattedValue}`); // Update value with the new phone code
                }}
              >
                <div className="d-flex color-7777 full-width align-items-center gap-2">
                  <Flag
                    height={40}
                    width={40}
                    code={item.countryCode}
                    className="object-fit-cover full-rounded"
                  />
                  <small className="f-4">{item.countryName}</small>
                  <small className="f-4">{item.phoneCode}</small>
                </div>
              </DropdownItem>
            ))}
          </div>
        </DropdownMenu>
      </UncontrolledDropdown>
      <Input
        value={formattedValue}
        placeholder={placeholder}
        onChange={(e) => setValue(`${codeSelected}-${e.target.value}`)}
        className="bg-transparent border-none full-width p-0"
      />
    </div>
  );
};

export default PhoneInput;
