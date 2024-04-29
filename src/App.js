import './App.css';
import { EmployeeData } from './EmployeeData';
import {useEffect} from 'react';
import { useState } from 'react';
import { CSVLink } from "react-csv";

function App() {

  const [data,setData]=useState([]);
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [age,setAge] = useState(0);
  const [id,setId] = useState(0);
  const [isUpdate,setIsUpdate]=useState(false);


  useEffect(()=>{
    setData(EmployeeData);
  },[])

  const handleEdit = (id) =>{
    const dt=data.filter(item=>item.id===id);
    if(dt !== undefined)
    {
      setIsUpdate(true);
      setId(id);
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setAge(dt[0].age);
    }
  }
  const handleDelete = (id)=>{
    if(id>0)
    {
      if(window.confirm("Are you sure to delete this item")){
        const dt = data.filter(item=>item.id!==id);
        setData(dt);
      }
    }
  }
  
  const handleSave = (e) =>{
    let error = " ";
    
     if(firstName=== "")
     error += "First Name is required, ";

     if(lastName=== "")
     error += "Last Name is required, ";

     if(age<=0)
     error += "Age is required, ";

     if(error=== " ")
     {

  e.preventDefault();
  const dt =[...data];
  const newobject = {
    id: EmployeeData.length+1,
    firstName:firstName,
    lastName:lastName,
    age : age
  }
  dt.push(newobject);
  setData(dt);
  setFirstName('');
  setLastName('');
  setAge('');
}
else
{
  alert(error)
}

  }

  const handleUpdate = () =>{
    const index = data.map((item)=>{
      return item.id
    }).indexOf(id);

    const dt= [...data];
    dt[index].firstName=firstName;
    dt[index].lastName=lastName;
    dt[index].age=age;

    setData(dt);
    handleClear();
    

  }



  const handleClear = () =>{
    setId(0);
      setFirstName('');
      setLastName('');
      setAge('');
      setIsUpdate(false);
  }
  return (
   <div className='App'>
    <div style={{display: "flex" ,justifyContent: "center", marginTop:"10px" , marginBottom:"10px" }}>
      <div> 
        <label>First Name: 
          <input type='text' placeholder='Enter First name' value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
        </label>
      </div>
      &nbsp;
      <div>
        <label>Last Name: 
          <input type='text' placeholder='Enter Last name' value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
        </label>
      </div>   
         &nbsp;
         <div>
        <label>Age: 
          <input type='text' placeholder='Enter age' value={age} onChange={(e)=>setAge(e.target.value)}/>
        </label>
      </div>
      <div>
        &nbsp;
        {
        !isUpdate ?
         <button className='btn btn-primary' onClick={(e)=>handleSave(e)}>Save</button>
         :
        <button className='btn btn-primary' onClick={()=>handleUpdate()}>Update</button>
        }
        &nbsp;
       <button className='btn btn-danger'onClick={()=>handleClear()}>Clear</button> &nbsp;
       {/* Export Button Start */}
      <CSVLink className="downloadbtn" filename="my-file.csv" data={data}>
        <button className='btn btn-success'>Export to CSV</button>
      </CSVLink>
      {/* Export Button End */}
      </div>
    </div>
    <table className='table table-hover'>
      <thead>
        <tr>
          <td>Sr.No</td>
          <td>Id</td>
          <td>First Name</td>
          <td>Last Name</td>
          <td>age</td>
          <td>Actions</td>


        </tr>
      </thead>
      <tbody>
        {
          data.map((item,index)=>(
            <tr key={index}>
            <td>{index+1}</td>
            <td>{item.id}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.age}</td>
            <td>
              <button className='btn btn-primary' onClick={()=>handleEdit(item.id)}>Edit</button>&nbsp;
              <button className='btn btn-danger'onClick={()=>handleDelete(item.id)}>Delete</button>
            </td>
            </tr>
          ))
        }
      </tbody>
    </table>
   </div>
  );
}

export default App;
