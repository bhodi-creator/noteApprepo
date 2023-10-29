const express = require ('express')
const {connection} = require('./db');
const {userRoutes}=require('./routes/user.routes')
const {noteRoutes} = require('./routes/note.routes')
require("dotenv").config();
const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).send({"msg":"this is home page "})
})

app.use('/users',userRoutes)
app.use('/notes',noteRoutes)
const PORT = process.env.port;

app.listen(PORT, async()=>{
    try {
        await connection
        console.log('connected to db.....')
        console.log(`server is running at port :${PORT}`)
    } catch (err) {
        console.log(err)
    }
})