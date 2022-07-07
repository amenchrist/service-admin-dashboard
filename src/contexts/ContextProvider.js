import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {

    const [screenSize, setScreenSize] = useState(undefined);
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [serviceDate, setServiceDate] = useState('');
    const [dates, setDates] = useState([]);
    

    const localHost = "http://localhost:5000";
    const host = 'https://arcane-anchorage-41306.herokuapp.com';
    const server = localHost;

    const contextStateVars = {
  
      attendanceRecords, setAttendanceRecords,
      serviceDate, setServiceDate,
      server,
      dates, setDates
      
    }
  
    return (
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <StateContext.Provider value={contextStateVars}>
        {children}
      </StateContext.Provider>
    );
  };
  
  export const useStateContext = () => useContext(StateContext);