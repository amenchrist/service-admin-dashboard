import React, { createContext, useContext, useState, useEffect } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {

    const [screenSize, setScreenSize] = useState(undefined);
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [serviceDate, setServiceDate] = useState('');
    const [dates, setDates] = useState([]);
    const [members, setMembers] = useState([]);
    const [lastWeekDate, setLastWeekDate] = useState('');
    const [attendees, setAttendees] = useState([])
    

    const localHost = "http://localhost:5000";
    const host = 'https://arcane-anchorage-41306.herokuapp.com';
    const server = localHost;

    useEffect(() => {
      const controller = new AbortController();
      const signal = controller.signal;
      const options = {
        signal: signal
      }

      const allMembersUrl = `${server}/members/`;
      fetch(allMembersUrl, options).then(res => res.json()).then(res => {
        console.log(res);
        setMembers(res);
      }).catch(e => {
        console.log(e);
      });
  
      return () => {
        //cancel the request before the compnent unmounts
        controller.abort();
      }
    }, [])

    const contextStateVars = {
  
      attendanceRecords, setAttendanceRecords,
      serviceDate, setServiceDate,
      server,
      dates, setDates,
      members, setMembers,
      lastWeekDate,setLastWeekDate,
      attendees, setAttendees
      
    }
  
    return (
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <StateContext.Provider value={contextStateVars}>
        {children}
      </StateContext.Provider>
    );
  };
  
  export const useStateContext = () => useContext(StateContext);