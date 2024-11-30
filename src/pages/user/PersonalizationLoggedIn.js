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
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavigatorTab from "../../components/navigators/NavigatorTab";
import PersonalInformation from "../../components/page-sections/PersonalInformation";
import BusinessInformation from "../../components/page-sections/BusinessInformation";
import { languageList } from "../../dummyData";
import axiosInstance from "../../services/userServices";
import { toast } from "react-toastify";
import axios from "axios";

const PersonalizationLoggedIn = ({}) => {
  const [animation, setAnimation] = useState("");
  const [flowAt, setFlowAt] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigateTo = useNavigate();

  //get language and country from navigator
  const getDefaultLanguage = () => {
    let navigatorLang = navigator.language;
    let lang = languageList?.find((item) => {
      let criteria = `${item?.name?.toLowerCase()}-${item?.countryCode?.toLowerCase()}`;
      return criteria?.includes(navigatorLang);
    });
    return lang?.name || "English";
  };

  const [personalinformation, setPersonalInformation] = useState({
    dob: "",
    currency: "",
    language: getDefaultLanguage(),
    phone: "",
    address: {
      country: "",
      state: "",
      city: "",
      zipCode: "",
      address: "",
    },
    idNumber: "",
    jobTitle: "",
    industry: "",
  });

  // Fetch Person Profile Data
  const fetchPersonProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axiosInstance.get(`/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const profile = response?.data?.personProfile;
      setPersonalInformation((prev) => ({
        ...prev,
        dob: profile?.birthDate?.substring(0, 10) || prev.dob,
        currency: profile?.currency || prev.currency,
        language: profile?.language || getDefaultLanguage(),
        phone: profile?.phone || prev.phone,
        legalFullName: profile?.legalFullName || prev.legalFullName,
        address: {
          address: profile?.address || prev.address.address,
          city: profile?.city || prev.address?.city,
          country: profile?.country || prev.address?.country,
          state: profile?.state || prev.address?.state,
          zipCode: profile?.zipCode || prev.address?.zipCode,
        },
        idNumber: profile?.idNumber || prev.idNumber,
        jobTitle: profile?.jobTitle || prev.jobTitle,
        industry: profile?.industry || prev.industry,
      }));
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    }
  };
  // fetch Business Profile Data
  const fetchBusinessProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axiosInstance.get(`/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const profile = response?.data?.personProfile;
      setPersonalInformation((prev) => ({
        ...prev,
        dob: profile?.birthDate?.substring(0, 10) || prev.dob,
        currency: profile?.currency || prev.currency,
        language: profile?.language || getDefaultLanguage(),
        phone: profile?.phone || prev.phone,
        legalFullName: profile?.legalFullName || prev.legalFullName,
        address: {
          address: profile?.address || prev.address.address,
          city: profile?.city || prev.address?.city,
          country: profile?.country || prev.address?.country,
          state: profile?.state || prev.address?.state,
          zipCode: profile?.zipCode || prev.address?.zipCode,
        },
        idNumber: profile?.idNumber || prev.idNumber,
        jobTitle: profile?.jobTitle || prev.jobTitle,
        industry: profile?.industry || prev.industry,
      }));
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    }
  };
  useEffect(() => {
    fetchPersonProfile();
  }, []);
  // Update Personal Information
  const updateInformationHandler = async (e) => {
    const updatedPersonProfileData = {
      legalFullName: personalinformation?.legalFullName,
      idNumber: personalinformation?.idNumber,
      birthDate: personalinformation?.dob,
      jobTitle: personalinformation?.jobTitle,
      industry: personalinformation?.industry,
      phone: personalinformation?.phone,
      currency: personalinformation?.currency,
      language: personalinformation?.language,
      country: personalinformation?.address?.country,
      state: personalinformation?.address?.state,
      zipCode: personalinformation?.address?.zipCode,
      address: personalinformation?.address?.address,
      city: personalinformation?.address?.city,
    };
    const updatedBusinessProfileData = {};
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (flowAt === 0) {
        const response = await axiosInstance.put(
          `/api/profile/personal`,
          updatedPersonProfileData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success(response?.data?.message);
          fetchPersonProfile();
        } else {
          toast.error(response?.data?.message);
        }
      } else if (flowAt === 1) {
        const response = await axiosInstance.put(
          `/api/profile/business`,
          updatedBusinessProfileData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success(response?.data?.message);
          fetchBusinessProfile();
        } else {
          toast.error(response?.data?.message);
        }
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const [businessInformation, setBusinessInformation] = useState({
    startDate: "",
    currency: "",
    language: getDefaultLanguage(),
    address: {},
  });

  const renderComponent = () => {
    switch (flowAt) {
      case 0:
        return (
          <PersonalInformation
            personalinformation={personalinformation}
            setPersonalInformation={setPersonalInformation}
          />
        );
      case 1:
        return (
          <BusinessInformation
            businessInformation={businessInformation}
            setBusinessInformation={setBusinessInformation}
          />
        );
    }
  };

  const checkDisabledCondition = () => {
    if (flowAt == 0)
      return (
        personalinformation?.address?.country === undefined ||
        personalinformation?.legalFullName === "" ||
        personalinformation?.language === ""
      );
    else
      return (
        businessInformation?.address?.country === undefined ||
        businessInformation?.name === "" ||
        businessInformation?.language === ""
      );
  };

  return (
    <Row className="full-screen-size gx-0 d-flex justify-content-center align-items-center">
      <div style={{ width: "414px" }}>
        <Card className="border-transparent bg-transparent">
          <CardBody className="text-center">
            <div className="auth-logo-container">
              <img alt="logo" height={75} width={360} />
            </div>

            <div className="mt-3 mb-4">
              <NavigatorTab
                flowAt={flowAt}
                onItemClick={(item) => setFlowAt(item?.flowAt)}
                items={[
                  { title: "Personal", flowAt: 0 },
                  { title: "Business", flowAt: 1 },
                ]}
              />
              <div className="my-3">{renderComponent()}</div>
            </div>
            <Button
              disabled={checkDisabledCondition()}
              onClick={(e) => updateInformationHandler(e)}
              className="btn d-flex py-3 align-items-center justify-content-center cyan-btn full-width "
            >
              {isLoading ? <Spinner size={"sm"} /> : " OK"}
            </Button>
          </CardBody>
        </Card>
      </div>
    </Row>
  );
};

export default PersonalizationLoggedIn;
