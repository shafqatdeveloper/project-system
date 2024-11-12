import { ToastContainer } from "react-toastify";
import "./App.css";
import AppRoutes from "./components/globals/AppRoutes";

function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer theme="dark" />
    </>
  );
}

export default App;
