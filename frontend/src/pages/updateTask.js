import React, {useEffect,useState}from 'react'
import { Link, useNavigate,useParams } from 'react-router-dom';
import axios from "axios";
import {toast} from "react-toastify";


const initialState={ tasktitle:"",
date:"",
time:"",
notes:"",};


const UpdateTask = () => {

    const [state, setState] = useState({ initialState });
    const { tasktitle, date, time, notes } = state;
    const navigate=useNavigate();
    const{id}=useParams();

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/get/${id}`).then((resp)=>setState({...resp.data[0]}))
    },[id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!tasktitle || !date || !time) {
            toast.error("Missing tasktitle or date or time");
        }
        else {
            if (!id) {
                axios.post("http://localhost:5000/api/post", {
                    tasktitle,
                    date,
                    time,
                    notes,
                }).then(() => {
                    setState({ tasktitle: "", date: "", time: "", notes: "" });
                }).catch((err) => toast.error(err.response.data));
                toast.success("Task Added");
            }else{
                axios.put(`http://localhost:5000/api/update/${id}`, {
                    tasktitle,
                    date,
                    time,
                    notes,
                }).then(() => {
                    setState({ tasktitle: "", date: "", time: "",notes:"" });
                }).catch((err) => toast.error(err.response.data));
                toast.success("Task Updated");
            }
           
                setTimeout(() =>navigate("/"), 400);
             }
    }

    const handleInputChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    };

  return (
    <div className="alert alert-info"style={{marginTop:"100px"}}>
        <form style={{
            margin:"auto",
            padding:"15px",
            maxWidth:"400px",
            alignContent:"center"
        }}
        onSubmit={handleSubmit}>

            <div className="form-group">
                <label for="tasktitle">Tasktitle</label>
                  <input type="text"
                      className="form-control"
                      id="name"
                      name="tasktitle"
                      placeholder='Task Title'
                      value={tasktitle || ""}
                      onChange={handleInputChange} 
                      autoComplete='off'/>  
                
            </div>
           

            <div className="form-group">
                <label for="date">DATE</label>
                  <input type="date"
                      className="form-control"
                      id="date"
                      name="date"
                      value={date || ""}
                      onChange={handleInputChange} />  
                
            </div>

            <div className="form-group">
                <label for="TIME">TIME</label>
                  <input type="time"
                      className="form-control"
                      id="time"
                      name="time"
                      value={time || ""}
                      onChange={handleInputChange} />  
                
            </div>

            <div className="form-group">
                <label for="notes">NOTES</label>
                  <input type="text"
                      className="form-control"
                      id="notes"
                      name="notes"
                      placeholder='Please provide description'
                      value={notes || ""}
                      onChange={handleInputChange} 
                      autoComplete='off'/>  
                
            </div>
            <div className="form-group">
            <input type="submit" className="btn btn-link" value={id ?"Update" :"AddTask"}/>
            <Link to="/">
            <input type="button"  className="btn btn-link"value="Close"/>
            </Link>
            </div>



        </form>

    </div>
  )
}

export default UpdateTask;