import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const getUsersData=async()=>{
    try {
      const response = await fetch(`http://localhost:5000/search/users?search=${search}`);
      if(response.status===200){
        const data=await response.json();
        setUsers(data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //debounce
  useEffect(() => {
    const delay = 800; 
    const handler = setTimeout(() => {
      getUsersData(search);
    }, delay);

    return () => clearTimeout(handler);
  }, [search]);


  return (
    <div className="App">
      <div>
        <label style={{margin:"5px", padding:"5px"}}>Serach</label>
        <input type="text" placeholder='search' onChange={(e)=> setSearch(e.target.value) }/>
      </div>
      <div style={{display:"flex", flexWrap:"wrap"}}>
        {
          users && users?.map((user,i)=><div key={i}
            style={{border:"1px solid black", padding:"10px",margin:"10px"}}
          >{user.name}</div>)
        }
      </div>
    </div>
  );
}

export default App;
