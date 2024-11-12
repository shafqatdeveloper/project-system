import {
  Button,
  Card,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Navbar,
  NavbarBrand,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import logoImg from "../../assets/logo.png";
import dummyProfileImg from "../../assets/user-2.png";
import { dummyKeywords, profileDropdownOptions } from "../../dummyData";
import playstoreImg from "../../assets/playstore.png";
import appstoreImg from "../../assets/appstore.png";
import CountrySelectInput from "../inputs/CountrySelectInput";
import dummyQRimg from "../../assets/dummy-qr.png";
import { Link, useLoaderData, useLocation, useParams } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";

const Header = () => {
  const { relatedTo } = useParams();

  return (
    <Navbar className="main-header px-xl-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link
          to={"/"}
          style={{ width: "120px", borderColor: "#333" }}
          className="btn  text-white"
        >
          Home
        </Link>
        <div className="d-flex align-items-center gap-3">
          <UncontrolledDropdown>
            <DropdownToggle
              className="bg-transparent header-link p-0 border-none"
              caret
            >
              EN
            </DropdownToggle>
          </UncontrolledDropdown>
          <Link className="header-link" to={"/"}>
            <IoNotificationsOutline size={25} />
          </Link>
          <Link className="header-link" to={"/"}>
            <FaRegHeart size={25} />
          </Link>
          <Link className="btn  header-link" to={"/"}>
            Orders
          </Link>
          <UncontrolledDropdown className="profile-dropdown">
            <DropdownToggle className="bg-transparent header-link p-0 border-none">
              <img
                src={dummyProfileImg}
                height={50}
                width={50}
                className="object-fit-cover"
              />
            </DropdownToggle>
            <DropdownMenu>
              <div className="d-flex justify-content-end">
              <div className="chevron-up"></div>
              </div>
              {profileDropdownOptions?.map((opt, key) => (
                <DropdownItem key={key}>
                  {opt?.icon} {opt?.title}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>

      <div className="d-flex flex-wrap full-width justify-content-between gap-3">
        <NavbarBrand tag={"div"}>
          <div className="d-flex gap-2">
            <img
              src={logoImg}
              height={78}
              width={72}
              className="object-fit-contain"
              alt="logo"
            />
            <div className="d-flex justify-content-center flex-column">
              <h4 className="brand-name m-0">Interior</h4>
              <div className="d-flex gap-2 align-items-center">
                <h4 className="m-0 f-4" style={{ color: "#00c8c8" }}>
                  Top
                </h4>
                <h4 className="m-0 f-4" style={{ color: "#ff9527" }}>
                  Pick
                </h4>
              </div>
            </div>
          </div>
        </NavbarBrand>
        <div className="grid-container-4 ">
          {dummyKeywords?.slice(0, 11)?.map((keyword, key) => (
            <Link to={`/`} key={key} className={`btn keyword-tag `}>
              {keyword}
            </Link>
          ))}
          <Link to={`/`} className={`btn keyword-tag  `}>
            More Types
          </Link>
        </div>
        <div className="d-flex">
          <img
            src={dummyQRimg}
            height={90}
            width={100}
            className="object-fit-contain"
          />

          <div className="d-flex flex-column">
            <img
              src={appstoreImg}
              height={45}
              width={140}
              className="object-fit-contain"
            />
            <img
              src={playstoreImg}
              height={45}
              width={140}
              className="object-fit-contain"
            />
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default Header;
