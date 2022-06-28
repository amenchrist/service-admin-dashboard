import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <Link to="/attendees" className="link">
          <span className="featuredTitle">Today's Attendance</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">2,415</span>
            <span className="featuredMoneyRate">
              -11.4 <ArrowDownward  className="featuredIcon negative"/>
            </span>
          </div>
          <span className="featuredSub">Compared to last Week</span>
        </Link>
      </div>
      <div className="featuredItem">
        <Link to="/first-timers" className="link">
          <span className="featuredTitle">First Timers</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">4,415</span>
            <span className="featuredMoneyRate">
              -1.4 <ArrowDownward className="featuredIcon negative"/>
            </span>
          </div>
          <span className="featuredSub">Compared to last Week</span>
        </Link>
      </div>
      <div className="featuredItem">
        <Link to="/absentees" className="link">
          <span className="featuredTitle">Absentees</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">2,225</span>
            <span className="featuredMoneyRate">
              +2.4 <ArrowUpward className="featuredIcon"/>
            </span>
          </div>
          <span className="featuredSub">Compared to last Week</span>
        </Link>
      </div>
    </div>
  );
}
