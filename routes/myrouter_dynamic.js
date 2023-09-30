const express = require('express')
const path = require('path')
const router = express.Router()
// Call Model
const Product = require('../models/products')

// File Upload
const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/images/products')        //saved file Location
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+".jpg")                  //change file name using Date
    }
})

const upload = multer({
    storage:storage
})

router.get('/',async (req,res)=>{
    try {
        const products = await Product.find().exec();
        //console.log(products)
        res.render('index', { products });
      } catch (err) {
        // Handle any errors here
        console.error(err);
        // Respond with an error page or appropriate error handling
        res.status(500).send('Internal Server Error');
      }      
})

router.get('/add-product',(req,res)=>{
    // // cookie-ver
    // if(req.cookies.login){
    //     res.render('form.ejs')
    // }else{
    // res.render('admin.ejs')
    // }

    // session-ver
    if(req.session.login){
        res.render('form.ejs')
    }else{
    res.render('admin.ejs')
    }
    
})

router.get('/manage',async (req,res)=>{
    // // cookie-ver
    // if(req.cookies.login){
    //     try {
    //         const products = await Product.find().exec();
    //         res.render('manage', { products });
    //     } catch (err) {
    //         // Handle any errors here
    //         console.error(err);
    //         // Respond with an error page or appropriate error handling
    //         res.status(500).send('Internal Server Error');
    //     }
    // }else{
    //     res.render('admin.ejs')
    //}

    // session-ver
    if(req.session.login){
        try {
            const products = await Product.find().exec();
            res.render('manage', { products });
        } catch (err) {
            // Handle any errors here
            console.error(err);
            // Respond with an error page or appropriate error handling
            res.status(500).send('Internal Server Error');
        }
    }else{
        res.render('admin.ejs')
    }
    
})

router.get('/logout',(req,res)=>{                  //.post => ส่งค่าแบบมองไม่เห็นในurl ปลอดภัยกว่า ใช้คู่กับreq.body
    //cookie-ver
    // res.clearCookie('username')
    // res.clearCookie('password')
    // res.clearCookie('login')
    //res.redirect('/manage')

    //session-ver
    req.session.destroy()
    res.redirect('/manage')
})

router.get('/delete/:id',async (req,res)=>{
    try {
        Product.findByIdAndDelete(req.params.id,{useFindAndModify:false}).exec()
        res.redirect('/manage')
    } catch(err){
        // Handle any errors here
        console.error(err);
        // Respond with an error page or appropriate error handling
        res.status(500).send('Internal Server Error');
    }
})

// router.get('/insert',(req,res)=>{                //.get => ส่งค่าแบบมองเห็นได้ในurl ใช้คู่กับ req.query
//     console.log(req.query);
//     res.render('form.ejs')
// })

router.post('/insert',upload.single("image"),(req,res)=>{                  //.post => ส่งค่าแบบมองไม่เห็นในurl ปลอดภัยกว่า ใช้คู่กับreq.body
    //console.log(req.file);
    //console.log(req.body);
    let data = new Product({
        name:req.body.name,
        price:req.body.price,
        image:req.file.filename,
        description:req.body.description
    })
    console.log(data)
    async function saveData(){
       await Product.saveProduct(data)
       res.redirect('/')
    }
    saveData();

})

router.get('/:id',async (req,res)=>{
    const product_id = req.params.id
    try{
        const doc = await Product.findOne({_id:product_id}).exec()
        //console.log(doc)
        res.render('product.ejs',{ product:doc })
    } catch(err) {
        // Handle any errors here
        console.error(err);
        // Respond with an error page or appropriate error handling
        res.status(500).send('Internal Server Error');
    }
    
})



router.post('/edit',async (req,res)=>{                  //.post => ส่งค่าแบบมองไม่เห็นในurl ปลอดภัยกว่า ใช้คู่กับreq.body
    const edit_id = req.body.edit_id
    try{
        const doc = await Product.findOne({_id:edit_id}).exec()
        //console.log(doc)
        res.render('edit.ejs',{ product:doc })
    } catch(err) {
        // Handle any errors here
        console.error(err);
        // Respond with an error page or appropriate error handling
        res.status(500).send('Internal Server Error');
    }
})

router.post('/update',(req,res)=>{                  //.post => ส่งค่าแบบมองไม่เห็นในurl ปลอดภัยกว่า ใช้คู่กับreq.body
    const update_id = req.body.update_id
    let data = {
        name:req.body.name,
        price:req.body.price,
        description:req.body.description
    }
    // console.log(update_id)
    // console.log(data)
    Product.findByIdAndUpdate(update_id,data,{useFindAndModify:false}).exec()
    res.redirect("/manage")

})

// //cookie-login
// router.post('/login',(req,res)=>{                  //.post => ส่งค่าแบบมองไม่เห็นในurl ปลอดภัยกว่า ใช้คู่กับreq.body
//     const username = req.body.username
//     const password = req.body.password
//     const timeExp = 20000 // 10 sec

//     if (username === "admin" && password === "123"){
//         //create cookie
//         res.cookie('username',username,{maxAge:timeExp})
//         res.cookie('password',password,{maxAge:timeExp})
//         res.cookie('login',true,{maxAge:timeExp})       //true => login success
//         res.redirect("/manage")
//     }else{
//         res.render('404.ejs')
//     }
// })

//session-login
router.post('/login',(req,res)=>{                  //.post => ส่งค่าแบบมองไม่เห็นในurl ปลอดภัยกว่า ใช้คู่กับreq.body
    const username = req.body.username
    const password = req.body.password
    const timeExp = 20000 // 10 sec

    if (username === "admin" && password === "123"){
        //create session
        req.session.username = username
        req.session.password = password
        req.session.login = true
        req.session.cookie.maxAge = timeExp
        res.redirect("/manage")
    }else{
        res.render('404.ejs')
    }
})



module.exports = router
