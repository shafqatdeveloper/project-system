import { FaStar } from "react-icons/fa";
import { Button, Card, CardBody, CardFooter, Col, Row } from "reactstrap";
import caseCertificateImg from "../../assets/case-cert.png";
import StandardSlider from "../sliders/StandardSlider";
import { FaRegHeart } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";

const TopPickLargeCard = ({ data, activeKeyword }) => {
  return (
    <Card className="border-none bg-transparent mb-2">
      <Card className="top-pick-card p-3">
        <CardBody>
          <Row className="g-2">
            <Col md={4}>
              <div className="d-flex align-items-center flex-wrap flex-md-nowrap gap-2">
                <img
                  src={data?.provider?.image}
                  height={100}
                  width={100}
                  className="object-fit-cover full-rounded"
                />
                <div>
                  <h4 className="mb-1 text-white f-5">
                    {data?.provider?.name}
                  </h4>
                  <p className="m-0 text-white f-3">
                    {data?.provider?.designation}
                  </p>
                  <div className="d-flex align-items-center gap-1">
                    <FaStar color="yellow" size={20} />
                    <p className="f-5 m-0 text-white">
                      {data?.provider?.rating}
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="grid-container gap-1">
                {data?.keywords?.slice(0, 5)?.map((keyword, key) => (
                  <Button
                    key={key}
                    className={`keyword-tag ${
                      activeKeyword === keyword ? "active-2" : ""
                    }`}
                  >
                    {keyword}
                  </Button>
                ))}
                {data?.keywords?.length>5&&<Button className={`keyword-tag`}>More Types</Button>}
              </div>
            </Col>
            <Col md={3} lg={2}>
              <img
                src={caseCertificateImg}
                height={100}
                className="object-fit-contain full-width"
                alt="certifate"
              />
            </Col>
            <Col md={3}></Col>
          </Row>
        </CardBody>
      </Card>
      <StandardSlider
        scrollOffset={256}
        style={{ transform: "translateY(-10%)" }}
        items={data?.otherProjects}
        renderItem={(item, key) => (
          <Card
            key={key}
            className="top-pick-card d-flex flex-column justify-content-between "
          >
            <div className="d-flex align-items-center py-1 px-2 full-width justify-content-between">
              <img
                src={data?.provider?.image}
                height={30}
                width={30}
                className="full-rounded"
              />
              <FaRegHeart size={20} color="#d9d9d9" />
            </div>
            <div className="border-none bg-transparent p-2 d-flex justify-content-between align-items-center">
              <br></br>
              <small className="d-block color-half-white text-center">
                {item?.type}
              </small>
              <IoAddCircleOutline size={20} className="color-half-white" />
            </div>
          </Card>
        )}
      />
    </Card>
  );
};

export default TopPickLargeCard;
