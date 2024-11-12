import { useState } from "react";

const VideoEditIcon = ({
  className,
  height,
  width,
  color,
  hoverColor,
  activeColor,
  isActive,
}) => {
  const [currentColor, setCurrentColor] = useState(color);

  return (
    <div
      className={`${className}`}
      onMouseOver={() => setCurrentColor(hoverColor)}
      onMouseLeave={() => setCurrentColor(color)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 65 50"
      >
        <g fill="none" fill-rule="evenodd">
          <path d="M0 0h65v50H0z" />
          <path
            fill={isActive ? activeColor : currentColor}
            xmlns="http://www.w3.org/2000/svg"
            d="M44 10a7.5 7.5 0 0 1 7.5 7.5v15A7.5 7.5 0 0 1 44 40H21.5a7.5 7.5 0 0 1-7.5-7.5v-15a7.5 7.5 0 0 1 7.5-7.5H44zm5 7.5H16.5v15a5 5 0 0 0 4.627 4.986l.373.014H44a5 5 0 0 0 4.986-4.627L49 32.5v-15zm-18.75 3.75c.27 0 .534.088.75.25l6 4.5a1.875 1.875 0 0 1 0 3l-6 4.5a1.25 1.25 0 0 1-2-1v-10c0-.69.56-1.25 1.25-1.25zM24 12.5h-2.5a4.998 4.998 0 0 0-4.33 2.5H24v-2.5zm12.5 0H29V15h7.5v-2.5zm7.5 0h-2.5V15h6.831a5 5 0 0 0-3.958-2.486L44 12.5z"
            fill-rule="nonzero"
          />
        </g>
      </svg>
    </div>
  );
};

export default VideoEditIcon;
