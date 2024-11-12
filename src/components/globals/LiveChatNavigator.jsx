import { Link, useLocation } from "react-router-dom";
import dummyProfile from "../../assets/vercena.jpg";
import liveChatBg from "../../assets/designPickedIcons/live-chat-icon.png";
import { useEffect, useState } from "react";
import { Button, Card, Container } from "reactstrap";
import { dummyUsers } from "../../dummyData";
import ChatContainer from "../../components/chat/ChatContainer";
import { toast } from "react-toastify";
import UserAvatar from "../../components/chat/UserAvatar";

const LiveChatNavigator = () => {
  const [timeOut, setTimeOut] = useState(0);
  const [isChatting, setisChatting] = useState(false);
  var x = 0;
  const [chattingWith, setChattingWith] = useState(dummyUsers[0]);
  const { pathname } = useLocation();

  useEffect(() => {
    let interval = setInterval(() => {
      x += 1;
      if (x > 40) {
        x = 0;
        setTimeOut(0);
      } else setTimeOut((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  //hiding chat icon on showcase-details path
  if (
    pathname?.includes("showcase-details") ||
    pathname?.includes("basic-info")
  )
    return null;

  return (
    <>
      {!isChatting && (
        <Button
          onClick={() => {
            setisChatting(true);
          }}
          style={{
            bottom: 20,
            right: 20,
            zIndex: 1000,
          }}
          className="position-fixed p-0  bg-transparent border-none  text-decoration-none d-flex align-items-center justify-content-center"
        >
          <small
            className="position-absolute full-rounded "
            style={{
              right: 4,
              top: 4,
              height: 20,
              width: 20,
              fontSize: "12px",
              zIndex: 20,
              background: `#ff1d1d`,
            }}
          >
            23
          </small>
          <img
            src={liveChatBg}
            style={{
              animation:
                "cyan-shadow 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite ",
              borderRadius: "50% 50% 0 50%",
            }}
            height={120}
            width={120}
            className="object-fit-cover"
          />

          {timeOut > 10 && timeOut < 20 ? (
            <img
              src={dummyProfile}
              height={96}
              width={96}
              style={{ border: "1px solid white" }}
              className="full-rounded position-absolute "
            />
          ) : timeOut > 20 && timeOut < 30 ? (
            <div className="typing position-absolute">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          ) : (
            <div
              style={{ height: 96, width: 96 }}
              className="d-flex py-2 align-items-center position-absolute justify-content-center"
            >
              <small
                style={{ fontSize: "12px" }}
                className="m-0 f-5 text-black text-center"
              >
                Average Response Time{" "}
                <span className="f-6 text-black">24 hours</span>
              </small>
            </div>
          )}
        </Button>
      )}
      {isChatting && (
        <Container className="d-flex align-items-end chat-wrapper p-0 justify-content-center">
          <div
            className="d-flex flex-column flex-md-row full-width"
            style={{ background: "#252525", borderRadius: "30px" }}
          >
            <div className="chat-sidebar">
              {dummyUsers?.map((item, key) => (
                <div
                  onClick={() => setChattingWith(item)}
                  key={key}
                  className="d-flex chat-user flex-column cursor-pointer full-width align-items-center"
               
                >
                  <UserAvatar
                    height={50}
                    width={50}
                    src={item?.photo}
                    isOnline={item?.isOnline}
                  />
                  <small
                    className="d-block user-name color-7777 text-center"
                    style={{ minHeight: "30px" }}
                  >
                    {item?.name}
                  </small>
                </div>
              ))}
            </div>
            <ChatContainer
              setisChatting={setisChatting}
              chattingWith={chattingWith}
              setChattingWith={setChattingWith}
            />
          </div>
        </Container>
      )}
    </>
  );
};

export default LiveChatNavigator;
