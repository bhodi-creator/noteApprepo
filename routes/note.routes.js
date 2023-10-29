const express = require('express')
const {noteModel} = require('../model/note.model')
const {auth} = require('../middleware/auth.middleware')

const noteRoutes = express.Router();


noteRoutes.use(auth)

noteRoutes.post('/addNote',async(req,res)=>{
    const payload = req.body
    console.log(payload)
    
    try {
        const note = new noteModel(payload);
        await note.save();
        res.status(200).send({"msg":"new note is added","newnote":note})
    } catch (error) {
        res.status(400).send({"error":error})
    }
})

noteRoutes.get('/get',async(req,res)=>{
    const note  = await noteModel.find({userId:req.body.userId});
    res.status(200).send(note);
})
noteRoutes.get("/get/:id",async(req,res)=>{
    const note  = await noteModel.find({userId:req.body.userId,_id:req.params.id})
    res.status(200).send(note)
})

noteRoutes.patch('/update/:id',auth,async(req,res)=>{
  const {id}=req.params;
  const note = await noteModel.findOne({_id:id})
  console.log(note);
  try {
     await noteModel.findByIdAndUpdate({_id:id},req.body)
     res.status(200).send({note})
  } catch (error) {
    res.status(400).send({"error":error})
  }
})

noteRoutes.delete('/delete/:id',auth,async(req,res)=>{
    const {id}=req.params;
    const note = await noteModel.findOne({_id:id})
    console.log(note);
    try {
        if(req.body.userId!==note.userId){
            res.status(400).send({"error":"you are not authorized"})
        }else{
       await noteModel.findByIdAndDelete({_id:id})
       res.status(200).send({"msg":"note has been deleted...."})
        }
    } catch (error) {
      res.status(400).send({"error":error})
    }
  })

module.exports={
    noteRoutes
}