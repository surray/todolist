import React,{useEffect,useState} from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import AddTaskIcon from '@mui/icons-material/AddTask';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom';
import "./home.css";

const initialState={ tasktitle:"",
date:"",
time:"",
notes:"",}

const Home = () => {
    const [data,setData] =useState([]);
    const[state,setState]=useState({initialState});
    const {tasktitle,date,time,notes}=state;
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!tasktitle || !date || !time) {
            toast.error("Missing tasktitle or date or time");
        }
        else {
            axios.post("http://localhost:5000/api/post", {
                tasktitle,
                date,
                time,
                notes,
            }).then(() => {
                setState({ tasktitle: "", date: "", time: "", notes: "" });
            }).catch((err) => toast.error(err.response.data));
            toast.success("Task Added");
            setTimeout(() => { loadData(); e.target.reset(); }, 400);
        }
    };

    const handleInputChange = (e) =>{
      setState({...state, [e.target.name]: e.target.value})
        
    };

    
    const loadData=async()=>{
        const response=await axios.get("http://localhost:5000/api/get");
        setData(response.data);
      
    };


    useEffect(() => {
        loadData();
    }, []);

    const deleteItem = (id) => {
        axios.delete(`http://localhost:5000/api/remove/${id}`);
        toast.success("Task Completed");
        setTimeout(() => loadData(), 500);
    }


    return (
        
        <div className="d-flex flex-column" style={{ marginTop: "80px", borderRadius: "3px", marginLeft: "500px", width: "600px", height: "600px", background: "MediumSeaGreen", borderStyle: "solid", border: "black" }}>
            <h3 style={{ marginTop: "10px", marginLeft: "10px" }}>TO-D<Link to="/notes"><AddCircleOutlineIcon style={{ color: "white", fontSize: "25px", marginBottom: "5px" }} /></Link>-LIST</h3>
            <div className="d-flex flex-row" style={{ marginTop: "10px", borderRadius: "3px", marginLeft: "10px", width: "575px" }}>

                <form onSubmit={handleSubmit}>
                    <input type='text' autoComplete="off" placeholder='Type the task title here' name='tasktitle' style={{ width: "250px" }} onChange={handleInputChange} />
                    <input type="date" onChange={handleInputChange} name='date' style={{ width: "150px" }} />
                    <input type='time' onChange={handleInputChange} name='time' style={{ width: "90px" }} />
                    <input type='submit' style={{color:'rgb(35,65,89)',background:'rgb(194,231,255)',borderRadius:'5px'}} value="Add Task" />
                </form>
            </div>

            {data.map((item, index) => (
                <>
                    <div className="list-group" style={{ borderRadius: "5px", marginTop: "10px", marginLeft: "10px", width: "575px", border: "Tomato", borderStyle: "solid" }}>
                        <a href="#" className="list-group-item list-group-item-action" aria-current="true">
                            <div className="d-flex w-100 justify-content-between">

                                <AddTaskIcon  style={{color:"rgb(54,129,224)"}}onClick={() => deleteItem(item.id)} /> <h5 className="mb-1" id="task">{item.tasktitle}</h5>
                                <small>{new Date(item.date).toLocaleDateString()}</small>
                                <small>{item.time}</small>
                                <Link to={`/update/${item.id}`}>
                                    <VisibilityIcon />
                                </Link>
                            </div>
                            <p className="mb-1">{item.notes}</p>
                        </a>
                    </div>
                </>)
            )}

        </div>
     
    )
}

export default Home;