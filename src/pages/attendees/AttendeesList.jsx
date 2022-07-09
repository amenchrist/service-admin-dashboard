import "./attendeesList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useStateContext } from '../../contexts/ContextProvider';

export default function AttendeesList() {

  const { attendanceRecords, attendees, } = useStateContext();
  const [data, setData] = useState(attendanceRecords);
  console.log(attendanceRecords)

  useEffect(()=>{
    const newData = []
    attendanceRecords.forEach((m,i) => {
      console.log(m.id)
      if(m.id === undefined){
        m.id = `No ID assigned ${i}`
      }
        m = {
        id: m.id,
        attendees: m.attendees,
        date: m.date,
        username: m.firstName,
        lastName: m.lastName,
        avatar:
        "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        email: m.email,
        status: "active",
        time: m.time
      }

      newData.push(m)
    })

    setData(newData);
  }, [attendanceRecords])

  // const serverLink = "http://localhost:5000/attendees/"//"https://arcane-anchorage-41306.herokuapp.com/attendees"//

  const columns = [
    { field: "date", headerName: "Date", width: 120 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {/* <img className="userListImg" src={params.row.avatar} alt="" /> */}
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "attendees", headerName: "Attendees", width: 120 },
    {
      field: "time",
      headerName: "Time",
      width: 160,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">View</button>
            </Link>
          </>
        );
      },
    },
    { field: "id", headerName: "ID", width: 90 },
  ];

  return (
    <div className="userList">
      <h3 style={{marginBottom:"20px", paddingLeft: "10px"}}>Attendees</h3>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}
