import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward, CodeSharp } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect, useState } from "react";

export default function FeaturedInfo() {

  const { attendanceRecords, serviceDate, members, lastWeekDate, setAttendees, setAttendanceRecords } = useStateContext();
  

  const attendees = getAttendees(members, serviceDate);
  //setAttendanceRecords(attendees);
  const totalAttendance = getTotalAttendance(attendees, serviceDate);
  const totalAttendanceLastWeek =  getTotalAttendance(members, lastWeekDate);
  const attendanceDifference = (totalAttendance - totalAttendanceLastWeek);

  const firstTimers = getFirstTimers(members, serviceDate);
  const totalFirstTimers = getTotalAttendance(firstTimers, serviceDate);
  const firstTimersLastWeek = getFirstTimers(members, lastWeekDate);
  const totalFirstTimersLastWeek = getTotalAttendance(firstTimersLastWeek, lastWeekDate);
  const firstTimerDifference = totalFirstTimers - totalFirstTimersLastWeek;

  useEffect(()=>{
    setAttendanceRecords(attendees)
  }, [serviceDate])

  //console.log(totalFirstTimersLastWeek);
  //const oldMembers = members.filter(member => member.attendanceRecords.length !== 1);
  //const absentees = oldMembers.filter(member => member.attendanceRecords.filter(rec => rec.date === serviceDate).length === 0);

  const absentees = getAbsentees(members, serviceDate)
  const absenteesLastWeek = getAbsentees(members, lastWeekDate);
  const absenteeDifference = absentees.length - absenteesLastWeek.length;
  // console.log(members);

  console.log(attendanceRecords)

  function getTotalAttendance(membersArray, date){
    if(membersArray.length > 0){
      const relevantMembers = membersArray.filter(member => member.attendanceRecords.filter(record => record.date === date ).length > 0 )
      const relevantTotalAttendance = relevantMembers.map(e => e.attendanceRecords).flat().filter(e => e.date === date).map(e => e.attendees).reduce((a,b) =>a+b, 0);
      return relevantTotalAttendance;

    } else {
      return 0
    }
  }

  function getAttendees(membersArray, date){
    const relevantMembers = membersArray.filter(member => member.attendanceRecords.filter(record => record.date === date ).length > 0 )
    const attRecords = relevantMembers.map(m => {
      return {...m, attendanceRecords: m.attendanceRecords.filter(record => record.date === date ) }
    })
    //console.log(attRecords);
    return attRecords;
  }
  
  function getFirstTimers(membersArray, date){
    const dateArray = date.split(".")
    const day = parseInt(dateArray[0]);
    const month = parseInt(dateArray[1])-1;
    const year = parseInt(dateArray[2]);

    const startTime = new Date(year,month,day).getTime()/1000;
    const endTime = startTime + 86400
    if(membersArray.length > 0){
      const relevantMembers = membersArray.filter(member => member.attendanceRecords.filter(record => record.date === date ).length > 0 )
      //console.log(relevantMembers)
      if(relevantMembers.length > 0){
        
        relevantMembers.forEach(mem => mem.attendanceRecords.sort((e1, e2) => e1.time - e2.time))
        // relevantMembers.sort( (e1, e2) => {
        //   return e1.time - e2.time;
        // })
        const attRecords = relevantMembers.filter(m => m.attendanceRecords[0].time > startTime && m.attendanceRecords[0].time < endTime)
        // console.log(attRecords);
        // console.log(date)
        return attRecords
        ;
      }else {
        return []
      }
    } else {
      return []
    }
  }

  function getAbsentees(membersArray, date){
    const dateArray = date.split(".")
    const day = parseInt(dateArray[0]);
    const month = parseInt(dateArray[1])-1;
    const year = parseInt(dateArray[2]);

    const startTime = new Date(year,month,day).getTime()/1000;
    if(membersArray.length > 0){
      const relevantMembers = membersArray.filter(member => member.attendanceRecords.filter(record => record.date !== date ).length > 0 )
      if(relevantMembers.length > 0){
        // console.log(relevantMembers)
        relevantMembers.forEach(mem => mem.attendanceRecords.sort((e1, e2) => e1.time - e2.time))
        const attRecords = relevantMembers.filter(m => m.attendanceRecords[0].time < startTime )
        // console.log(attRecords);
        // console.log(date)
        return attRecords
        
      }else {
        return []
      }
    } else {
      return []
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
