//static file
//เรียกใช้ template จากไฟล์ html ในfolder โดยไม่ต้องใช้ url
const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname,'public')))              //Use with 'public' folder

app.listen(8080,()=>{
    console.log("Server run at port 8080")
})