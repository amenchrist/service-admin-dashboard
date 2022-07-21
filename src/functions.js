//Functions

export function getAttendees(membersArray, date){
    const relevantMembers = membersArray.filter(member => member.attendanceRecords.filter(record => record.date === date ).length > 0 )
    const attRecords = relevantMembers.map(m => {
      return {...m, attendanceRecords: m.attendanceRecords.filter(record => record.date === date ) }
    })
    //console.log(attRecords);
    return attRecords.sort((e1, e2) => e1.attendanceRecords[0].time - e2.attendanceRecords[0].time);
  }
  
export function getFirstTimers(membersArray, date){
    const dateArray = date.split(".")
    const day = parseInt(dateArray[0]);
    const month = parseInt(dateArray[1])-1;
    const year = parseInt(dateArray[2]);

    const startTime = new Date(year,month,day).getTime()/1000;
    const endTime = startTime + 86400
    if(membersArray.length > 0){
      const relevantMembers = membersArray.filter(member => member.attendanceRecords.filter(record => record.date === date ).length > 0 )
      if(relevantMembers.length > 0){
        
        relevantMembers.forEach(mem => mem.attendanceRecords.sort((e1, e2) => e1.time - e2.time));
        const attRecords = relevantMembers.filter(m => m.attendanceRecords[0].time > startTime && m.attendanceRecords[0].time < endTime)
        return attRecords
      }else {
        return []
      }
    } else {
      return []
    }
  }

export function getAbsentees(membersArray, date){
    const dateArray = date.split(".")
    const day = parseInt(dateArray[0]);
    const month = parseInt(dateArray[1])-1;
    const year = parseInt(dateArray[2]);

    const startTime = new Date(year,month,day).getTime()/1000;
    if(membersArray.length > 0){
      const relevantMembers = membersArray.filter(member => member.attendanceRecords.filter(record => record.date !== date ).length > 0 )
      if(relevantMembers.length > 0){
        // console.log(relevantMembers)
        relevantMembers.forEach(mem => mem.attendanceRecords.sort((e1, e2) => e1.time - e2.time))
        const attRecords = relevantMembers.filter(m => m.attendanceRecords[0].time < startTime )
        // console.log(attRecords);
        // console.log(date)
        return attRecords
        
      }else {
        return []
      }
    } else {
      return []
    }
  }

  export function getAttendanceRecords(membersArray, email){
    
    const relevantMember = membersArray.find(m => m.email === email)
    if(relevantMember){
      return relevantMember.attendanceRecords.sort((e1, e2) => e2.time - e1.time);
    }else {
      return []
    }
  }

  export function getParentUrl() {
    var parentUrl = (window.location != window.parent.location)
    ? document.referrer
    : document.location.href;
    return parentUrl;
  }