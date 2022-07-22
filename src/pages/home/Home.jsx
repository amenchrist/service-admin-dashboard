import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useStateContext } from '../../contexts/ContextProvider';
import { useState } from "react";
import { useEffect } from "react";

export default function Home() {

  const { attendees } = useStateContext();
  const [ chartData, setChartData ] = useState([]);

  

  useEffect(()=>{
    let chartD = attendees.map(m => {
      return m.attendanceRecords
    })

    let chart = []
    for (let i=0; i<25; i++){
      chart[i] = {
        time: `${i < 10? `0${i}`:i}:00`,
        "Attendance": 0
      }
    }

    //console.log(chartD.flat())
    //final output
    

    chartD.flat().forEach(record => {
      let hour = new Date(record.time*1000).getHours();
      // console.log(hour)
      let hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
      let index = hours.indexOf(hour);
      //console.log(index)
      // let prevAttendance = chart[index]["Attendance"];
      // console.log(prevAttendance);
      chart[index] = {
        time: `${hour < 10? `0${hour}`:hour}:00`,
        "Attendance": chart[index]["Attendance"] === undefined? record.attendees : chart[index]["Attendance"] + record.attendees
      }
      if(chart[index]){
      }
    })

    //console.log(chart)

    setChartData(chart)
  }, [attendees])

  // console.log(attendees)


  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={chartData} title="Attendance Analytics" grid dataKey="Attendance" xAxisKey={"time"}/>
      <div className="homeWidgets">
        {/* <WidgetSm/> */}
        <WidgetLg/>

      </div>
    </div>
  );
}
