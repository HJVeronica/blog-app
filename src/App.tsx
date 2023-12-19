import { useState, useEffect } from "react";
import { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Router from "Router";

const App = () => {
  const auth = getAuth(app);
  const [init, setInit] = useState<boolean>(false); // auth 초기화 전 확인 용도
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      setInit(true);
    });
  }, [auth]);

  return (
    <>
      <ToastContainer />
      {init ? <Router isAuthenticated={isAuthenticated} /> : "Loading..."}
    </>
  );
};

export default App;
