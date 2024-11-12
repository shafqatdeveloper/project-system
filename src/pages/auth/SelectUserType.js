import { Button, Card, CardBody, Col, Row, Spinner } from "reactstrap";
import { useEffect } from "react";
import logo from "../../assets/logo.png";
import NormalInput from "../../components/inputs/NormalInput";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaRegCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

const SelectUserType = () => {
  const [isLoading, setisLoading] = useState(false);
  const [isClient, setisClient] = useState(true);
  const [isProvider, setisProvider] = useState(false);
  const navigateTo = useNavigate();

  const saveRole = () => {
    const selectedRole = isClient ? "CLIENT" : "PROVIDER";
    localStorage.setItem("selectedRole", selectedRole);
  };

  useEffect(() => {
    // Check for authToken in localStorage
    const authToken = localStorage.getItem("authToken");
    if (!authToken || authToken === undefined || authToken === null) {
      navigateTo("/");
    }
  }, []);

  return (
    <Row className="full-screen-size gx-0 d-flex justify-content-center align-items-center">
      <div style={{ width: "360px" }}>
        <Card className="border-transparent bg-transparent">
          <CardBody className="text-center">
            <div className="auth-logo-container">
              <img alt="logo" height={75} width={75} src={logo} />
            </div>
            <div className="my-5 d-flex flex-wrap justify-content-center flex-md-nowrap gap-md-3 gap-2 align-items-center ">
              <Button
                onClick={() => {
                  setisClient(true);
                  setisProvider(false);
                }}
                className={`border-none  d-flex gap-2 align-items-center flex-column justify-content-center ${
                  isClient
                    ? "bg-gradient-cyan text-black"
                    : "bg-gradient-grey color-half-white"
                }`}
                style={{ height: "120px", width: "180px" }}
              >
                {isClient ? (
                  <FaCheckCircle color="black" size={40} />
                ) : (
                  <FaRegCircle size={40} />
                )}
                <p className="m-0 f-5">I'm a client</p>
              </Button>
              <Button
                onClick={() => {
                  setisProvider(true);
                  setisClient(false);
                }}
                className={`border-none  gap-2  d-flex align-items-center flex-column justify-content-center ${
                  isProvider
                    ? "bg-gradient-orange text-black"
                    : "bg-gradient-grey color-half-white"
                }`}
                style={{ height: "120px", width: "180px" }}
              >
                {isProvider ? (
                  <FaCheckCircle color="black" size={40} />
                ) : (
                  <FaRegCircle size={40} />
                )}
                <p className="m-0 f-5">I'm a Provider</p>
              </Button>
            </div>

            <Link
              onClick={saveRole}
              to={"/user-name"}
              className="btn d-flex align-items-center justify-content-center text-decoration-none orange-btn-1 full-width "
            >
              Continue
            </Link>
          </CardBody>
        </Card>
      </div>
    </Row>
  );
};

export default SelectUserType;
