import {
  Button,
  Card,
  CardBody,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import logo from "../../assets/logo.png";
import NormalInput from "../../components/inputs/NormalInput";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SetupUserName = () => {
  const [animation, setAnimation] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const navigateTo = useNavigate();

  const handleUserName = () => {
    if (userName === "taken") {
      setAnimation("oops 1s alternate 1");
      toast.error("User name is already taken");
    } else {
      toast.success(
        `Welcome to Interior ${userName} . Just a few steps to complete your profile `
      );
      navigateTo("/basic-info");
    }
  };

  return (
    <Row className="full-screen-size gx-0 d-flex justify-content-center align-items-center">
      <Col md={6} xl={4} xxl={3}>
        <Card className="border-transparent bg-transparent">
          <CardBody className="text-center">
            <div className="auth-logo-container">
              <img alt="logo" height={75} width={75} src={logo} />
            </div>
            <div className="my-4 py-3">
              <InputGroup
                className="overflow-hidden"
                style={{ borderRadius: "23px" }}
              >
                <InputGroupText>testtest.com/</InputGroupText>
                <Input
                  id="user-name"
                  className="normal-input"
                  value={userName}
                  onChange={(e) => setUserName(e?.target?.value)}
                  placeholder="Username"
                  style={{ background: "#252525" }}
                />
              </InputGroup>
            </div>
            <Button
              disabled={userName === ""}
              style={{ height: "50px" }}
              onClick={() => handleUserName()}
              className="btn d-flex align-items-center justify-content-center orange-btn-1 full-width "
            >
              Sign Up
            </Button>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default SetupUserName;
