import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect, useState } from "react";

export default function FeaturedInfo() {

  const { attendanceRecords, serviceDate, server } = useStateContext();
  const [members, setMembers] = useState([])

  const totalAttendance = attendanceRecords.map(e => e.attendanceRecords).flat().filter(e => e.date === serviceDate).map(e => e.attendees).reduce((a,b) =>a+b, 0);
  const firstTimers = attendanceRecords.filter(rec => rec.attendanceRecords.length === 1);

  
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const options = {
      signal: signal
    }
    const allMembersUrl = `${server}/members/`;
    fetch(allMembersUrl, options).then(res => res.json()).then(res => {
      console.log(res);
      setMembers(res);
    }).catch(e => {
      console.log(e);
    });

    return () => {
      //cancel the request before the compnent unmounts
      controller.abort();
    }
  }, [])

  //members.filter(member => member.attendanceRecords.filter(rec => rec.date !== serviceDate) && rec.)

  const oldMembers = members.filter(member => member.attendanceRecords.length !== 1)
  const absentees = oldMembers.filter(member => member.attendanceRecords.filter(rec => rec.date === serviceDate).length === 0)

  //console.log(absentees)
  

  return (
    <div className="featured">
      <div className="featuredItem">
        <Link to="/attendees" className="link">
          <span className="featuredTitle">Total Attendance</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{totalAttendance}</span>
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
            <span className="featuredMoney">{firstTimers.length}</span>
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
            <span className="featuredMoney">{absentees.length}</span>
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
