import React, {useState, useEffect} from 'react'
import moment from 'moment';
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
                 return lisofAllProposals
          })}
          )()
        
      },[])
    
return <>
    <h1>Upcoming Event</h1> <ol>   
    {upcomingList.length ? upcomingList?.map((proposal, index)=>
    <li>{proposal.name}</li> 
) : <ul><li>Empty</li></ul>
} </ol>   
    <h1>Active Events</h1>
    <ol>        
    {activeList.length ? activeList?.map((proposal, index)=>
    <li>{proposal.name}</li> 
)
: <ul><li>Empty</li></ul>}
    </ol>
    <h1>Older Events</h1>
    <ol>
    {cancelledList.length ?cancelledList?.map((proposal, index)=>
   <li>{proposal.name}</li> 
   ): <ul><li>Empty</li></ul>}
   </ol>
   
</>
}

export default ProposalList;