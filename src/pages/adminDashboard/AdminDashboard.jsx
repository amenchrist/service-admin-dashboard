import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
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
import { useStateContext } from '../../contexts/ContextProvider';
import { useState } from "react";

import { useAdminStateContext } from '../../contexts/AdminContextProvider';

function AdminDashboard() {

  const { member } = useStateContext();
  const {  dashboardState } = useAdminStateContext();
  const { home, attendeesList, firstTimersList, absenteesList, userList, overview, comingSoon } = dashboardState;
 
  const page = () => {
    // console.log(home)
    switch(true){
        case attendeesList:
            return (<AttendeesList />)
        case firstTimersList:
            return (<FirstTimersList />)
        case absenteesList:
            return (<AbsenteesList />)
        case userList:
            return (<UserList />)
        case overview:
            return (<Overview />)
        case comingSoon:
            return (<ComingSoon />)
        default:
            return (<Home />)
    }
  }

  return (
    <>
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
    //             </Route>
    //             <Route path="/member-dashboard">
    //                 <Redirect to='/' />
    //             </Route>
    //         </Switch>
    //     </div>
      
    // </Router>
  );
}

export default AdminDashboard;
