import { Card, Container } from "reactstrap";
import { dummyUsers } from "../../dummyData";
import ChatContainer from "../../components/chat/ChatContainer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserAvatar from "../../components/chat/UserAvatar";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../services/userServices";

const LiveChat = () => {
  const [chattingWith, setChattingWith] = useState(dummyUsers[0]);

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div
        className="d-flex full-width"
        style={{ background: "#252525", borderRadius: "30px" }}
      >
        <div className="chat-sidebar">
          {dummyUsers?.map((item, key) => (
            <div
              onClick={() => setChattingWith(item)}
              key={key}
              className="d-flex flex-column cursor-pointer full-width align-items-center"
              style={{ marginBottom: "5px" }}
            >
              <UserAvatar
                height={50}
                width={50}
                src={item?.photo}
                isOnline={item?.isOnline}
              />
              <small
                className="d-block color-7777 text-center"
                style={{ minHeight: "30px" }}
              >
                {item?.name}
              </small>
            </div>
          ))}
        </div>
        <ChatContainer
          chattingWith={chattingWith}
          setChattingWith={setChattingWith}
        />
      </div>
    </Container>
  );
};

export default LiveChat;
