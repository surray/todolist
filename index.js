const express = require("express");//nodejs framework
const app =express();
const mysql=require("mysql2");
const cors = require("cors");//cross origin 

const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Sure@1038",
    database:"new_todolist"
});

app.use(cors());
app.use(express.json());

app.get("/api/get/",(req,res)=>{
    const sqlGet="SELECT * FROM new_table";
    db.query(sqlGet,(error,result)=>{
        res.send(result);

    });
});


app.post("/api/post",(req,res)=>{
    const {tasktitle,date,time,notes}=req.body;
    const sqlInsert="INSERT INTO new_table (tasktitle,date,time,notes) VALUES (?,?,?,?)";
    db.query(sqlInsert,[tasktitle,date,time,notes],(error,result)=>{
            if (error)
            {console.log("error",error);
            }
        });
    });


app.delete("/api/remove/:id",(req,res)=>{
    const {id}=req.params;
    const sqlRemove="DELETE FROM new_table WHERE id=?";
    db.query(sqlRemove,id,(error,result)=>{
            if (error)
            {console.log("error",error);
            }
        });
    });

app.get("/api/get/:id",(req,res)=>{
    const{id}=req.params;
    const sqlGet="SELECT * FROM new_table WHERE id=?";
    db.query(sqlGet,id,(error,result)=>{
    if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:id",(req,res)=>{
    const{id}=req.params;
    const{tasktitle,date,time,notes}=req.body;
    const sqlUpdate="UPDATE new_table SET tasktitle=?,date=?,time=?,notes=? WHERE id=?";
    db.query(sqlUpdate,[tasktitle,date,time,notes,id],(error,result)=>{
    if (error) {
            console.log(error);
        }
        res.send(result);
    });
});


app.listen(5000,()=>{
    console.log("Server started on port 5000 only");
})
    
    
    