import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import routes from "../../routes";
import AuthLayout from "../../layouts/AuthLayout";
import Splash from "../../pages/Splash";
import AppLayout from "../../layouts/AppLayout";

const AppRoutes = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const navigateTo = useNavigate();

  useEffect(() => {
    // Check for authToken in localStorage
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setisLoggedIn(true);
    } else {
      setisLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    let timeOut = setTimeout(() => {
      setisLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return (
    <Routes>
      {isLoading ? (
        <>
          <Route path="/" element={<Splash />} />
          <Route path="*" element={<Splash />} />
        </>
      ) : (
        <Route path="/" element={!isLoggedIn ? <AuthLayout /> : <AppLayout />}>
          {!isLoggedIn
            ? routes?.authRoutes?.map((route, key) => {
                let PageComponent = route?.component;
                return (
                  <Route
                    path={route?.path}
                    element={
                      <PageComponent
                        key={key}
                        onAuthSuccess={() => setisLoggedIn(true)}
                      />
                    }
                  />
                );
              })
            : routes?.userRoutes?.map((route, key) => {
                let PageComponent = route?.component;
                return (
                  <Route
                    path={route?.path}
                    element={
                      <PageComponent
                        onLogout={() => {
                          setisLoggedIn(false);
                          navigateTo("/");
                        }}
                        key={key}
                      />
                    }
                  />
                );
              })}
        </Route>
      )}
    </Routes>
  );
};

export default AppRoutes;
