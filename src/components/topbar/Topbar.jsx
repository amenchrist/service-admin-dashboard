import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useStateContext } from '../../contexts/ContextProvider';

export default function Topbar() {
  const { churchName, setIsSignedIn } = useStateContext();

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to="/" className="link">
            <span className="logo">{churchName}</span>
          </Link>
          
        </div>
        <div className="topRight">
          <Link to="/" className="link">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          </Link>
          <Link to="/admin-dashboard" className="link">
            <div className="topbarIconContainer">
              <Language />
              <span className="topIconBadge">2</span>
            </div>
          </Link>
          <div className="topbarIconContainer">
            <Settings />
          </div>
            {/* <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" onClick={() => setIsSignedIn(false)} /> */}
          <Link to="/member-dashboard" className="link">
            <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
          </Link>
        </div>
      </div>
    </div>
  );
}
