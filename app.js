require('dotenv').config()
require('express-async-errors')
var express=require('express')
var connectDB=require('./db/connect')
var mainRouter=require('./routes/main')
var notFound=require('./middleware/not-found')
var errorHandlerMiddleware=require('./middleware/error-handler')
var app=express()
var port=process.env.PORT || 200

app.use(express.json())
app.use(express.static('./public'))

app.get('/MB',(req,res)=>{
    res.send("Hi there,Twitor")
})
app.use('/',mainRouter)

app.use(notFound)
app.use(errorHandlerMiddleware)
async function start(){
    try{
        await connectDB(process.env.MONGO_URI)
        console.log("Connected to Databases")
        app.listen(port,console.log("Server is listening on ",port))
    }
    catch(err){
        console.log(err)
    }
}

start()