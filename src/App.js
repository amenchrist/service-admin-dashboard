import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
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
import SignInForm from "./components/SignInForm";
import { useStateContext } from './contexts/ContextProvider';

function App() {

  const { isSignedIn } = useStateContext();

  return (
    <Router>
      {isSignedIn === false ? 
        <SignInForm />
        
        :
        <>
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
        </>
      } 
      
    </Router>
  );
}

export default App;
