import { useState } from "react";
import { app } from "firebaseApp";
import { getAuth } from "firebase/auth";

import Router from "Router";

const App = () => {
  const auth = getAuth(app);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return <Router isAuthenticated={isAuthenticated} />;
};

export default App;
