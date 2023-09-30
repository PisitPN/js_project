//Dynamic file - use with 'views'
//เรียกใช้ template จากไฟล์ html ในfolder โดยไม่ต้องใช้ url
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')  
const router = require('./routes/myrouter_dynamic')
const app = express()

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(session({secret:"mysession",resave:false,saveUninitialized:false}))
app.use(router)
app.use(express.static(path.join(__dirname,'public')))              //Use with 'public' folder

app.listen(8080,()=>{
    console.log("Server run at port 8080")
})