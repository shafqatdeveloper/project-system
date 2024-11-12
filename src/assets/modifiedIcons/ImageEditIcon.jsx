import { useState } from "react";

const ImageEditIcon = ({
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
      className={className}
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
            d="M44 10a7.5 7.5 0 0 1 7.5 7.5v15A7.5 7.5 0 0 1 44 40H21.5a7.5 7.5 0 0 1-7.5-7.5v-15a7.5 7.5 0 0 1 7.5-7.5H44zm0 2.5H21.5a5 5 0 0 0-4.986 4.627l-.014.373v15a5 5 0 0 0 4.627 4.986l.373.014h5.732l10.486-10.485a6.25 6.25 0 0 1 7.488-1.026l.398.245L49 28.498V17.5a5 5 0 0 0-4.627-4.986L44 12.5zm-4.253 16.044-.262.238-8.719 8.718H44a5 5 0 0 0 4.986-4.627L49 32.5v-.998l-4.783-3.188a3.75 3.75 0 0 0-4.47.23zM25.25 15a6.25 6.25 0 1 1 0 12.5 6.25 6.25 0 0 1 0-12.5zm0 2.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5z"
            fill-rule="nonzero"
          />
        </g>
      </svg>
    </div>
  );
};

export default ImageEditIcon;
