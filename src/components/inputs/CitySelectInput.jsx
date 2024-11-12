import { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
} from "reactstrap";

const CitySelectInput = ({ options, value, setValue, placeholder }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const handleSelect = (city) => {
    setValue(city);
    setSearchTerm(city);
    setDropdownOpen(false);
  };

  useEffect(() => {
    setFilteredOptions(options);
    setSearchTerm("");
  }, [options]);

  useEffect(() => {
    const filterOptions = () => {
      if (searchTerm) {
        const lowercasedTerm = searchTerm.toLowerCase();
        const filtered = options.filter((option) =>
          option.toLowerCase().includes(lowercasedTerm)
        );
        setFilteredOptions(filtered);
      } else {
        setFilteredOptions(options);
      }
    };

    filterOptions();
  }, [searchTerm, options]);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
      <DropdownToggle className="normal-input br-0 f-4 full-width text-start border-none bg-transparent">
        {value || placeholder}
      </DropdownToggle>
      <DropdownMenu>
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a city..."
          className="normal-input  bg-transparent br-0"
        />
        <div
          style={{
            height: "300px",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          {filteredOptions.map((city, index) => (
            <DropdownItem
              key={index}
              onClick={() => {
                handleSelect(city);
                toggleDropdown();
              }}
            >
              {city}
            </DropdownItem>
          ))}
          {filteredOptions.length === 0 && (
            <DropdownItem disabled>No cities found</DropdownItem>
          )}
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default CitySelectInput;
