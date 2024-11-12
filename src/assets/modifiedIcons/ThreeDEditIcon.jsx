import { useState } from "react";

const ThreeDEditIcon = ({
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
            d="M44 10a7.5 7.5 0 0 1 7.5 7.5v15A7.5 7.5 0 0 1 44 40H21.5a7.5 7.5 0 0 1-7.5-7.5v-15a7.5 7.5 0 0 1 7.5-7.5H44zm0 2.5H21.5a5 5 0 0 0-4.986 4.627l-.014.373v15a5 5 0 0 0 4.627 4.986l.373.014H44a5 5 0 0 0 4.986-4.627L49 32.5v-15a5 5 0 0 0-4.627-4.986L44 12.5zM26.267 18c1.244 0 2.242.397 2.994 1.19.62.65.93 1.384.93 2.202 0 1.16-.635 2.086-1.904 2.778.758.162 1.364.526 1.818 1.091.454.565.68 1.248.68 2.048 0 1.16-.423 2.15-1.271 2.967-.848.818-1.904 1.227-3.166 1.227-1.197 0-2.19-.344-2.977-1.033-.788-.688-1.245-1.589-1.371-2.701l2.453-.298c.079.625.29 1.104.632 1.434.343.331.758.496 1.245.496a1.71 1.71 0 0 0 1.321-.595c.358-.397.537-.932.537-1.606 0-.637-.172-1.142-.514-1.515a1.64 1.64 0 0 0-1.254-.56c-.325 0-.713.064-1.164.19l.28-2.065c.685.018 1.209-.131 1.57-.447.36-.316.54-.735.54-1.258 0-.445-.132-.8-.396-1.064-.265-.265-.617-.397-1.056-.397-.433 0-.802.15-1.11.45-.306.301-.492.74-.558 1.318l-2.337-.397c.163-.8.408-1.439.736-1.917.327-.478.784-.854 1.37-1.128.587-.273 1.244-.41 1.972-.41zm11.527.054c1.1 0 1.94.084 2.517.253.776.228 1.44.634 1.993 1.217.553.584.974 1.298 1.263 2.143.289.845.433 1.886.433 3.125 0 1.089-.135 2.027-.406 2.814-.33.963-.803 1.741-1.416 2.337-.463.45-1.088.802-1.876 1.055-.59.186-1.377.28-2.364.28h-5.024V18.054h4.88zm-.745 2.238h-1.465v8.758h1.994c.745 0 1.284-.042 1.614-.127a2.464 2.464 0 0 0 1.078-.55c.286-.258.519-.684.7-1.276.18-.593.27-1.4.27-2.422 0-1.022-.09-1.807-.27-2.354-.181-.548-.434-.975-.758-1.281-.325-.307-.737-.514-1.236-.623-.342-.077-.984-.119-1.927-.125z"
            fill-rule="nonzero"
          />
        </g>
      </svg>
    </div>
  );
};

export default ThreeDEditIcon;