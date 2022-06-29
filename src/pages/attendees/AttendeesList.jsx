import "./attendeesList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AttendeesList() {

  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const serverLink = "http://localhost:5000/attendees/"//"https://arcane-anchorage-41306.herokuapp.com/attendees"//

  const [dat, setDat] = useState([]);

  useEffect(() => {

    fetch(serverLink).then(res => res.json()).then(data => {
      console.log(data);
      setDat(data);
    })
  
    return () => {
      
    }
  }, []);

  useEffect(() => {
    const newData = []
    dat.forEach(m => {
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

    return () => {
      
    }
  }, [dat])

  const columns = [
    { field: "date", headerName: "Date", width: 120 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
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
