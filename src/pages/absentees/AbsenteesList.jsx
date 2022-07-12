import "./absenteesList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useStateContext } from '../../contexts/ContextProvider';

export default function AbsenteesList() {

  const { absentees } = useStateContext();
  const [data, setData] = useState([]);

  useEffect(()=>{
    const newData = []
    absentees.forEach((m,i) => {
      if(m.id === undefined){
        m.id = `No ID assigned ${i}`
      }
        m = {
        id: m.id,
        title: m.title,
        username: `${m.firstName} ${m.lastName}`,
        email: m.email,
        church: m.church,
      }

      newData.push(m)
    })

    setData(newData);
  }, [absentees])

    const columns = [
        { field: "id", headerName: "ID", width: 90, hide: true },
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
        { field: "email", headerName: "Email", width: 200 },
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
          <h3 style={{"margin-bottom":"20px", paddingLeft: "10px"}}>Absentees</h3>
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
