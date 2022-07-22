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
  for (let i=0; i<12; i++){
    wedChart[i] = {
      month: months[i],
      "Attendance": 0
    }
    sunChart[i] = {
      month: months[i],
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
      let month = new Date(record.time*1000).getMonth();
      wedChart[month] = {
        month: months[month],
        "Attendance": wedChart[month]["Attendance"] === undefined? record.attendees : wedChart[month]["Attendance"] + record.attendees
      }
    })
    sunData.forEach(record => {
      let month = new Date(record.time*1000).getMonth();
      sunChart[month] = {
        month: months[month],
        "Attendance": sunChart[month]["Attendance"] === undefined? record.attendees : sunChart[month]["Attendance"] + record.attendees
      }
    })

    setWednesdayChartData(wedChart)
    setSundayChartData(sunChart)
  },[wedData, sunData])

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={sundayChartData} title="Sunday Services" grid dataKey="Attendance" xAxisKey={"month"}/>
      <Chart data={wednesdayChartData} title="Wednesday Services" grid dataKey="Attendance" xAxisKey={"month"} />
    </div>
  );
}
