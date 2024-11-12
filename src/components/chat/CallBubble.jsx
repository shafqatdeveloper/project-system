import {
  Card,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const CallBubble = ({ state, timeOfCall, onReply, type }) => {
  return (
    <>
      <UncontrolledDropdown>
        <DropdownToggle
          style={{ height: "auto" }}
          className="d-flex bg-transparent flex-row p-0 border-none align-items-center gap-2 flex-wrap"
        >
          {type === "recieved" ? (
            <>
              <Card
                className={`border-none chat-bubble d-flex align-items-center  ${type}`}
                style={{ marginBottom: "10px" }}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.088 22.292 3.71 17.913c-4.87-4.87-4.945-12.72-.225-17.681l.225-.23a2.34 2.34 0 0 1 1.888.852L9.21 5.247a1.801 1.801 0 0 1-.247 2.536L6.477 9.686a.9.9 0 0 0-.09 1.352l8.019 8.019a.9.9 0 0 0 1.352-.09l1.855-2.425a1.801 1.801 0 0 1 2.525-.337l.061.05 4.955 4.142c.516.431.822 1.06.846 1.727v.168c-4.946 4.946-12.966 4.946-17.912 0z"
                    fill="#000"
                    fill-rule="evenodd"
                  />
                </svg>
                <div>
                  <p className="f-5 m-0">
                    {state === "calling"
                      ? "Calling....."
                      : state === "in-call"
                      ? "On a call"
                      : "Missed call"}
                  </p>
                  {state === "in-call" && (
                    <small className="d-block m-0">00:01</small>
                  )}
                </div>
              </Card>
            </>
          ) : (
            <>
              <Card
                className={`border-none d-flex align-items-center flex-row chat-bubble ${type}`}
                style={{ marginBottom: "10px" }}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.088 22.292 3.71 17.913c-4.87-4.87-4.945-12.72-.225-17.681l.225-.23a2.34 2.34 0 0 1 1.888.852L9.21 5.247a1.801 1.801 0 0 1-.247 2.536L6.477 9.686a.9.9 0 0 0-.09 1.352l8.019 8.019a.9.9 0 0 0 1.352-.09l1.855-2.425a1.801 1.801 0 0 1 2.525-.337l.061.05 4.955 4.142c.516.431.822 1.06.846 1.727v.168c-4.946 4.946-12.966 4.946-17.912 0z"
                    fill="#000"
                    fill-rule="evenodd"
                  />
                </svg>
                <div>
                  <p className="f-5 m-0">
                    {state === "calling"
                      ? "Calling....."
                      : state === "in-call"
                      ? "On a call"
                      : "Missed call"}
                  </p>
                  {state === "in-call" && (
                    <small className="d-block m-0">00:01</small>
                  )}
                </div>
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
              onClick={() => onReply({ state, timeOfCall, type })}
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

export default CallBubble;
