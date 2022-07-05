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


  const { setAttendanceRecords } = useStateContext();

  const [dates, setDates] = useState([])
  const [serviceDate, setServiceDate] = useState('');

  //Get 

  useEffect(()=> {
    const controller = new AbortController();
    const signal = controller.signal;
    const options = {
      signal: signal
    }
    const datesUrl = "https://arcane-anchorage-41306.herokuapp.com/attendees/";

    fetch(datesUrl, options).then(res => res.json()).then(res => {
      // let serviceDates = []
      // res.forEach(rec => {
      //   if(!serviceDates.includes(rec.date)){
      //     serviceDates.push(rec.date)
      //   }
      // })
      setDates(res)
      setServiceDate(res[0])
      //console.log(dates)
      // res.forEach(record => )
      return () => {
        //cancel the request before the compnent unmounts
        controller.abort();
      }

    }).catch(e => {
      console.log(e);
    })
  }, [])

  useEffect(()=>{
    const controller = new AbortController();
    const signal = controller.signal;
    const options = {
      signal: signal
    }
    const attendanceUrl = `https://arcane-anchorage-41306.herokuapp.com/members/attendance/${serviceDate}`;

    if(serviceDate !== ""){
      fetch(attendanceUrl, options).then(res => res.json()).then(res => {
        console.log(res);
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
        <select name="select" className="service-selector" onChange={(e) => setServiceDate(e.target.value)}>
          {services.map( (service, i) => <option value={service} key={i} >{service}</option> )}
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
