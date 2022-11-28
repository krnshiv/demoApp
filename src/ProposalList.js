import React, {useState, useEffect} from 'react'
import moment from 'moment';
import ListPanel from './ListPanel'
const ProposalList = () => {
    const [proposalsList, setProposalList] = useState([])
    const [upcomingList, setUpcomingList] = useState([])
    const [activeList, setActiveList] = useState([])
    const [cancelledList, setCancelledList] = useState([])
  
    useEffect( ()=>{
    
    (async()=>{
          if(proposalsList.length < 1) 
          await fetch('https://api2.thedapplist.com/api/v2/proposals?offset=0&limit=20')
          .then((response) => response.json())
          .then((res)=>{

            const lisofAllProposals = res?.data?.list;
            let currentWeekNumber = moment().week();
            let active = []
            let upcoming = []
            let older = []

            lisofAllProposals.map((l)=>{
                 let weekNumber = moment(moment.unix(l.startTime).format("MM-DD-YYYY"), "MM-DD-YYYY").week() 
                 if (weekNumber < currentWeekNumber) older = [...older, l]
                 if (weekNumber == currentWeekNumber) active = [...active, l]
                 if (weekNumber > currentWeekNumber) upcoming = [...upcoming, l]
                })
                 setUpcomingList(upcoming)
                 setActiveList(active)
                 setCancelledList(older)
          })}
          )()
        
      },[])
    
return <ListPanel upcomingList={upcomingList} activeList={activeList} cancelledList={cancelledList}/>
}

export default ProposalList;