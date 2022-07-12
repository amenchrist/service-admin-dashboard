import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { getAbsentees } from "../../functions";
import { useEffect, useState } from "react";

export default function FeaturedInfo() {

  const { serviceDate, members, lastWeekDate, absentees, attendees, firstTimers } = useStateContext();

  const [ totalAttendance, setTotalAttendance ] = useState(0);
  const [ totalAttendanceLastWeek, setTotalAttendanceLastWeek ] = useState([]);
  const [ totalFirstTimers, setTotalFirstTimers ] = useState([]);
  const [ totalFirstTimersLastWeek, setTotalFirstTimersLastWeek ] = useState([]);
  const [ absenteesLastWeek, setAbsenteesLastWeek ] = useState([]);

  useEffect(()=>{
    setTotalAttendance(getTotalAttendance(attendees, serviceDate));
    setTotalAttendanceLastWeek(getTotalAttendance(attendees, lastWeekDate));
    setTotalFirstTimers(getTotalAttendance(firstTimers, serviceDate));
    setTotalFirstTimersLastWeek(getTotalAttendance(firstTimers, lastWeekDate));
    setAbsenteesLastWeek(getAbsentees(members, lastWeekDate));
  }, [attendees, firstTimers, members, serviceDate, lastWeekDate])

  // const totalAttendance = getTotalAttendance(attendees, serviceDate);
  // const totalAttendanceLastWeek =  getTotalAttendance(members, lastWeekDate);
  const attendanceDifference = (totalAttendance - totalAttendanceLastWeek);

  // const firstTimers = getFirstTimers(members, serviceDate);
  // const totalFirstTimers = getTotalAttendance(firstTimers, serviceDate);
  // const firstTimersLastWeek = getFirstTimers(members, lastWeekDate);
  // const totalFirstTimersLastWeek = getTotalAttendance(firstTimersLastWeek, lastWeekDate);
  const firstTimerDifference = totalFirstTimers - totalFirstTimersLastWeek;

  // const absenteesLastWeek = getAbsentees(members, lastWeekDate);
  const absenteeDifference = absentees.length - absenteesLastWeek.length;

  //console.log(totalFirstTimersLastWeek);
  //const oldMembers = members.filter(member => member.attendanceRecords.length !== 1);
  //const absentees = oldMembers.filter(member => member.attendanceRecords.filter(rec => rec.date === serviceDate).length === 0);

  // const absentees = getAbsentees(members, serviceDate);
  
  // console.log(members);

  function getTotalAttendance(membersArray, date){
    if(membersArray.length > 0){
      const relevantMembers = membersArray.filter(member => member.attendanceRecords.filter(record => record.date === date ).length > 0 )
      const relevantTotalAttendance = relevantMembers.map(e => e.attendanceRecords).flat().filter(e => e.date === date).map(e => e.attendees).reduce((a,b) =>a+b, 0);
      return relevantTotalAttendance;

    } else {
      return 0
    }
  }

  return (
    <div className="featured">
      <div className="featuredItem">
        <Link to="/attendees" className="link">
          <span className="featuredTitle">Total Attendance</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{totalAttendance}</span>
            <span className="featuredMoneyRate">
            {attendanceDifference}{attendanceDifference > 0 ? (<ArrowUpward className="featuredIcon"/>) : (<ArrowDownward  className="featuredIcon negative"/>) }
            </span>
          </div>
          <span className="featuredSub">Compared to last Week</span>
        </Link>
      </div>
      <div className="featuredItem">
        <Link to="/first-timers" className="link">
          <span className="featuredTitle">First Timers</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{totalFirstTimers}</span>
            <span className="featuredMoneyRate">
            {firstTimerDifference}{firstTimerDifference > 0 ? (<ArrowUpward className="featuredIcon"/>) : (<ArrowDownward  className="featuredIcon negative"/>) }
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
            {absenteeDifference}{absenteeDifference > 0 ? (<ArrowUpward className="featuredIcon"/>) : (<ArrowDownward  className="featuredIcon negative"/>) }
            </span>
          </div>
          <span className="featuredSub">Compared to last Week</span>
        </Link>
      </div>
    </div>
  );
}
