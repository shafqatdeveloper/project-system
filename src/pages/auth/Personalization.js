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
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavigatorTab from "../../components/navigators/NavigatorTab";
import PersonalInformation from "../../components/page-sections/PersonalInformation";
import BusinessInformation from "../../components/page-sections/BusinessInformation";
import { languageList } from "../../dummyData";

const Personalization = () => {
  const [animation, setAnimation] = useState("");
  const [flowAt, setFlowAt] = useState(0);
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
    legalFullName: "",
    currency: "",
    language: getDefaultLanguage(),
    phoneNumber: undefined,
    address: {},
  });

  const [businessInformation, setBusinessInformation] = useState({
    startDate: "",
    currency: "",
    language: getDefaultLanguage(),
    name: "",
    phoneNumber: undefined,
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
              onClick={() => {
                navigateTo("/");
              }}
              className="btn d-flex py-3 align-items-center justify-content-center cyan-btn full-width "
            >
              OK
            </Button>
          </CardBody>
        </Card>
      </div>
    </Row>
  );
};

export default Personalization;
