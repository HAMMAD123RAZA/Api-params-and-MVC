const express=require('express')
const server=express()
const mongoose=require('mongoose')
server.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017', {
    dbName: 'apiParams'
}).then(() => {
    console.log('data is connected')
}).catch((e) => {
    console.log(e)
})

const userSchema = new mongoose.Schema({
    name: String, email: String
})

const msg = mongoose.model('params', userSchema)

server.get('/',(req,res)=>{
    res.send('working')
})

server.get('/user/all',async(req,res)=>{
const user=await msg.find({})

const gender=req.query.gender
console.log(gender)
res.json({
    success:true,
    user
})

})

server.get('/userid/:id',async(req,res)=>{
    const {id}=req.params;
   const client= await msg.findById(id)
    res.json({
        success:true,
        client
    })
})

server.post('/user/new',async(req,res)=>{
   const {name,email,password}=req.body
   
   await msg.create({name,email,password})

    res.json({
        success:true,
        msg
    })
    
    })
    

server.listen(3030,()=>{
    console.log('server is on fire')
})