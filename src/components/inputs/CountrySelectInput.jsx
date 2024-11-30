import CountryPackage from "country-list-with-dial-code-and-flag";
import DropdownInput from "./DropdownInput";
import { useRef, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import Flag from "react-world-flags";
import { FaCaretDown } from "react-icons/fa";
import NormalInput from "./NormalInput";

const CountrySelectInput = ({
  value,
  setValue,
  placeholder,
  style,
  className,
  adaptStyle,
  showCaret,
}) => {
  const allCountriesRef = useRef(CountryPackage.getAll());
  const [searchedResults, setSearchedResults] = useState([]);

  const handleSearch = (value) => {
    if (value !== "") {
      let array = [...allCountriesRef?.current]?.filter((c) =>
        c?.name?.toUpperCase()?.includes(value?.toUpperCase())
      );
      setSearchedResults(array);
    } else setSearchedResults([]);
  };

  const formateValue = () => {
    let country = [...allCountriesRef?.current]?.find((c) => c?.name === value);
    if (country)
      return (
        <div className="d-flex align-items-center full-width gap-2">
          <Flag
            code={country?.code}
            className="object-fit-cover"
            height={adaptStyle?.iconSize ?? 40}
            width={adaptStyle?.iconSize ?? 40}
            style={{ borderRadius: "50%" }}
          />
          <small className="f-5 text-white">
            {country?.name === "Taiwan, Province of China"
              ? "Taiwan"
              : country?.name}
          </small>
        </div>
      );
    else return "";
  };

  return (
    <>
      <UncontrolledDropdown>
        <DropdownToggle
          style={style}
          className={`  normal-input br-0  f-4 py-2 px-3 border-none full-width ${className} d-flex justify-content-between align-items-center`}
        >
          {value ? formateValue() : placeholder}
          {showCaret && <FaCaretDown size={25} />}
        </DropdownToggle>
        <DropdownMenu>
          <NormalInput
            placeholder={"Search here"}
            style={{ borderRadius: 0 }}
            setValue={(v) => handleSearch(v)}
            className={"bg-transparent"}
          />
          <div
            className=""
            style={{
              height: "300px",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            {searchedResults?.length === 0
              ? allCountriesRef?.current?.map((c) => (
                  <DropdownItem
                    onClick={() => setValue(c?.name)}
                    className="d-flex p-2 justify-content-start"
                  >
                    <div className="d-flex align-items-center gap-2">
                      <Flag
                        style={{
                          borderRadius: "50%",
                          objectFit: "cover",
                          aspectRatio: 1,
                        }}
                        code={c?.code}
                        height={adaptStyle?.iconSize ?? 40}
                        width={adaptStyle?.iconSize ?? 40}
                      />
                      <small className="f-5 ">{c?.name}</small>
                    </div>
                  </DropdownItem>
                ))
              : searchedResults?.map((c) => (
                  <DropdownItem
                    onClick={() => setValue(c?.name)}
                    className="d-flex p-2 justify-content-start"
                  >
                    <div className="d-flex align-items-center gap-2">
                      <Flag
                        style={{
                          borderRadius: "50%",
                          objectFit: "cover",
                          aspectRatio: 1,
                        }}
                        code={c?.code}
                        height={40}
                        width={40}
                      />
                      <small className="f-5 ">{c?.name}</small>
                    </div>
                  </DropdownItem>
                ))}
          </div>
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
};

export default CountrySelectInput;
