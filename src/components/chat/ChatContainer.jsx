import { Button, Card, Input } from "reactstrap";
import {
  CrossIcon,
  MessageOptionIcon,
  ReplyIcon,
} from "../../assets/designPickedIcons";
import { RxCross2 } from "react-icons/rx";
import { IoAddCircleOutline, IoAlarmOutline, IoCall } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import UserAvatar from "./UserAvatar";
import Booking from "../inputs/Booking";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddToFavourities from "../inputs/AddToFavourities";
import OrderNowCard from "../cards/OrderNowCard";
import { Link } from "react-router-dom";
import OrderTemplateModal from "./OrderTemplateModal";
import VoiceCall from "./VoiceCall";
import CallBubble from "./CallBubble";
import moment from "moment";
import { PiCaretDown } from "react-icons/pi";
import { toast } from "react-toastify";

const ChatContainer = ({ chattingWith, setChattingWith, setisChatting }) => {
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [isBooked, setisBooked] = useState(false);
  const [orderTemplateModalOpen, setOrderTemplateModalOpen] = useState(false);
  const toggleBookModal = () => setBookModalOpen((prev) => !prev);
  const [callObj, setCallObj] = useState({
    state: "idle",
    timeOfCall: 0,
    index: 0,
    type: "call",
  });

  const [messages, setMessages] = useState([
    { from: chattingWith?.id, text: "Hello there !", date: Date.now(), id: 0 },
    {
      from: chattingWith?.id,
      text: "I have something to discuss",
      date: Date.now(),
      id: 1,
    },
    { from: "", text: "Hello there !", date: Date.now(), id: 2 },
    {
      from: "",
      text: "Before you discuss ! i have to discuss something ",
      date: Date.now(),
      id: 6,
      repliedTo: 1,
    },

    {
      from: "",
      text: "I have something to discuss",
      date: Date.now(),
      id: 3,
    },
    {
      from: chattingWith?.id,
      link: "/profile/settings?goTo=3",
      templateName: "interior Design",
      date: Date.now(),
      id: 4,
    },
    {
      from: chattingWith?.id,
      date: Date.now(),
      id: 5,
      text: "Try replying to this message for that double line error , it should work as expected , and bla bla bla bla blka blas ablas",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const chatBodyRef = useRef();
  const [replyingTo, setReplyingTo] = useState(null);
  const [isAtBottom, setisAtBottom] = useState(false);

  //focusing the element on replying
  const inputElement = document.getElementById("message");
  useEffect(() => {
    if (replyingTo && inputElement) {
      inputElement?.focus();
    }
  }, [replyingTo]);
  //

  const handleSendMessage = () => {
    let obj = {
      text: newMessage,
      date: Date.now(),
      id: `message-${Math.floor(Math.random() * 1000)?.toString(16)}`,
      repliedTo: replyingTo?.id,
    };
    setMessages([...messages, obj]);
    setNewMessage("");
    if (replyingTo) {
      setReplyingTo(null);
    }
  };

  const getRepliedTo = (id) => {
    return [...messages]?.find((item) => item?.id === id);
  };

  //-------------------------------------------------------
  useEffect(() => {
    if (chatBodyRef.current) {
      let scrollHeight = chatBodyRef.current?.scrollHeight;
      chatBodyRef?.current?.scrollTo({
        top: scrollHeight,
        behaviour: "smooth",
      });
    }
  }, [messages]);

  const scrollListener = (e) => {
    if (e?.scrollTop < e?.scrollHeight - e?.clientHeight) {
      setisAtBottom(false);
    } else setisAtBottom(true);
  };

  return (
    <>
      <div className="chat-container ">
        <div className="chat-container-header">
          <div
            className="full-width d-flex align-items-center justify-content-between"
            style={{ padding: "10px" }}
          >
            <div className="d-flex">
              <UserAvatar
                isOnline={chattingWith?.isOnline}
                height={50}
                width={50}
                src={chattingWith?.photo}
                style={{ margin: "2px" }}
              />
              <MessageOptionIcon
                color={"#555"}
                hoverColor={"#999999"}
                className="cursor-pointer"
                onClick={() => {
                  setOrderTemplateModalOpen(true);
                }}
              />
            </div>
            <div>
              <h4 className="color-7777 text-center m-0">
                {chattingWith?.name}
              </h4>
              <p className="m-0 color-7777 text-center ">
                {chattingWith?.designation ?? "Designer"}
              </p>
            </div>
            <Button
              onClick={() => setisChatting(false)}
              className="grey-btn-1 p-0 full-rounded border-none"
              style={{ height: "50px", width: "50px" }}
            >
              <RxCross2 size={50} />
            </Button>
          </div>
        </div>
        <div
          className="chat-container-body d-flex flex-column py-3 px-2"
          ref={chatBodyRef}
          style={{ gap: "10px" }}
          onScroll={(e) => scrollListener(e?.target)}
        >
          {/* chat history data */}
          <small className="f-4 d-block color-7777 text-end">
            {moment(new Date())?.subtract(1, "day")?.format("YYYY/MM/D ddd")}
          </small>
          {messages?.map((messageObj, key) => {
            if (messageObj?.templateName) {
              return (
                <div
                  className={`d-flex full-width  align-items-center ${
                    chattingWith?.id === messageObj?.from
                      ? "justify-content-start"
                      : "justify-content-end"
                  }`}
                >
                  <Link
                    to={messageObj?.link}
                    className="text-decoration-none template"
                  >
                    <OrderNowCard
                      details={{ title: messageObj?.templateName }}
                      isEditable={false}
                    />
                  </Link>
                </div>
              );
            } else if (messageObj?.type === "call") {
              return (
                <div
                  className={`d-flex full-width  align-items-center ${
                    chattingWith?.id === messageObj?.from
                      ? "justify-content-start"
                      : "justify-content-end"
                  }`}
                >
                  <CallBubble
                    onReply={() =>
                      setReplyingTo({
                        ...messageObj,
                        repliedTo: messageObj?.id,
                        text: "You were in a call ",
                      })
                    }
                    state={messageObj?.state}
                    timeOfCall={messageObj?.timeOfCall}
                    type={
                      messageObj?.from === chattingWith?.id
                        ? "recieved"
                        : "sent"
                    }
                  />
                </div>
              );
            } else
              return (
                <div
                  className={`d-flex  full-width align-items-center ${
                    chattingWith?.id === messageObj?.from
                      ? "justify-content-start"
                      : "justify-content-end"
                  }`}
                >
                  <ChatBubble
                    repliedTo={getRepliedTo(messageObj?.repliedTo)}
                    onReply={() => setReplyingTo(messageObj)}
                    messageObj={messageObj}
                    type={
                      messageObj?.from === chattingWith?.id
                        ? "recieved"
                        : "sent"
                    }
                    key={key}
                    chatter={{ name: "You" }}
                    chattingWith={chattingWith}
                  />
                </div>
              );
          })}
        </div>
        <div className=" chat-container-input d-flex  position-relative">
          {isAtBottom ? (
            <Button
              style={{ right: "1%", top: "-40%" }}
              className="bg-transparent position-absolute p-0 border-none hover-color-cyan color-5555 "
            >
              <IoIosAddCircleOutline size={30} />
            </Button>
          ) : (
            <Button
              onClick={() => {
                if (chatBodyRef?.current) {
                  chatBodyRef?.current?.scrollTo({
                    top: chatBodyRef?.current?.scrollHeight,
                    behaviour: "smooth",
                  });
                }
              }}
              style={{ right: "1%", top: "-40%", borderRadius: "50%" }}
              className="grey-btn-1 p-0 position-absolute  border-none "
            >
              <PiCaretDown size={30} />
            </Button>
          )}
          <div className="full-width">
            {replyingTo && (
              <Card className="m-1 reply-card">
                <div className="d-flex align-items-center justify-content-between">
                  <div
                    style={{ gap: "2px" }}
                    className="d-flex align-items-center"
                  >
                    <div>
                      <ReplyIcon size={20} />
                    </div>
                    <p className="m-0 color-9999 text-start">
                      {replyingTo?.text?.slice(0, 50)}
                      {replyingTo?.text?.length > 50 ? "...." : null}
                    </p>
                  </div>

                  <div>
                    <CrossIcon size={20} onClick={() => setReplyingTo(false)} />
                  </div>
                </div>
              </Card>
            )}
            <Input
              type="textarea"
              className="border-none "
              id="message"
              style={{ caretColor: "#00C8C8", paddingLeft: "8px" }}
              value={newMessage}
              onChange={(e) => setNewMessage(e?.target?.value)}
              onKeyDownCapture={(e) => {
                if (e?.key?.toUpperCase() == "ENTER" && e?.shiftKey) {
                  e?.preventDefault();
                  setNewMessage(newMessage + "\n");
                } else {
                  if (e?.key?.toUpperCase() == "ENTER") {
                    e?.preventDefault();
                    if (newMessage !== "") {
                      handleSendMessage();
                      setNewMessage("");
                    } else toast.error("Cannot send empty message");
                  }
                }
              }}
            />
          </div>
          <div className="m-2">
            {chattingWith?.isOnline ? (
              <VoiceCall
                onCall={() => {}}
                onCallSuccess={(timeOfCall) => {
                  let obj = {
                    index: callObj?.index,
                    state: "in-call",
                    timeOfCall: timeOfCall,
                    type: "call",
                  };
                  let array = [...messages, obj];
                  setMessages(array);
                  setCallObj(obj);
                }}
              />
            ) : (
              <button
                onClick={toggleBookModal}
                className={`${
                  isBooked ? "orange-btn-1" : "cyan-btn"
                } full-rounded f-4 p-1 d-flex flex-column align-items-center justify-content-center`}
                style={{ height: "85px", width: "85px", aspectRatio: 1 }}
              >
                <div>
                  <IoAlarmOutline size={50} />
                </div>
                <small className="d-block">
                  {!isBooked ? "Book" : "Booked"}
                </small>
              </button>
            )}
          </div>
        </div>
      </div>

      <Booking
        onBookingSuccess={() => setisBooked(true)}
        isOpen={bookModalOpen}
        toggle={toggleBookModal}
      />
      <OrderTemplateModal
        isOpen={orderTemplateModalOpen}
        toggle={() => setOrderTemplateModalOpen((prev) => !prev)}
      />
    </>
  );
};

export default ChatContainer;