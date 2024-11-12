import { Button, Card, CardBody, Col, Row, Spinner } from "reactstrap";
import logo from "../../assets/logo.png";
import NormalInput from "../../components/inputs/NormalInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/userServices";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [credientials, setCredentials] = useState({ username: "", email: "" });

  console.log(credientials);
  const [isLoading, setisLoading] = useState(false);
  const navigateTo = useNavigate();

  const handleEmailSend = async () => {
    setisLoading(true);
    try {
      const response = await axiosInstance.post(
        `/api/auth/forgetpassword?username=${credientials?.username}&email=${credientials?.email}`
      );
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        // setTimeout(() => {
        //   window.location.href = `/resetpassword?resetCode=1234`;
        // }, 2000);
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || // Backend error message
        error?.response?.data?.error || // Another common location for error messages
        error.message || // Axios error message if response is not structured
        "An unexpected error occurred. Please try again."; // Fallback message

      toast.error(errorMessage);
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
              <img alt="logo" height={75} width={360} />
            </div>
            <h5 className="text-center mt-3 mb-5 color-half-white">
              Forgot Password
            </h5>
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
            </div>
            <div>
              <NormalInput
                value={credientials?.email}
                setValue={(v) =>
                  setCredentials((prev) => ({ ...prev, email: v }))
                }
                className="mb-3"
                placeholder={"Email"}
                label={"Email"}
                type="text"
              />
            </div>
            <Button
              disabled={
                credientials.email === "" || credientials.username === ""
              }
              className="cyan-btn mt-5 full-width "
              onClick={() => handleEmailSend()}
            >
              {isLoading ? <Spinner size={"sm"} /> : "Send"}
            </Button>
          </CardBody>
        </Card>
      </div>
    </Row>
  );
};

export default ForgotPassword;
