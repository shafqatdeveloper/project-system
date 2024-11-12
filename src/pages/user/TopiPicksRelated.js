import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopPickLargeCard from "../../components/cards/TopPickLargeCard";
import { topPicks } from "../../dummyData";

const TopiPicksRelated = () => {
  const { relatedTo } = useParams();
  const [relatedTopPicks, setRelatedTopPicks] = useState([]);

  useEffect(() => {
    let array = [...topPicks]?.filter((item) =>
      item?.keywords?.includes(relatedTo)
    );
    setRelatedTopPicks(array);
  }, [relatedTo]);

  return (
    <div className="px-lg-5 px-3 py-4">
      {relatedTopPicks?.length === 0 ? (
        <small>Nothing found under such keyword</small>
      ) : (
        relatedTopPicks?.map((item, key) => (
          <TopPickLargeCard activeKeyword={relatedTo} data={item} key={key} />
        ))
      )}
    </div>
  );
};

export default TopiPicksRelated;
