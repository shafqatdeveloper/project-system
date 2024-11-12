import moment from "moment";
import { useEffect, useRef, useState } from "react";

const VoiceCall = ({ onCall, onCallSuccess }) => {
  const [callState, setCallState] = useState("not-called");
  const callRecieveMoment = useRef();
  const [timeofCall, setTimeOfCall] = useState(0);

  useEffect(() => {
    let interval, timeOut;
    if (callState === "calling") {
      onCall(callState);
      timeOut = setTimeout(() => {
        setCallState("on-call");
      }, 1000);
    }
    if (callState === "on-call") {
      callRecieveMoment.current = moment(new Date());
      onCallSuccess(
        moment(new Date()).subtract(callRecieveMoment.current).format("mm:ss ")
      );

      interval = setInterval(() => {
        setTimeOfCall(
          moment(new Date())
            .subtract(callRecieveMoment.current)
            .format("mm:ss ")
        );
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
      if (timeOut) clearTimeout(timeOut);
    };
  }, [callState]);

  const renderCallButton = () => {
    switch (callState) {
      case "not-called":
        return (
          <svg
            width="51"
            height="51"
            viewBox="0 0 51 51"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m15.804 43.619-8.42-8.42c-9.366-9.366-9.51-24.461-.432-34.003l.432-.443a4.5 4.5 0 0 1 3.63 1.639l6.95 8.448a3.464 3.464 0 0 1-.475 4.876l-4.783 3.66a1.732 1.732 0 0 0-.172 2.601l15.42 15.42a1.732 1.732 0 0 0 2.6-.172l3.567-4.664a3.464 3.464 0 0 1 4.856-.647l.117.094 9.528 7.966c.993.83 1.581 2.04 1.628 3.323v.322c-9.512 9.512-24.934 9.512-34.446 0z"
              fill="#FFF"
              fill-rule="evenodd"
            />
          </svg>
        );
      case "calling":
        return (
          <>
            <svg
              width="64"
              height="30"
              viewBox="0 0 64 30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fill-rule="evenodd">
                <path d="M0 0h64v30H0z" />
                <path
                  d="M26.357 2.5h11.908c13.245 0 24.02 10.572 24.349 23.738l.008.619a4.5 4.5 0 0 1-3.727 1.408l-10.888-1.06a3.464 3.464 0 0 1-3.112-3.784l.794-5.97a1.732 1.732 0 0 0-1.717-1.96H22.165a1.732 1.732 0 0 0-1.717 1.96l.776 5.82a3.464 3.464 0 0 1-2.976 3.891l-.15.017-12.37 1.104a4.548 4.548 0 0 1-3.5-1.198L2 26.857C2 13.405 12.905 2.5 26.357 2.5z"
                  fill="#FFF"
                />
              </g>
            </svg>
            <span className="d-flex align-items-center justify-content-center color-ffff">
              .....
            </span>
          </>
        );
      case "on-call":
        return (
          <>
            <svg
              width="64"
              height="30"
              viewBox="0 0 64 30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fill-rule="evenodd">
                <path d="M0 0h64v30H0z" />
                <path
                  d="M26.357 2.5h11.908c13.245 0 24.02 10.572 24.349 23.738l.008.619a4.5 4.5 0 0 1-3.727 1.408l-10.888-1.06a3.464 3.464 0 0 1-3.112-3.784l.794-5.97a1.732 1.732 0 0 0-1.717-1.96H22.165a1.732 1.732 0 0 0-1.717 1.96l.776 5.82a3.464 3.464 0 0 1-2.976 3.891l-.15.017-12.37 1.104a4.548 4.548 0 0 1-3.5-1.198L2 26.857C2 13.405 12.905 2.5 26.357 2.5z"
                  fill="#FFF"
                />
              </g>
            </svg>
            <span className="d-flex align-items-center f-4 justify-content-center color-ffff">
              {timeofCall}
            </span>
          </>
        );
    }
  };
  const renderButtonClass = () => {
    switch (callState) {
      case "not-called":
        return "bg-green";
      case "calling":
        return "bg-red";
      case "on-call":
        return "bg-red";
    }
  };

  const onCLick = () => {
    if (callState === "not-called") {
      setCallState("calling");
    }
    if (callState === "on-call" || callState === "calling") {
      setCallState("not-called");
    }
  };

  return (
    <button
      onClick={onCLick}
      className={`call-btn ${renderButtonClass()} p-1 align-items-center justify-content-center`}
    >
      {renderCallButton()}
    </button>
  );
};

export default VoiceCall;
