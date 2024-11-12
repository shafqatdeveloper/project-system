import { useState } from "react";

const LinkEditIcon = ({
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
            d="M44 10a7.5 7.5 0 0 1 7.5 7.5v15A7.5 7.5 0 0 1 44 40H21.5a7.5 7.5 0 0 1-7.5-7.5v-15a7.5 7.5 0 0 1 7.5-7.5H44zm0 2.5H21.5a5 5 0 0 0-4.986 4.627l-.014.373v15a5 5 0 0 0 4.627 4.986l.373.014H44a5 5 0 0 0 4.986-4.627L49 32.5v-15a5 5 0 0 0-4.627-4.986L44 12.5zm-23.75 5a1.25 1.25 0 0 1 1.23 1.025l.02.225V30h1.25a1.25 1.25 0 0 1 .225 2.48l-.225.02h-2.5a1.25 1.25 0 0 1-1.23-1.025L19 31.25v-12.5c0-.69.56-1.25 1.25-1.25zm18.75 0a1.25 1.25 0 0 1 1.23 1.025l.02.225v5.735l4.116-4.119a1.25 1.25 0 0 1 1.913 1.595l-.145.173-4.117 4.116 4.117 4.116a1.25 1.25 0 0 1-1.595 1.913l-.173-.145-4.116-4.117v3.233a1.25 1.25 0 0 1-2.48.225l-.02-.225v-12.5c0-.69.56-1.25 1.25-1.25zm-3.75 3.75a1.25 1.25 0 0 1 1.23 1.025l.02.225v8.75a1.25 1.25 0 0 1-2.48.225L34 31.25v-7.5h-2.5v7.5a1.25 1.25 0 0 1-2.48.225L29 31.25V22.5c0-.69.56-1.25 1.25-1.25h5zm-8.75 0a1.25 1.25 0 0 1 1.23 1.025l.02.225v8.75a1.25 1.25 0 0 1-2.48.225l-.02-.225V22.5c0-.69.56-1.25 1.25-1.25zm0-3.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z"
            fill-rule="nonzero"
          />
        </g>
      </svg>
    </div>
  );
};

export default LinkEditIcon;
