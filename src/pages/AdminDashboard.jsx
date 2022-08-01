import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";
import Home from "./home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./userList/UserList";
import User from "./user/User";
import NewUser from "./newUser/NewUser";
import ProductList from "./productList/ProductList";
import Product from "./product/Product";
import NewProduct from "./newProduct/NewProduct";
import AttendeesList from "./attendees/AttendeesList";
import FirstTimersList from "./first-timers/FirstTimersList";
import AbsenteesList from "./absentees/AbsenteesList";
import ComingSoon from "./comingSoon/ComingSoon";
import Overview from "./overview/Overview";
import { useStateContext } from '../contexts/ContextProvider';

function AdminDashboard() {

  const { member } = useStateContext();

  return (
    <Router>
        <Topbar />
        <div className="container">
            <Sidebar />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/attendees">
                    <AttendeesList />
                </Route>
                <Route path="/first-timers">
                    <FirstTimersList />
                </Route>
                <Route path="/absentees">
                    <AbsenteesList />
                </Route>
                <Route path="/users">
                    <UserList />
                </Route>
                <Route path="/user/:userId">
                    <User />
                </Route>
                <Route path="/newUser">
                    <NewUser />
                </Route>
                <Route path="/products">
                    <ProductList />
                </Route>
                <Route path="/product/:productId">
                    <Product />
                </Route>
                <Route path="/newproduct">
                    <NewProduct />
                </Route>
                <Route path="/overview">
                    <Overview />
                </Route>
                <Route path="/givings">
                    <ComingSoon />
                </Route>
            </Switch>
        </div>
      
    </Router>
  );
}

export default AdminDashboard;
