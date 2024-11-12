import { useRef, useState, useEffect } from "react";
import { languageList } from "../../dummyData";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Input,
} from "reactstrap";
import { FaCaretRight } from "react-icons/fa";
import Flag from "react-world-flags";

const LanguageSelectInput = ({ value, setValue, placeholder }) => {
  const languageOptions = useRef(languageList);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(
    languageOptions.current
  );

  useEffect(() => {
    const filterOptions = () => {
      if (searchTerm) {
        const lowercasedTerm = searchTerm.toLowerCase();
        const filtered = languageOptions.current.filter((item) =>
          item.name.toLowerCase().includes(lowercasedTerm)
        );
        setFilteredOptions([filtered[0]]);
      } else {
        setFilteredOptions(languageOptions.current);
      }
    };

    filterOptions();
  }, [searchTerm]);

  const formatValue = () => {
    if (value !== "") {
      let selected = languageOptions.current.find((c) => c.name === value);
      return (
        <div className="d-flex align-items-center full-width gap-2">
          <small className="f-5 color-7777">{selected?.name}</small>
          <Flag
            code={selected?.countryCode}
            height={40}
            width={40}
            className="object-fit-cover"
            style={{ borderRadius: "50%" }}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <UncontrolledDropdown direction="right">
      <DropdownToggle className="normal-input border-none br-0 f-4 full-width py-2 px-0 d-flex align-items-center justify-content-between">
        <div className="mx-3">{placeholder}</div>
        <div className="d-flex justify-content-start mx-1 align-items-center">
          {formatValue()}
          <FaCaretRight size={20} />
        </div>
      </DropdownToggle>
      <DropdownMenu>
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="normal-input bg-transparent br-0"
        />
        <div
          style={{ height: "300px", overflowX: "hidden", overflowY: "scroll" }}
        >
          {filteredOptions.map((item, key) => (
            <DropdownItem key={key} onClick={() => setValue(item?.name)}>
              <div className="d-flex align-items-center full-width gap-2">
                <Flag
                  code={item?.countryCode}
                  height={40}
                  width={40}
                  className="object-fit-cover"
                  style={{ borderRadius: "50%" }}
                />
                <small className="f-5">{item?.name}</small>
              </div>
            </DropdownItem>
          ))}
        </div>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default LanguageSelectInput;
