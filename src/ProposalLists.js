import React, {useState, useEffect} from 'react'
import moment from 'moment';
import List from './List'

const ProposalLists = () => {
    const [proposalsList, setProposalList] = useState([])
    const [upcomingList, setUpcomingList] = useState([])
    const [activeList, setActiveList] = useState([])
    const [cancelledList, setCancelledList] = useState([])
    const [loader, setLoader] = useState(false)
  
  useEffect( ()=>{
    
    (async()=>{
          if(proposalsList.length < 1) 
          setLoader(true)
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
                 setProposalList(lisofAllProposals)
                 setUpcomingList(upcoming)
                 setActiveList(active)
                 setCancelledList(older)
                 setLoader(false)
          })}
          )()
        
  },[])
    
return  <>
<List list={upcomingList} listName={'Upcoming'} loader={loader}/>
<List list={activeList} listName={'Active'} loader={loader}/>
<List list={cancelledList} listName={'Older'} loader={loader}/>
</>   
}

export default ProposalLists;