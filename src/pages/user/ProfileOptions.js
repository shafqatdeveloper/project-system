import { Button, Card, CardBody, Col, Row, Spinner } from "reactstrap";
import logo from "../../assets/logo.png";
import {
  profilePageUserAOptions,
  profilePageUserBOptions,
} from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { AnimatedLOGOSVG } from "../../assets/designPickedIcons";

const ProfileOptions = () => {
  const [userRole, setUserRole] = useState("provider");

  const onButtonClick = (btn) => {
    if (btn?.includes("Client")) {
      setUserRole("client");
      toast.success("You have switched to client", { position: "top-center" });
    } else if (btn?.includes("Provider")) {
      setUserRole("provider");
      toast.success("You have switched to provider", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="full-screen-size d-flex flex-column align-items-center justify-content-center">
      <Row className="justify-content-center">
        <Col md={7} xl={6}>
          <div className="auth-logo-container">
            <img alt="logo" height={75} width={360} />
          </div>
          <div className="grid-container-4">
            {userRole === "provider"
              ? profilePageUserAOptions?.map((opt, key) => (
                  <Link
                    onClick={() => onButtonClick(opt?.title)}
                    to={opt?.link}
                    key={key}
                    className="text-decoration-none  d-flex align-items-center justify-content-center profile-opt-card"
                  >
                    <Card className="p-3 d-flex gap-1 bg-transparent border-none color-cccc flex-column justify-content-center align-items-center ">
                      {opt?.icon}
                      <p className="m-0">{opt?.title}</p>
                    </Card>
                  </Link>
                ))
              : profilePageUserBOptions?.map((opt, key) => (
                  <Link
                    onClick={() => onButtonClick(opt?.title)}
                    to={opt?.link}
                    key={key}
                    className="text-decoration-none profile-opt-card  justify-content-center d-flex align-items-center"
                  >
                    <Card className="p-3 d-flex gap-1 bg-transparent border-none color-cccc  justify-content-center flex-column align-items-center ">
                      {opt?.icon}
                      <p className="m-0">{opt?.title}</p>
                    </Card>
                  </Link>
                ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileOptions;
