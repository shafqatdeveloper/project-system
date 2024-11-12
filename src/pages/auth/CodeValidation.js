import { Button, Card, CardBody, Col, Row, Spinner } from "reactstrap";
import logo from "../../assets/logo.png";
import NormalInput from "../../components/inputs/NormalInput";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CodeInput from "../../components/inputs/CodeInput";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../services/userServices";

const CodeValidation = () => {
  const [animation, setAnimation] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const firstInputField = document.getElementById("digit-input-index-0");
  const navigateTo = useNavigate();
  const [resending, setisResending] = useState(false);
  const [timer, setTimer] = useState(60);
  const [code, setCode] = useState("");
  const location = useLocation();

  const userId =
    location.state?.userId || localStorage.getItem("userId") || null;
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    let timeOut = setTimeout(() => {
      setisLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  const handleResendCode = async () => {
    setisResending(false);
    setisLoading(true);
    if (firstInputField) {
      firstInputField?.focus();
    }
    try {
      const response = await axiosInstance.put("/api/auth/resendverifycode", {
        userId: parseInt(userId),
      });
      if (response?.status === 200) {
        toast.success(response?.data?.message);
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
  useEffect(() => {
    if (firstInputField) {
      firstInputField?.focus();
    }
  }, [firstInputField]);

  useEffect(() => {
    let codeToCheck = code?.split("-").join("");
    console.log(codeToCheck?.length);
    console.log(codeToCheck);
    const verifyCode = async () => {
      setisLoading(true);
      try {
        const response = await axiosInstance.put(
          "/api/auth/verifyemail",
          {
            userId: userId,
            vcode: codeToCheck,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response?.status === 200) {
          toast.success("Code verified");
          setTimeout(() => {
            navigateTo("/user-type");
          }, 1000);
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
    if (codeToCheck?.length === 4) {
      verifyCode();
    }
  }, [code]);

  useEffect(() => {
    if (!resending) {
      let timeout = 60; // Start the timeout at 60 seconds
      setTimer(timeout); // Set initial state

      let interval = setInterval(() => {
        timeout -= 1;
        setTimer(timeout); // Update the state
        if (timeout < 1) {
          setisResending(true); // Allow resending when the timer finishes
          clearInterval(interval); // Clear the interval when the countdown reaches 0
        }
      }, 1000);

      return () => {
        clearInterval(interval); // Cleanup on unmount or when the effect reruns
      };
    }
  }, [resending]); // Depend on the `resending` state

  return (
    <Row className="full-screen-size gx-0 d-flex justify-content-center align-items-center">
      <Col md={6} xl={4} xxl={3}>
        <Card className="border-transparent bg-transparent">
          <CardBody className="text-center">
            <div className="auth-logo-container m-0">
              <img alt="logo" src={logo} height={75} width={75} />
            </div>
            <h5 className="text-center my-4 color-7777">Validation Code</h5>
            <div>
              <CodeInput
                value={code}
                maxNumberPerCell={9}
                setValue={setCode}
                totalDigits={4}
                onError={() => setAnimation("oops 1s alternate 1")}
              />

              <Button
                disabled={!resending}
                className="cyan-btn full-width my-4"
                onClick={() => handleResendCode()}
              >
                {isLoading ? (
                  <Spinner size={"sm"} />
                ) : (
                  `${timer > 0 ? `( ${timer} )` : ""} Resend`
                )}
              </Button>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default CodeValidation;
