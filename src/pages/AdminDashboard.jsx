import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";
import Home from "./home/Home";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
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
import { useState } from "react";

import { AdminContextProvider, useAdminStateContext } from '../contexts/AdminContextProvider';

function AdminDashboard() {

  const { member } = useStateContext();
  const { home, attendeesList, firstTimersList, absenteesList } = useAdminStateContext();

 
  const [userList, setUserList] = useState(true);
  const [user, setUser] = useState(true);
  const [newUser, setNewUser] = useState(true);
  const [productList, setProductList] = useState(true);
  const [product, setProduct] = useState(true);
  const [newProduct, setNewProduct] = useState(true);
  const [overView, setOverView] = useState(true);
  const [comingSoon, setComingSoon] = useState(true);

  const page = () => {
    console.log(home)
    switch(true){
        case attendeesList:
            return (<AttendeesList />)
        case firstTimersList:
            return (<FirstTimersList />)
        case absenteesList:
            return (<AbsenteesList />)
        default:
            return (<Home />)
    }
  }

  return (
    <>
        <Topbar />
        <div className="container">
            <Sidebar />
            {page()}
        </div>
     </>
    // <Router>
    //     <Topbar />
    //     <div className="container">
    //         <Sidebar />
    //         <Switch>
    //             <Route exact path="/admin-dashboard">
    //                 <Home />
    //             </Route>
    //             <Route path="/admin-dashboard/attendees">
    //                 <AttendeesList />
    //             </Route>
    //             <Route path="/admin-dashboard/first-timers">
    //                 <FirstTimersList />
    //             </Route>
    //             <Route path="/admin-dashboard/absentees">
    //                 <AbsenteesList />
    //             </Route>
    //             <Route path="/admin-dashboard/users">
    //                 <UserList />
    //             </Route>
    //             <Route path="/admin-dashboard/user/:userId">
    //                 <User />
    //             </Route>
    //             <Route path="/admin-dashboard/newUser">
    //                 <NewUser />
    //             </Route>
    //             <Route path="/admin-dashboard/products">
    //                 <ProductList />
    //             </Route>
    //             <Route path="/admin-dashboard/product/:productId">
    //                 <Product />
    //             </Route>
    //             <Route path="/admin-dashboard/newproduct">
    //                 <NewProduct />
    //             </Route>
    //             <Route path="/admin-dashboard/overview">
    //                 <Overview />
    //             </Route>
    //             <Route path="/admin-dashboard/givings">
    //                 <ComingSoon />
    //             </Route>Redirect
    //             <Route path="/member-dashboard">
    //                 <Redirect to='/member-dashboard' />
    //             </Route>Redirect
    //         </Switch>
    //     </div>
      
    // </Router>
  );
}

export default AdminDashboard;
