const express = require("express");
const app = express();
const port = 3000
const cors = require('cors')
const Controller = require('./controllers');
const errorHandling = require("./middlewares/errorHandling");
const authentication = require("./middlewares/authentication");
const router = require('./router')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/',(req,res,next)=>{
    res.send("success connect to express")
})

app.post('/register',Controller.register)
app.post('/login',Controller.login)
app.post('/sregister',Controller.specialRegister)
app.post('/slogin',Controller.specialLogin)

app.use(authentication)

app.use(router)

app.use(errorHandling)

app.listen(port, ()=>{
    console.log("listening to port ",port);
})