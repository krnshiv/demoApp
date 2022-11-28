const List = ({list, listName}) => {
    return (<>
        <h1>{listName} Event</h1> 
        <ol>   
        {list.length ? list?.map((proposal, index)=>
        <li>{proposal.name}</li> 
        ) : <ul><li>Empty</li></ul>
        } 
        </ol>   
        </>
    )
}
export default List