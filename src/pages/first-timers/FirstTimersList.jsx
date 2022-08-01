import "./firstTimersList.css";
// import { DataGrid } from "@material-ui/data-grid";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useStateContext } from '../../contexts/ContextProvider';
import { useState, useEffect } from "react";

export default function FirstTimersList() {

  const { firstTimers } = useStateContext();
  const [data, setData] = useState([]);

  useEffect(()=>{
    const newData = []
    firstTimers.forEach((m,i) => {
      const d = new Date(m.attendanceRecords[0].time*1000);
      if(m.id === undefined){
        m.id = `No ID assigned ${i}`
      }
        m = {
        id: m.id,
        title: m.title,
        attendees: m.attendanceRecords[0].attendees,
        date: m.attendanceRecords[0].date,
        username: `${m.firstName}`,
        email: m.email,
        church: m.church,
        time: `${d.getHours()}:${d.getMinutes()<10? `0${d.getMinutes()}`: d.getMinutes()}`
      }

      newData.push(m)
    })

    setData(newData);
  }, [firstTimers])


    const columns = [
        { field: "id", headerName: "ID", width: 90, hide: true },
        {
          field: "time",
          headerName: "Time",
          width: 110,
        },
        { field: "title", headerName: "Title", width: 110  },
        {
          field: "user",
          headerName: "Name",
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
        { field: "email", headerName: "Email", width: 230 },
        { field: "phone", headerName: "Phone Number", width: 180 },
        { field: "church", headerName: "Church", width: 120,  },
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
      ];
    
      return (
        <div className="userList">
          <h3 style={{marginBottom:"20px", paddingLeft: "10px"}}>First Timers ({data.length})</h3>
          <DataGrid
            rows={data}
            disableSelectionOnClick
            columns={columns}
            pageSize={10}
            checkboxSelection
            components={{ Toolbar: GridToolbar }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 100 },
              },
            }}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
          />
        </div>
      );
}
