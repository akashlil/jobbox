import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import auth from "./firebase/firebase.confige";
import { onAuthStateChanged } from "firebase/auth";
import { autoLoad, getUser } from "./features/authSlice";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getUser(user.email));
      } else {
        dispatch(autoLoad());
      }
    });
  }, []);

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
}

export default App;
