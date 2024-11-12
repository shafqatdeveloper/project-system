import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import NormalInput from "./NormalInput";
import { useScreenWidth } from "../../utils";
import { HeartIcon } from "../../assets/designPickedIcons";
import { TiHeartFullOutline } from "react-icons/ti";
import likedIcon from "../../assets/designPickedIcons/liked-icon.png";
import { useState } from "react";

const AddToFavourities = ({
  availableLists,
  handleAddToFavourity,
  handleNewListCreate,
  item,
  newListName,
  setNewListName,
  iconsSize
}) => {
  const { isSmaller } = useScreenWidth(576);
  const [isCreatingList, setisCreatingList] = useState(false);

  return (
    <UncontrolledDropdown className="normal-dropdown m-0 p-0">
      <DropdownToggle
        
        onClick={() => {
          if (item?.isFavourite) handleAddToFavourity(item);
        }}
        className="bg-transparent border-none p-0 m-0 "
      >
        <div >
          {!item?.isFavourite ? (
            <HeartIcon
              data-role="add"
              size={iconsSize??30}
              color="#3d3d3d "
              hoverColor={"#00C8C8"}
            />
          ) : (
            <svg
              data-role="add"
              width={iconsSize??30}
              height={iconsSize??30}
              viewBox="0 0 30 30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fill-rule="evenodd">
                <path d="M0 0h30v30H0z" />
                <path
                  d="M14.139 8.06 15 8.7l.861-.64a6.037 6.037 0 0 1 5.957-.71A5.221 5.221 0 0 1 25 12.156v.86a8.066 8.066 0 0 1-3.592 6.712L15 24l-6.408-4.272A8.066 8.066 0 0 1 5 13.017v-.86A5.221 5.221 0 0 1 8.182 7.35a6.037 6.037 0 0 1 5.957.71z"
                  fill="#FF1D1D"
                />
              </g>
            </svg>
          )}
        </div>
      </DropdownToggle>
      {!item?.isFavourite && (
        <DropdownMenu style={{minHeight:0}} className="position-absolute overflow-auto">
          <div
            className="overflow-hidden"
            style={{ borderRadius: "10px", background: "#333" }}
          >
            {isCreatingList ? (
              <div className="overflow-hidden" style={{ background: "#333" }}>
                <div
                  className="d-flex align-items-center overflow-hidden"
                  style={{
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                >
                  <NormalInput
                    onEnterPress={() => handleNewListCreate()}
                    value={newListName}
                    setValue={setNewListName}
                    placeholder={"Write list name"}
                    className={"br-0 bg-transparent"}
                  />
                  <button
                    onClick={() => handleNewListCreate()}
                    style={{ width: "50px" }}
                    className="orange-btn-1"
                  >
                    <IoMdAdd size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => setisCreatingList((prev) => !prev)}
                className="bg-transparent dropdown-item justify-content-start color-half-white border-none full-width"
              >
                <IoMdAdd size={25} />
                <small className="mx-2">Create list</small>
              </div>
            )}

            <div>
              {availableLists?.map((list, k) => (
                <DropdownItem
                  onClick={() => handleAddToFavourity(item)}
                  key={k}
                  className="justify-content-start"
                >
                  <div>
                    {" "}
                    <HeartIcon
                      size={30}
                      color={"#555555"}
                      hoverColor={"black"}
                    />
                  </div>
                  <small className="mx-2">{list}</small>
                </DropdownItem>
              ))}
            </div>
          </div>
        </DropdownMenu>
      )}
    </UncontrolledDropdown>
  );
};

export default AddToFavourities;
