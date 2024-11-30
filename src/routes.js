import CodeValidation from "./pages/auth/CodeValidation";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Login from "./pages/auth/Login";
import Personalization from "./pages/auth/Personalization";
import SelectUserType from "./pages/auth/SelectUserType";
import SetupUserName from "./pages/auth/SetupUserName";
import Signup from "./pages/auth/Signup";
import BookingList from "./pages/user/BookingList";
// import LiveChat from "./pages/user/LiveChat";
import Orders from "./pages/user/Orders";
import PersonalizationLoggedIn from "./pages/user/PersonalizationLoggedIn";
import ProfileOptions from "./pages/user/ProfileOptions";
import ProviderProfilePage from "./pages/user/ProviderProfilePage";
import ShowcaseDetails from "./pages/user/ShowcaseDetails";

const routes = {
  authRoutes: [
    { path: "/", component: Login },
    { path: "/signup", component: Signup },
    { path: "/forgotpassword", component: ForgotPassword },
    { path: "/resetpassword", component: ResetPassword },
  ],
  userRoutes: [
    { path: "/", component: ProfileOptions },
    { path: "/code-validation", component: CodeValidation },
    { path: "/user-type", component: SelectUserType },
    { path: "/user-name", component: SetupUserName },
    { path: "/basic-info", component: Personalization },
    { path: "/profile", component: ProfileOptions },
    { path: "/profile/basic-info", component: PersonalizationLoggedIn },
    { path: "/profile/settings", component: ProviderProfilePage },
    { path: "/booking-list", component: BookingList },
    { path: "/orders", component: Orders },
    { path: "/showcase-details/:sId", component: ShowcaseDetails },
  ],
};

export default routes;
