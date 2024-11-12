import {
  Button,
  Card,
  CardBody,
  Col,
  Row,
  Spinner,
  Toast,
  ToastBody,
  ToastHeader,
} from "reactstrap";
import NormalInput from "../../components/inputs/NormalInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigateTo = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const resetCode = queryParams.get("resetCode");

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Password and confirm password do not match");
      return;
    }
    setIsLoading(true);
    // Perform the reset password logic here
    setTimeout(() => {
      setIsLoading(false);
      navigateTo("/login"); // Redirect to login or homepage
    }, 2000);
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
              Reset Password
            </h5>
            <NormalInput
              value={newPassword}
              setValue={(v) => setNewPassword(v)}
              className="mb-3"
              placeholder={"New Password"}
              label={"New Password"}
              type="password"
            />
            <NormalInput
              value={confirmPassword}
              setValue={(v) => setConfirmPassword(v)}
              className="mb-3"
              placeholder={"Confirm Password"}
              label={"Confirm Password"}
              type="password"
            />
            <Button
              disabled={newPassword === "" || confirmPassword === ""}
              className="cyan-btn mt-5 full-width"
              onClick={handleResetPassword}
            >
              {isLoading ? <Spinner size={"sm"} /> : "Reset"}
            </Button>
          </CardBody>
        </Card>
      </div>
    </Row>
  );
};

export default ResetPassword;
