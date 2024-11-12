import { Outlet } from "react-router-dom";
import Header from "../components/globals/Header";
import UserProfileHeader from "../components/globals/UserProfileHeader";
import LiveChatNavigator from "../components/globals/LiveChatNavigator";


const AppLayout = () => {

  return (
    <main className="main">
      <Outlet />
      <LiveChatNavigator/>
    </main>
  );
};

export default AppLayout;
