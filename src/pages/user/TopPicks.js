import { Container } from "reactstrap";
import TopPickLargeCard from "../../components/cards/TopPickLargeCard";
import { topPicks } from "../../dummyData";

const TopPicks = () => {
  return (
    <div className="px-lg-5 px-3 py-4">
      {topPicks?.map((item, key) => (
        <TopPickLargeCard data={item} key={key} />
      ))}
    </div>
  );
};

export default TopPicks;
