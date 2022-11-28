import List from './List'
const ListPanel = ({upcomingList, activeList, cancelledList}) => {
    return (
        <>
        <List list={upcomingList} listName={'Upcoming'}/>
        <List list={activeList} listName={'Active'}/>
        <List list={cancelledList} listName={'Older'}/>
    </>   
    )
}
export default ListPanel