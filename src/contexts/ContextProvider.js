import React, { createContext, useContext, useState, useEffect } from 'react';
import {getAttendees, getFirstTimers, getAbsentees, getParentUrl } from '../functions';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  
  const [churchName, setChurchName] = useState('');
  const [url, setUrl] = useState('');
  const [church, setChurch] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  
  useEffect(() => {
    setUrl(getParentUrl())
  }, [])

  useEffect(() => {
    switch(url){
      case "https://christembassy-eastham.org/":
        setChurchName("Christ Embassy East Ham");
        setChurch("East-Ham")
      break;
      case "https://ceilford.org/":
        setChurchName("Christ Embassy Ilford");
        setChurch("Ilford")
      break;
      case "https://christembassybarking.org/":
        setChurchName("Christ Embassy Barking");
        setChurch("Barking")
      break;
      case "https://christembassystratford.org/":
        setChurchName("Christ Embassy Stratford");
        setChurch("Stratford")
      break;
      default:
        console.log("No church identified")
        setChurchName("Christ Embassy");
        setChurch("")
    }
  }, [url])

  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [serviceDate, setServiceDate] = useState('');
  const [dates, setDates] = useState([]);
  const [lastWeekDate, setLastWeekDate] = useState('');
  const [members, setMembers] = useState([]);
  const [attendees, setAttendees] = useState([])
  const [firstTimers, setFirstTimers] = useState([])
  const [absentees, setAbsentees] = useState([]);
  const [isRegistered, setIsRegistered] = useState(true);
  
  const localHost = "http://localhost:5000";
  const host = 'https://arcane-anchorage-41306.herokuapp.com';
  const server = localHost;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const options = {
      signal: signal
    }

    const allMembersUrl = `${server}/members/${church}`;
    fetch(allMembersUrl, options).then(res => res.json()).then(res => {
      setMembers(res);
    }).catch(e => {
      console.log(e);
    });

    return () => {
      //cancel the request before the compnent unmounts
      controller.abort();
    }
  }, [server, church]);


  useEffect(() => {
    setAttendees(getAttendees(members, serviceDate));
    setFirstTimers(getFirstTimers(members, serviceDate));
    setAbsentees(getAbsentees(members, serviceDate));
  },[serviceDate, members])


  const contextStateVars = {

    attendanceRecords, setAttendanceRecords,
    serviceDate, setServiceDate,
    server,
    dates, setDates,
    members, setMembers,
    lastWeekDate,setLastWeekDate,
    attendees, absentees, firstTimers, churchName,
    isSignedIn, setIsSignedIn, isRegistered, setIsRegistered
    
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={contextStateVars}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);