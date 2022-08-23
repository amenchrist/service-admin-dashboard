import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import "./user.css";
import { useStateContext } from '../../../contexts/ContextProvider';
import { getAttendanceRecords } from "../../../functions";

export default function User() {

  const { members } = useStateContext();
  const [data, setData] = useState([]);

  const [user, setUser] = useState({})

  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone)
  const [id, setId] = useState(user.id)

  useEffect(() => {
    const id = window.location.pathname.replace("/user/", "");
    //https://arcane-anchorage-41306.herokuapp.com/members/${id}

    fetch(`http://localhost:5000/members/${id}`)
    .then(res => res.json())
    .then(data => setUser(data))
    .catch(err => console.log(err))
  
    return () => {
      
    }
  }, [])

  useEffect(() => {

    setId(user.id);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPhone(user.phone);

    return () => {
      
    }
  }, [user])

  useEffect(() => {

    // setData();
    const newData = []
    getAttendanceRecords(members, user.email).forEach((m,i) => {
      const d = new Date(m.time*1000);
      if(m.id === undefined){
        m.id = `No ID assigned ${i}`
      }
        m = {
        id: m.id,
        day:m.day,
        attendees: m.attendees,
        date: m.date,
        email: m.email,
        church: m.church,
        time: `${d.getHours()}:${d.getMinutes()<10? `0${d.getMinutes()}`: d.getMinutes()}`
      }

      newData.push(m)
    })

    setData(newData);
    
    return () => {
      
    }
  }, [user, members])

  const columns = [
    { field: "date", headerName: "Date", width: 120,  },
    { field: "day", headerName: "Day", width: 120,  },
    { field: "email", headerName: "Email", width: 200 },
    { field: "attendees", headerName: "Attendees", width: 120 },
    {
      field: "time",
      headerName: "Time",
      width: 110,
    },
    { field: "church", headerName: "Church", width: 120,  },
    { field: "id", headerName: "ID", width: 90, hide: true },
  ];

  function updateUser(e){
    e.preventDefault();
    let data = {
      id,
      firstName,
      lastName,
      email,
      phone
    }
    console.log(data)

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch(`http://localhost:5000/members/${user.id}`, options)
    .then(res => res.json())
    .then(data=> setUser(data))
    .catch(err => console.log(err))
  }

  //ADD A TABLE SHOWING THE PERSONS ATTENDANCE RECORDS
  
  
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        {/* <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link> */}
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.firstName} {user.lastName}</span>
              <span className="userShowUserTitle">{user.church}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.firstName} {user.lastName}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder={user.firstName}
                  className="userUpdateInput"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder={user.lastName}
                  className="userUpdateInput"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Id</label>
                <input
                  type="text"
                  placeholder={user.id}
                  className="userUpdateInput"
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={user.email}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder={user.phone}
                  className="userUpdateInput"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton" onClick={(e) => updateUser(e)} >Update</button>
            </div>
          </form>
        </div>
      </div>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={20}
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
