import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import CssBaseline from '@mui/material/CssBaseline';
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import AttendeesList from "./pages/attendees/AttendeesList";
import FirstTimersList from "./pages/first-timers/FirstTimersList";
import AbsenteesList from "./pages/absentees/AbsenteesList";
import ComingSoon from "./pages/comingSoon/ComingSoon";
import Overview from "./pages/overview/Overview";
import { useStateContext } from './contexts/ContextProvider';
import SignIn from "./pages/SignIn";
import AdminDashboard from "./pages/AdminDashboard";
import WatchPage from "./pages/WatchPage";
import MemberDashboard from "./pages/memberDashboard/MemberDashboard";

function App() {

  const { isSignedIn, currentMember } = useStateContext();

  return (
    <>
      <CssBaseline />
      <WatchPage />
      {/* {isSignedIn === false ? 
        <SignIn />
        // <MemberDashboard/>
        :
        <>
          {currentMember.role === "Admin" ?
            <AdminDashboard />
            :
            <WatchPage />
          }
        </>
      }  */}
      
    </>
  );
}

export default App;
