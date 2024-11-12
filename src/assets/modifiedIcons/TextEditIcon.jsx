import { useState } from "react";

const TextEditIcon = ({
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
            d="M44 10a7.5 7.5 0 0 1 7.5 7.5v15A7.5 7.5 0 0 1 44 40H21.5a7.5 7.5 0 0 1-7.5-7.5v-15a7.5 7.5 0 0 1 7.5-7.5H44zm0 2.5H21.5a5 5 0 0 0-4.986 4.627l-.014.373v15a5 5 0 0 0 4.627 4.986l.373.014H44a5 5 0 0 0 4.986-4.627L49 32.5v-15a5 5 0 0 0-4.627-4.986L44 12.5zm-3.75 5a1.25 1.25 0 0 1 .225 2.48l-.225.02H34v11.25a1.25 1.25 0 0 1-2.48.225l-.02-.225V20h-6.25a1.25 1.25 0 0 1-.225-2.48l.225-.02h15z"
            fill-rule="nonzero"
          />
        </g>
      </svg>
    </div>
  );
};

export default TextEditIcon;
