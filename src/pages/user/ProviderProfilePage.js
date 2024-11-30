import { useEffect, useState, useRef } from "react";
import { Button, Col, Row, Spinner } from "reactstrap";
import { providerProfileOptions } from "../../dummyData";
import ProfileSettings from "../../components/page-sections/ProfileSettings";
import UserProfileHeader from "../../components/globals/UserProfileHeader";
import ProfileShowCase from "../../components/page-sections/ProfileShowCase";
import ProfilePricing from "../../components/page-sections/ProfilePricing";
import ProfileOrderNow from "../../components/page-sections/ProfileOrderNow";
import {
  // Link,
  // useLocation,
  // useParams,
  useSearchParams,
} from "react-router-dom";
import TextEditIcon from "../../assets/modifiedIcons/TextEditIcon";
import ImageEditIcon from "../../assets/modifiedIcons/ImageEditIcon";
import VideoEditIcon from "../../assets/modifiedIcons/VideoEditIcon";
import ThreeDEditIcon from "../../assets/modifiedIcons/ThreeDEditIcon";
import LinkEditIcon from "../../assets/modifiedIcons/LinkEditIcon";
import SoundEditIcon from "../../assets/modifiedIcons/SoundEditIcon";
import { FaCaretRight } from "react-icons/fa6";

const ProviderProfilePage = ({ onLogout }) => {
  const [searchParams] = useSearchParams();
  const [flowAt, setFlowAt] = useState(Number(searchParams.get("goTo")) ?? 0);
  const [querry, setQuerry] = useState(window.innerWidth);
  const profileSettingRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const renderComponent = () => {
    switch (flowAt) {
      case 0:
        return (
          <ProfileSettings
            ref={profileSettingRef}
            setIsLoading={setIsLoading}
          />
        );
      case 1:
        return <ProfileShowCase />;
      case 2:
        return <ProfilePricing />;
      case 3:
        return <ProfileOrderNow />;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setQuerry(window.innerWidth);
    });
  }, []);

  const handleSaveProfileSettings = () => {
    if (profileSettingRef.current) {
      profileSettingRef.current.save();
    }
  };

  return (
    <div>
      <div className="main-header">
        <UserProfileHeader onLogout={onLogout} />
        <div className="px-3 pt-2 position-relative">
          <div className="d-flex  px-xl-5 profile-nav-container align-items-center flex-wrap flex-md-nowrap gap-2   justify-content-xl-around justify-content-evenly">
            {providerProfileOptions?.map((item, key) => (
              <Button
                onClick={() => setFlowAt(key)}
                className={`profile-nav-btn  ${
                  item === "Order Now" ? "color-orange" : ""
                }  p-md-2 ${key === flowAt ? "active" : ""} `}
                key={key}
              >
                <div className="d-flex full-width align-items-center justify-content-center">
                  {item === "Order Now" ? (
                    <FaCaretRight style={{ marginRight: "7px" }} size={14} />
                  ) : null}
                  {item}
                </div>
              </Button>
            ))}
          </div>
          {flowAt === 0 && (
            <Row
              className="px-lg-4 px-3"
              style={{ paddingTop: "15px", paddingBottom: "15px" }}
            >
              <Col md={3} className="d-flex align-items-center gap-2">
                <Button
                  onClick={handleSaveProfileSettings}
                  style={{ borderRadius: "10px", width: "120px" }}
                  className="bg-gradient-cyan border-none f-6 text-black "
                >
                  {isLoading ? <Spinner size={"sm"} /> : "Save"}
                </Button>
                <Button
                  style={{ borderRadius: "10px", width: "120px" }}
                  className="bg-gradient-orange border-none f-6 text-black  "
                >
                  Preview
                </Button>
              </Col>
              <Col
                md={6}
                className="d-flex flex-wrap align-items-center gap-2 justify-content-center"
              >
                <Button className="p-0 bg-transparent border-none header-link">
                  <TextEditIcon
                    height={50}
                    width={65}
                    activeColor={"#00c8c8"}
                    hoverColor={"#00c8c8"}
                    color={"#555"}
                  />
                </Button>
                <Button className="p-0 bg-transparent border-none header-link">
                  <ImageEditIcon
                    height={50}
                    width={65}
                    activeColor={"#00c8c8"}
                    hoverColor={"#00c8c8"}
                    color={"#555"}
                  />
                </Button>
                <Button className="p-0 bg-transparent border-none header-link">
                  <SoundEditIcon
                    height={50}
                    width={65}
                    activeColor={"#00c8c8"}
                    hoverColor={"#00c8c8"}
                    color={"#555"}
                  />
                </Button>
                <Button className="p-0 bg-transparent border-none header-link">
                  <VideoEditIcon
                    height={50}
                    width={65}
                    activeColor={"#00c8c8"}
                    hoverColor={"#00c8c8"}
                    color={"#555"}
                  />
                </Button>
                <Button className="p-0 bg-transparent border-none header-link">
                  <ThreeDEditIcon
                    height={50}
                    width={65}
                    activeColor={"#00c8c8"}
                    hoverColor={"#00c8c8"}
                    color={"#555"}
                  />
                </Button>
                <Button className="p-0 bg-transparent border-none header-link">
                  <LinkEditIcon
                    height={50}
                    width={65}
                    activeColor={"#00c8c8"}
                    hoverColor={"#00c8c8"}
                    color={"#555"}
                  />
                </Button>
              </Col>
              <Col md={3} className="d-flex justify-content-end on-sm-order-1">
                <Button
                  className="bg-transparent p-0 color-half-white border-none "
                  style={{ borderRadius: "50%", height: "30px", width: "30px" }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0zm0 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm3.607 5.536a.65.65 0 0 1 0 .919L10.99 10.07l2.617 2.616a.65.65 0 0 1-.92.92l-2.616-2.617-2.616 2.617a.65.65 0 0 1-.92-.92l2.617-2.616-2.616-2.616a.65.65 0 0 1 .919-.92l2.616 2.617 2.616-2.616a.65.65 0 0 1 .92 0z"
                      fill="#777"
                      fill-rule="nonzero"
                    />
                  </svg>
                </Button>
              </Col>
            </Row>
          )}
        </div>
      </div>
      <div
        className="px-3 "
        style={{
          paddingBottom: "1rem",
          height: querry < 700 ? "auto" : flowAt === 0 ? "55vh" : "65vh",
          overflowX: querry < 700 ? "hidden" : "auto",
          overflowY: querry < 700 ? "scroll" : "auto",
        }}
      >
        {renderComponent()}
      </div>
    </div>
  );
};

export default ProviderProfilePage;
