import { Button, Card, CardBody, Col, Row, Spinner } from "reactstrap";
import NormalInput from "../../components/inputs/NormalInput";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { FaApple } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

import { Link } from "react-router-dom";
import axiosInstance from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const Login = ({ onAuthSuccess }) => {
  const [credientials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [animation, setAnimation] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const redirect = useNavigate();
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      redirect("/");
    }
  }, []);

  const handleLogin = async () => {
    setisLoading(true);
    try {
      const response = await axiosInstance.post("/api/auth/login", {
        username: credientials.username,
        password: credientials.password,
      });
      if (response?.status === 200) {
        setAnimation("bounce-1 1s linear 1");
        toast.success(response?.data?.message);
        const userId = response?.data?.userId;
        const authToken = response?.data?.token;
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("userId", userId);
        onAuthSuccess();
      } else if (response?.status === 401) {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      // Check if the error response status is 401
      if (error?.response?.status === 401) {
        toast.error("Invalid username or password.");
      } else {
        // Extract the error message if available
        const errorMessage =
          error?.response?.data?.message || // Backend error message
          error?.response?.data?.error || // Another common location for error messages
          error.message || // Axios error message if response is not structured
          "An unexpected error occurred. Please try again."; // Fallback message

        toast.error(errorMessage);
      }
    } finally {
      setisLoading(false);
    }
  };

  return (
    <Row className="full-screen-size gx-0 d-flex justify-content-center align-items-center">
      <div style={{ width: "414px" }}>
        <Card className="border-transparent bg-transparent">
          <CardBody className="text-center">
            <div className="auth-logo-container">
              <img src={logo} alt="logo" height={75} width={75} />
            </div>
            <h5 className="text-center mt-3 mb-5 color-half-white">Login</h5>
            <div>
              <NormalInput
                value={credientials?.username}
                setValue={(v) =>
                  setCredentials((prev) => ({ ...prev, username: v }))
                }
                className="mb-3"
                placeholder={"Username"}
                label={"Username"}
                type="text"
              />
              <NormalInput
                value={credientials?.password}
                setValue={(v) =>
                  setCredentials((prev) => ({ ...prev, password: v }))
                }
                placeholder={"Password"}
                label={"Password"}
                type="password"
              />
            </div>
            <Button
              disabled={
                credientials?.username === "" || credientials?.password === ""
              }
              className="cyan-btn mt-5 full-width "
              onClick={() => handleLogin()}
            >
              {isLoading ? <Spinner size={"sm"} /> : "Log In"}
            </Button>
            <div className="d-flex align-items-center justify-content-center my-4 gap-3">
              <Button
                className="cyan-btn d-flex align-items-center justify-content-center"
                style={{ height: "45px", width: "45px", borderRadius: "50%" }}
              >
                <FaApple
                  size={30}
                  style={{ transform: "translate(-0.5px, -1.5px)" }}
                />
              </Button>
              <Button
                className="cyan-btn"
                style={{ height: "45px", width: "45px", borderRadius: "50%" }}
              >
                <FaGoogle size={25} />
              </Button>
            </div>
            <div className="d-flex justify-content-between align-items-center gap-3">
              <Link
                to={"/signup"}
                className="btn text-decoration-none orange-btn-2 full-width"
              >
                Sign Up Free
              </Link>
              <Link
                to={"/forgotpassword"}
                className=" btn text-decoration-none cyan-bordered-btn full-width"
              >
                Forgot Password
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </Row>
  );
};

export default Login;
