import { IoSearch } from "react-icons/io5";
import { Input } from "reactstrap";
import { LineChartIcon } from "../../assets/designPickedIcons";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const SearchBar = ({ placeholder, value, setValue }) => {
  const [isFocuesd, setisFocused] = useState(false);

  return (
    <div className="search-bar d-flex align-items-center justify-content-between color-7777">
      <div>
        <IoSearch size={30} />
      </div>
      <Input
        value={value}
        onChange={(e) => setValue(e?.target?.value)}
        onFocus={() => setisFocused(true)}
        onBlur={() => setisFocused(false)}
        type="text"
        placeholder={placeholder}
        className="bg-transparent border-none p-0 "
      />
      <div style={{height:30,width:30}} className="d-flex align-items-center">
        {!isFocuesd ? (
          <LineChartIcon
            height={30}
            width={30}
            color={`#7777`}
            hoverColor={"black"}
          />
        ) : (
          <RxCross2
            size={20}
            style={{ border: "1px solid black" }}
            className="full-rounded"
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
