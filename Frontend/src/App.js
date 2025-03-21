import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

/** Pages */
import PortfolioSummary from "./Pages/Summary";
import CryptoDetails from "./Models/DetailsModel";
/** Componentds */
import AuthForm from "./Components/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getLocal, isEmpty, sleep, ToastContainer } from "./utils/common";
import { tokenAuthenticator } from "./Actions/Actions";
import { PageLoader } from "./Components/PageLoader";
import { setuserData } from "./redux/slice";

export default function App() {

  const { userData,refresh } = useSelector(state => state?.user);

  const [token, setToken] = useState(null);

  const dispatch = useDispatch()

  const validateAuth = (comp) => {
    return token ? comp : <Navigate to={"/"} replace />;
  };

  const AuthenticateToken = async () => {
    const resp = await tokenAuthenticator();
    if (resp?.status === "success") {
      dispatch(setuserData(resp?.data))
      setToken(true);
    }
    else {
      localStorage.clear()
      ToastContainer("error", "Session expired", {
        style: {
          border: '1px solid #f1f135cf',
          "background-color": '#feff52f0',
          color: "#000"
        },
        iconTheme: {
          primary: '#000'
        }
      })
      setToken(false)
    }
  }

  useEffect(() => {
    const tok = getLocal("token");
    if (tok) AuthenticateToken();
    else {
      setToken(false);
    }
  }, [refresh]);

  if (token === null) {
    return <PageLoader />
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm type="login" />} />
        <Route path="/login" element={<AuthForm type="login" />} />
        <Route path="/register" element={<AuthForm type="register" />} />
        <Route path="/summary" element={validateAuth(<PortfolioSummary />)} />
        <Route path="/details/:id" element={validateAuth(<CryptoDetails />)} />
      </Routes>
    </Router>
  );
}
