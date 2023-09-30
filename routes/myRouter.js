const express = require('express')
const path = require('path')
const router = express.Router()

const indexPage = path.join(__dirname,"../templates/index.html")            // ../  ถอย ออกจากโฟลเดอร์ปัจจุบัน 1 โฟลเดอร์ แล้วไปตามpathต่อ
const productPage1 = path.join(__dirname,"../templates/product1.html")
const productPage2 = path.join(__dirname,"../templates/product2.html")
const productPage3 = path.join(__dirname,"../templates/product3.html")

router.get("/",(req,res)=>{
    // res.send("<h1>Hello Express.js</h1>")
    res.status(200)         //send html status code
    res.type('text/html')   //send file type
    res.sendFile(indexPage) //send html file
})
router.get("/product/:id",(req,res)=>{
    // res.send("<h1>Hello Product</h1>")
    // res.sendFile(productPage1) //send html file
    const productID = req.params.id
    if(productID==="1"){
        res.sendFile(productPage1) //send html file  
    }else if(productID==="2"){
        res.sendFile(productPage2) //send html file  
    }else if(productID==="3"){
        res.sendFile(productPage3) //send html file  
    }else{
        // res.status(404)
        // res.send("<h1>404 Page Not Found</h1>")
        res.redirect('/')       //redirect => เปลี่ยนเส้นทาง
    }
})

module.exports = router
