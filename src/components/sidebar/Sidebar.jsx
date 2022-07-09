import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  PermIdentity,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStateContext } from '../../contexts/ContextProvider';

export default function Sidebar() {


  const { setAttendanceRecords, serviceDate, setServiceDate, dates, setDates, server, setLastWeekDate } = useStateContext();


  //Get 

  useEffect(()=> {
    const controller = new AbortController();
    const signal = controller.signal;
    const options = {
      signal: signal
    }
    const datesUrl = `${server}/attendees/`;

    fetch(datesUrl, options).then(res => res.json()).then(res => {

      const fullDateObjs = res.map(date => convertDateToDateStringObj(date)).sort( (e1, e2) => {
        return epochConvertDate(e2.date).fullDate - epochConvertDate(e1.date).fullDate;
      } )
  
      setDates(fullDateObjs)
      setServiceDate(fullDateObjs[0].date)
      setLastWeekDate(fullDateObjs[0].weekBeforeDate)

      return () => {
        //cancel the request before the component unmounts
        controller.abort();
      }

    }).catch(e => {
      console.log(e);
    })
  }, [])

  //Turn dates into Full date string
  function epochConvertDate(date){
    const dateArray = date.split(".")
    const day = parseInt(dateArray[0]);
    const month = parseInt(dateArray[1])-1;
    const year = parseInt(dateArray[2]);

    const fullDate = new Date(year,month,day)
    
    let weekBeforeTimeStamp = fullDate.getTime() - 604800000;
    let weekBeforeDate = `${new Date(weekBeforeTimeStamp).getDate()}.${new Date(weekBeforeTimeStamp).getMonth()+1}.${new Date(weekBeforeTimeStamp).getFullYear()}`

    return {fullDate, weekBeforeDate};

  }

  console.log(dates)

  function convertDateToDateStringObj(date){

    const fullDateString = epochConvertDate(date).fullDate.toDateString()

    const weekBeforeDate = epochConvertDate(date).weekBeforeDate
    
    return {fullDateString, date, weekBeforeDate}

  }
  
  // console.log(fullDateObjs)
  
  //Get the date for exactly day a week ago
  //get the attendance values for the same day the previous week

  useEffect(()=>{
    const controller = new AbortController();
    const signal = controller.signal;
    const options = {
      signal: signal
    }
    const attendanceUrl = `${server}/members/attendance/${serviceDate}`;

    if(serviceDate !== ""){
      fetch(attendanceUrl, options).then(res => res.json()).then(res => {
        // console.log(res);
        setAttendanceRecords(res);
      }).catch(e => {
        console.log(e);
      });
      
    }


    return () => {
      //cancel the request before the compnent unmounts
      controller.abort();
    }
  }, [serviceDate ])

  let services = [
    "Midweek Service - Wednesday, 29th June 2022",
    "Sunday Service - Sunday, 26th June 2022",
    "Midweek Service - Wednesday, 23rd June 2022",
    "Sunday Service - Sunday, 19th June 2022"
  ]

  services = dates;
  //console.log(services)

  return (
    <div className="sidebar">
      <div className="service-title">
      </div>
      <div className="sidebarWrapper">
        <p>Select Date</p>
        <select name="select" className="service-selector" onChange={(e) => {
          setServiceDate(services.filter(obj => obj.fullDateString === e.target.value)[0].date);
          setLastWeekDate(services.filter(obj => obj.fullDateString === e.target.value)[0].weekBeforeDate)
        }}>
          {services.map( (service, i) => <option value={service.fullDateString} key={i} >{service.fullDateString}</option> )}
        </select>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/attendees" className="link">
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                Attendees
              </li>
            </Link>
            <Link to="/first-timers" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                First Timers
              </li>
            </Link>
            <Link to="/absentees" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Absentees
              </li>
            </Link>
            <Link to="/givings" className="link">
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Givings
              </li>
            </Link>
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Members
              </li>
            </Link>
            {/* <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li> */}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
