import logo from "../../assets/logo.png";
import SearchBar from "../../components/inputs/SearchBar";
import playstoreImg from "../../assets/playstore.png";
import appstoreImg from "../../assets/appstore.png";
import { useScreenWidth } from "../../utils";
import { Button, Table } from "reactstrap";
import { dummyOrders } from "../../dummyData";

import moment from "moment";
import { useEffect, useState } from "react";
import OrderTableRow from "../../components/tableRows/OrderTableRow";
import OrderSmScreen from "../../components/smallScreensComponents/OrderSmScreen";

const Orders = () => {
  const { isSmaller } = useScreenWidth(576);
  const [currentItemsShown, setCurrentItemsShown] = useState(dummyOrders);
  const [isSearching, setisSearching] = useState(false);
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const searchByCondition = (item) => {
    let criteria = `${item?.type}`?.toUpperCase();
    if (criteria?.includes(searchValue?.toUpperCase())) return true;
  };

  useEffect(() => {
    if (searchValue === "") {
      setisSearching(false);
    } else {
      setisSearching(true);
      let results = [...currentItemsShown]?.filter((item) =>
        searchByCondition(item)
      );
      setSearchedResults(results);
    }
  }, [searchValue]);

  return (
    <div>
      {!isSmaller && (
        <div className="full-width d-flex align-items-center  align-items-center flex-wrap justify-content-between p-3">
          <div className="auth-logo-container m-0" style={{ width: "414px" }}>
            <img
              src={logo}
              height={26}
              width={46}
              className="object-fit-contain"
            />
          </div>
          <SearchBar
            value={searchValue}
            setValue={setSearchValue}
            placeholder={"Search Order By Name"}
          />
          <div className="d-flex flex-column">
            <img
              src={appstoreImg}
              height={45}
              width={140}
              className="object-fit-contain"
            />
            <img
              src={playstoreImg}
              height={45}
              width={140}
              className="object-fit-contain"
            />
          </div>
        </div>
      )}
      <div
        className="full-width px-xl-5 px-lg-4"
        style={{ height: "70vh", overflowY: "scroll", overflowX: "hidden" }}
      >
        {!isSmaller ? (
          <Table responsive>
            <tr>
              <th className="color-7777 f-4">Order Name</th>
              <th className="color-7777 f-4">Order Date</th>
              <th className="color-7777 f-4">Delivery Date</th>
              <th className="color-7777 f-4">Total</th>
              <th className="color-7777 f-4">Status</th>
            </tr>
            <tbody>
              {!isSearching
                ? currentItemsShown?.map((item, key) => (
                    <OrderTableRow item={item} key={key} />
                  ))
                : searchedResults?.map((item, key) => (
                    <OrderTableRow item={item} key={key} />
                  ))}
            </tbody>
          </Table>
        ) : (
          <div>
            {!isSearching
              ? currentItemsShown?.map((item, key) => (
                  <OrderSmScreen item={item} key={key} />
                ))
              : searchedResults?.map((item, key) => (
                  <OrderSmScreen item={item} key={key} />
                ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
