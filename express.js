// ใช้ url เป็นตัวนำไปยังไฟล์ template
// // Express
// const express = require('express')
// const path = require('path')
// const app = express()

// const indexPage = path.join(__dirname,"templates/index.html")
// const productPage1 = path.join(__dirname,"templates/product1.html")

// app.get("/",(req,res)=>{
//     // res.send("<h1>Hello Express.js</h1>")
//     res.status(200)         //send html status code
//     res.type('text/html')   //send file type
//     res.sendFile(indexPage) //send html file
// })
// app.get("/product",(req,res)=>{
//     // res.send("<h1>Hello Product</h1>")
//     res.sendFile(productPage1) //send html file
// })

// app.listen(8080,()=>{
//     console.log("Server run at port 8080")
// })

/////////////////////////////////////////
// Express-Router
const express = require('express')
const app = express()
const router = require('./routes/myRouter.js')
app.use(router)

app.listen(8080,()=>{
    console.log("Server run at port 8080")
})