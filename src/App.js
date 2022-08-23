import CssBaseline from '@mui/material/CssBaseline';
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateContext } from './contexts/ContextProvider';
import SignIn from "./pages/SignIn";
import WatchPage from "./pages/WatchPage";
import MemberDashboard from "./pages/memberDashboard/MemberDashboard";
import { AdminContextProvider } from "./contexts/AdminContextProvider";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import Topbar from './components/topbar/Topbar';

function App() {

  const { isSignedIn, currentMember } = useStateContext();

  return (
    <>
      <CssBaseline />
      <Router >
        <Topbar />
        <Switch>
          <Route exact path="/">
            <WatchPage />
          </Route>
          <Route exact path="/admin-dashboard">
            <AdminContextProvider>
              <AdminDashboard />
            </AdminContextProvider>
          </Route>
          <Route exact path="/member-dashboard">
            <MemberDashboard />
          </Route>         
        </Switch>
      </Router>
    </>
  );
}

export default App;
