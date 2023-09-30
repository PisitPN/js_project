// Use mongoose
const mongoose = require('mongoose')

// connect to MongoDB
const dbUrl = 'mongodb://127.0.0.1:27017/productDB'
mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch(err=>console.log(err))

// Design Schema
let productSchema = mongoose.Schema({
    name:String,
    price:Number,
    image:String,
    description:String
})

// Creat Model
let Product = mongoose.model("products",productSchema)

// Export Model
module.exports = Product


// SaveData function
module.exports.saveProduct=function(model,data){
    model.save(data)
}