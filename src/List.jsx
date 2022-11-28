const List = ({list, listName, loader}) => {
    return (<>
        <h1>{listName} Events</h1> 
        <ol>   
        {list.length ? list?.map((proposal, index)=>
        <li>{proposal.name}</li> 
        ) : <ul><li>{loader ? 'Loading...' : 'Empty'}</li></ul>
        } 
        </ol>   
        </>
    )
}
export default List