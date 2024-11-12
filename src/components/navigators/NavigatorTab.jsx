import { Button } from "reactstrap";

const NavigatorTab = ({ items, onItemClick, flowAt, className, style }) => {
  return (
    <div
      style={style}
      className={`${className} d-flex navigator-tab align-items-center`}
    >
      {items?.map((item, key) => (
        <Button
          key={key}
          onClick={() => onItemClick(item)}
          className={`navigator-btn f-4   full-width ${
            item?.flowAt === flowAt ? "active" : ""
          }`}
        >
          {item?.title}
        </Button>
      ))}
    </div>
  );
};

export default NavigatorTab;
