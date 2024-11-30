import { useEffect, useRef, useState } from "react";
import {
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import recievedMessageSVG from "../../assets/designPickedIcons/recieved-message.svg";
import sentMessageSVG from "../../assets/designPickedIcons/sent-message.svg";
import moment from "moment";

const ChatBubble = ({
  type,
  messageObj,
  onReply,
  repliedTo,
  chatter,
  chattingWith,
}) => {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const toggleDropDown = () => setOptionsOpen((prev) => !prev);
  const [contentAlignMent, setContentAlignMent] = useState("");
  const contentRef = useRef();

  useEffect(() => {
    if (contentRef.current) {
      let { lineHeight, height } = getComputedStyle(contentRef.current);
      let doubleHeight = Number(lineHeight?.replace("px", "")) * 2;
      console.log("height", height);
      if (Number(height?.replace("px", "")) >= doubleHeight) {
        setContentAlignMent("align-items-start");
      } else setContentAlignMent("align-items-center");
    }
  }, []);

  const formateText = (value) => {
    let splitted = value?.split("\n");
    return splitted?.map((i, index) => (
      <span key={index}>
        {i}
        {splitted?.length > 1 && <br />}
      </span>
    ));
  };

  const ReplyCard = (
    <Card
      className="full-width mb-1 reply-card"
      style={{
        background: "#252525",
        paddingLeft: "8px",
        paddingRight: "8px",
        minWidth: "130px",
        borderRadius: "12px",
      }}
    >
      <div className="d-flex align-items-center" style={{ gap: "2px" }}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fill-rule="evenodd">
            <path d="M0 0h20v20H0z" />
            <path
              d="m9.275 3.712-5.57 5.582a1 1 0 0 0 0 1.412l5.57 5.582a1 1 0 0 0 1.708-.706v-2.184a1 1 0 0 1 .533-.882c.29-.116.767-.116 1.372-.116 1.335 0 2.397.571 3.185 1.714h-.001a.5.5 0 0 0 .91-.303c-.112-2.75-.751-4.554-1.917-5.411-.963-.708-1.886-.916-2.77-.627a1 1 0 0 1-1.312-.949V4.418a1 1 0 0 0-1.708-.706z"
              stroke="#777"
            />
          </g>
        </svg>
        <p className="color-7777 m-0">Replied</p>
      </div>
      <small className="color-7777 d-block text-start f-4">
        {type === "sent" ? chattingWith?.name : chatter?.name}{" "}
        {moment(messageObj?.date)?.format("hh:mm YYYY/MM/DD dddd")}
      </small>
      <p className="m-0 color-9999 text-start">
        {formateText(repliedTo?.text)}
      </p>
    </Card>
  );

  return (
    <>
      <UncontrolledDropdown>
        <DropdownToggle
          style={{ height: "auto" }}
          className={`d-flex bg-transparent p-0 border-none ${
            repliedTo ? "align-items-start" : contentAlignMent
          }  gap-2 `}
        >
          {type === "recieved" ? (
            <>
              <Card
                className={`border-none chat-bubble  ${type}`}
                style={{ flex: 1 }}
              >
                {repliedTo && ReplyCard}

                <p ref={contentRef} className="f-5 m-0  full-width text-start">
                  {formateText(messageObj?.content)}
                </p>
              </Card>
              <small
                style={{
                  marginTop: contentAlignMent?.includes("start") && "6px",
                }}
                className={`color-7777 d-block f-4`}
              >
                {moment(messageObj?.timestamp)?.format(`HH:mm`)}
              </small>
            </>
          ) : (
            <>
              <small
                style={{
                  marginTop: contentAlignMent?.includes("start") && "6px",
                }}
                className={`color-7777 d-block f-4`}
              >
                {moment(messageObj?.timestamp)?.format(`HH:mm`)}
              </small>
              <Card className={`border-none chat-bubble ${type}`}>
                {repliedTo && ReplyCard}

                <p ref={contentRef} className="f-5 full-width m-0 text-start">
                  {formateText(messageObj?.content)}
                </p>
              </Card>
            </>
          )}
        </DropdownToggle>
        <DropdownMenu
          style={{
            minHeight: "auto",
            overflow: "hidden",
            minWidth: "64px",
            borderRadius: "8px",
            boxShadow: "0 0px 100px 1px black",
          }}
        >
          <div style={{ background: "#333333" }}>
            <DropdownItem
              onClick={() => onReply(messageObj)}
              tag={"small"}
              className="py-2 px-4 cursor-pointer color-7777"
            >
              Reply
            </DropdownItem>
            <DropdownItem
              tag={"small"}
              className="py-2 px-4 cursor-pointer color-7777"
            >
              Copy
            </DropdownItem>
          </div>
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
};

export default ChatBubble;
