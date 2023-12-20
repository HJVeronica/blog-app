import { useState, useEffect, useContext } from "react";
import { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ThemeContext from "context/ThemeContext";

import Router from "Router";
import Loader from "components/Loader";

const App = () => {
  const context = useContext(ThemeContext);
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
    <div className={context.theme === "light" ? "light" : "dark"}>
      <ToastContainer />
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
    </div>
  );
};

export default App;
