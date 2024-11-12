import { useState } from "react";

const SoundEditIcon = ({
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
            d="M44 10a7.5 7.5 0 0 1 7.5 7.5v15A7.5 7.5 0 0 1 44 40H21.5a7.5 7.5 0 0 1-7.5-7.5v-15a7.5 7.5 0 0 1 7.5-7.5H44zM16.5 32.5a5 5 0 0 0 4.627 4.986l.373.014H44a5 5 0 0 0 4.986-4.627L49 32.5v-5.593l-2.367 3.76a1.25 1.25 0 0 1-1.957.203l-.15-.19-2.871-4.43H33.44l-4.357 6.916a1.25 1.25 0 0 1-1.957.204l-.15-.19-4.493-6.93-5.983-.001V32.5zm27.873-19.986L44 12.5H21.5a5 5 0 0 0-4.986 4.627l-.014.373v6.212l2.325-4.306a1.25 1.25 0 0 1 2.007-.267l.142.182 2.866 4.429h8.217l4.36-6.916a1.25 1.25 0 0 1 1.957-.204l.15.19 4.489 6.93L49 23.749V17.5a5 5 0 0 0-4.627-4.986z"
            fill-rule="nonzero"
          />
        </g>
      </svg>
    </div>
  );
};

export default SoundEditIcon;
