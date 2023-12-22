const fs = require('fs');
const express = require('express');
const { error } = require('console');
const app =express();
app.use(express.json());
const port=3000;
app.post('/storedata',(req,res)=>{
    console.log(req.body)
    const data=req.body.data;
    fs.writeFile("./temp.txt",data,(error)=>{
        if(error) {
            console.log("error in file")
            res.status(500).send(error.stack)
        }
   else {
      console.log("file successfully save")
      res.status(200).send("file successfully save into temp")
   }
    })
})
app.get('/storedata',(req,res)=>{
     fs.readFile("./temp.txt",(error,data)=>{
        if(error) {
            console.log("no file");
            res.status(500).send("No temp file")
        }
        else {
         res.status(200).send(data.toString());
        }
     })
})
app.put('/storedata',(req,res)=>{
    const data=req.body.data;
    fs.appendFile("./temp.txt",data,(error)=>{
        if(error) {
            console.log("error in a file")
            res.status(500).send(error.stack)
        }
        else {
            res.status(200).send(data.toString());
        }
    })
})
app.delete('/storedata',(req,res)=>{
    fs.unlink("./temp.txt",(error)=>{
        if(error) {
            console.log("error in the file")
            res.status(500).send(error.stack)
        }
        else {
            res.status(200).send("deleted");
        }
    })
})



app.listen(port,()=> {
        console.log(`the appliction run on ${port}`);
})