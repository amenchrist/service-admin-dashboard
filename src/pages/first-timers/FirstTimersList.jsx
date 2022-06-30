import "./firstTimersList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";

export default function FirstTimersList() {
    const columns = [
        { field: "id", headerName: "ID", width: 90 },
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
        {
          field: "status",
          headerName: "Status",
          width: 120,
        },
        {
          field: "transaction",
          headerName: "Transaction Volume",
          width: 160,
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
      ];
    
      return (
        <div className="userList">
          <h3 style={{"margin-bottom":"20px", paddingLeft: "10px"}}>First Timers</h3>
          <DataGrid
            rows={userRows}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
          />
        </div>
      );
}
