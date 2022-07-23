import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useStateContext } from '../../contexts/ContextProvider';
import { useState } from "react";
import { useEffect } from "react";
import FirstTimersList from "../first-timers/FirstTimersList";
import AttendeesList from "../attendees/AttendeesList";

export default function Overview() {

  const { attendees } = useStateContext();
  const { members } = useStateContext();
  const [ chartData, setChartData ] = useState([]);
  const [ wednesdayChartData, setWednesdayChartData ] = useState([]);
  const [ sundayChartData, setSundayChartData ] = useState([]);
  const [ yearData, setYearData ] = useState([]);
  const [ wedData, setWedData ] = useState([]);
  const [ sunData, setSunData ] = useState([]);

  // Get attendance records
  // separate them by year
  // group by Wednesday and sunday
  // subgroup them by month
  // get the monthly total attendance
  
  //sconsole.log(members)

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let wedChart = [], sunChart = []

  function getWeekNumber(time){
    let currentDate = new Date(time);
    let oneJan = new Date(currentDate.getFullYear(),0,1);
    // let endDec = new Date(currentDate.getFullYear(),11,31);
    let numberOfDays = Math.ceil((currentDate - oneJan) / (24 * 60 * 60 * 1000));
    //console.log(numberOfDays)
    //get month number by adding a week to the oneJan +
    let result = Math.floor(( currentDate.getDay() + 1 + numberOfDays) / 7);
    result === 0 || result >51 ? console.log("Problem ", result) : console.log("")
    switch(result){
      case 0:
        result = 1;
      break;
      case 52:
        result = 51;
      break;
      default:
        return result
    }
    return result
  }

  const aWeek = 604800000
  const currentDate = new Date();
  const oneJan = new Date(currentDate.getFullYear(),0,1).getTime();

  for (let i=0; i<52; i++){
    let time = oneJan + (aWeek*i)
    let weekNumber = getWeekNumber(time)

    wedChart[i] = {
      weekNumber: `Week ${weekNumber}`,
      month: months[new Date(time).getMonth()],
      "Attendance": 0
    }
    sunChart[i] = {
      weekNumber: `Week ${weekNumber}`,
      month: months[new Date(time).getMonth()],
      "Attendance": 0
    }
  }

  useEffect(()=>{
    let chartD = members.filter(m => {
      const relevant = m.attendanceRecords.filter(rec => new Date(rec.time*1000).getFullYear() === 2022)
      return relevant.length > 0
    }).map(rec => rec.attendanceRecords.flat())

    //console.log(chartD.flat())
    setYearData(chartD.flat())
  },[members])

  useEffect(()=>{
    let wednesdays = [], sundays = [];
    yearData.forEach(record => {
      let day = new Date(record.time*1000).getDay();
      if(day === 3){
        wednesdays.push(record)
      }
      if(day === 0){
        sundays.push(record)
      }
    })
    // console.log(chartD.flat())
    setWedData(wednesdays)
    setSunData(sundays)
  },[yearData])

  useEffect(()=>{
    //group by month
    wedData.forEach(record => {
      let time = record.time*1000;
      let month = new Date(time).getMonth();
      let weekNumber = getWeekNumber(time);
      wedChart[weekNumber] = {
        weekNumber: `Week ${weekNumber}`,
        month: months[month],
        "Attendance": wedChart[weekNumber]["Attendance"] === undefined? record.attendees : wedChart[weekNumber]["Attendance"] + record.attendees
      }
    })
    sunData.forEach(record => {
      let time = record.time*1000;
      let month = new Date(record.time*1000).getMonth();
      let weekNumber = getWeekNumber(time);
      
      sunChart[weekNumber] = {
        weekNumber: `Week ${weekNumber}`,
        month: months[month],
        "Attendance": sunChart[weekNumber]["Attendance"] === undefined? record.attendees : sunChart[weekNumber]["Attendance"] + record.attendees
      }
    })

    setWednesdayChartData(wedChart)
    setSundayChartData(sunChart)
  },[wedData, sunData])
  console.log(wedChart)

  return (
    <div className="home">
      <h2>Year Overview</h2>
      {/* <FeaturedInfo /> */}
      <Chart data={sundayChartData} title="Sunday Services" grid dataKey="Attendance" xAxisKey={"weekNumber"}/>
      <Chart data={wednesdayChartData} title="Wednesday Services" grid dataKey="Attendance" xAxisKey={"weekNumber"} />
    </div>
  );
}
