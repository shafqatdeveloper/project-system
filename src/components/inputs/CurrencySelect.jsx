import { useRef, useState, useEffect } from "react";
import { currencyLists } from "../../dummyData";
import { Country } from "country-state-city";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Input,
} from "reactstrap";
import Flag from "react-world-flags";
import { FaCaretRight } from "react-icons/fa";

const CurrencySelect = ({ value, setValue, placeholder }) => {
  const allCountries = useRef(Country.getAllCountries());
  const currencySelectOptions = useRef(
    currencyLists.map((item) => {
      let countryCode = [...allCountries.current]?.find(
        (c) => c?.name === item?.countryName
      )?.isoCode;
      return { ...item, countryCode: countryCode };
    })
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(
    currencySelectOptions.current
  );

  useEffect(() => {
    const filterOptions = () => {
      if (searchTerm) {
        const lowercasedTerm = searchTerm?.toLowerCase();
        const filtered = currencySelectOptions.current?.filter((item) =>
          item?.name?.toLowerCase()?.includes(lowercasedTerm)
        );
        setFilteredOptions(filtered);
      } else {
        setFilteredOptions(currencySelectOptions.current);
      }
    };

    filterOptions();
  }, [searchTerm]);

  const formatValue = () => {
    if (value !== "" && value !== undefined) {
      let selected = [...currencySelectOptions.current]?.find(
        (item) => item?.name === value
      );

      return (
        <div className="d-flex align-items-center gap-2">
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
    } else return;
  };

  return (
    <UncontrolledDropdown direction="right">
      <DropdownToggle className="normal-input br-0 f-4 border-none full-width px-0 py-2 d-flex align-items-center justify-content-between">
        <div className="mx-3"> {placeholder}</div>
        <div className="d-flex mx-1 align-items-center justify-content-between ">
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
          className="normal-input bg-transparent  br-0"
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

export default CurrencySelect;
