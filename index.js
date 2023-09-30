// //Callback function
// function calculate(x,y,callback){
//     console.log("Calculating...")
//     setTimeout(()=>{
//         const sum = x+y
//         callback(sum)
//     },3000)
// }

// function display(result){
//     console.log(`Result = ${result}`)
// }

// calculate(100,50,display)

//////////////////////////////////////////
// // Callback Example
// function downloading(url,callback){
//     console.log(`Downloading ${url}`)
//     setTimeout(()=>{
//         callback(url1)
//     },2000) 
// }

// // function complete(result){
// //     console.log(`${result} Download Completed!`)
// // }

//// Callback Hell
// const url1 = "kong.dev/file1.json"
// const url2 = "kong.dev/file2.json"
// const url3 = "kong.dev/file3.json"
// downloading(url1,function(result){
//     console.log(`${result} Download Completed!`)
//     downloading(url2,function(result){
//         console.log(`${result} Download Completed!`)
//         downloading(url3,function(result){
//             console.log(`${result} Download Completed!`)
//         })
//     })
// })

//////////////////////////////////////////////////////
// // Promise => ใช้แทนcallback หลายๆ ชั้น
// const connect = true
// const url1 = "kong.dev/file1.json"
// const url2 = "kong.dev/file2.json"
// const url3 = "kong.dev/file3.json"
// const url4 = "kong.dev/file4.json"
// const url5 = "kong.dev/file5.json"
// //resolve = success
// //reject = fail
// function downloading(url){
//     console.log(`Downloading from ${url}`)
//     return new Promise(function(resolve,reject){
//         setTimeout(()=>{
//             if(connect){
//                 resolve(`Download ${url} Completed`)
//             }else{
//                 reject(`ERROR`)
//             }
//         },1000)
//     })
// }
// //.then(resolve){}
// //.catch(reject){}
// // Promise Hell
// downloading(url1)
// .then(result=>{
//     console.log(result)
//     return downloading(url2)
// })
// .then(result=>{
//     console.log(result)
//     return downloading(url3)
// })
// .then(result=>{
//     console.log(result)
//     return downloading(url4)
// })
// .then(result=>{
//     console.log(result)
//     return downloading(url5)
// })
// .then(result=>{
//     console.log(result)
// })
// .catch(err=>{
//     console.log(err)
// })
// .finally(()=>{
//     console.log("END")
// })

///////////////////////////////////////////////////////
// //Async & Await

// const connect = true
// const url1 = "kong.dev/file1.json"
// const url2 = "kong.dev/file2.json"
// const url3 = "kong.dev/file3.json"
// const url4 = "kong.dev/file4.json"
// const url5 = "kong.dev/file5.json"
// //resolve = success
// //reject = fail
// function downloading(url){
//     console.log(`Downloading from ${url}`)
//     return new Promise(function(resolve,reject){
//         setTimeout(()=>{
//             if(connect){
//                 resolve(`Download ${url} Completed`)
//             }else{
//                 reject(`ERROR`)
//             }
//         },1000)
//     })
// }



// async function start(){
//     console.log(await downloading(url1))
//     console.log(await downloading(url2))
//     console.log(await downloading(url3))
//     console.log(await downloading(url4))
//     console.log(await downloading(url5))
// }
// start()

////////////////////////////////////////////
// // Module
// const mymodule = require('./mymodule.js')
// const now = require('./mymodule.js').getCurrentTime

// console.log(now())
// console.log(mymodule.add(10,20))

// //Read&Write File (Blocking)
// const fs = require('fs')

// //Read file
// const data = fs.readFileSync('./myfile.txt','utf-8')
// console.log(data)
// console.log('End')

// //Write file
// const outputText = `Hello Node.js Sync \n${data}\n ไฟล์ถูกเขียนเมื่อ ${new Date()}`
// fs.writeFileSync("./output.txt",outputText)
// console.log("File Write Complete!!!")

//Read & Write File (Non-Blocking)
const fs = require('fs')
const data = fs.readFile('./myfile.txt','utf-8',(err,data)=>{
    if(err) return console.log('ERROR',err)
    console.log(data)
    const outputText =  `Hello Node.js Async \n${data}\n ไฟล์ถูกเขียนเมื่อ ${new Date()}`
    fs.writeFile('./output.txt',outputText,err=>{
        if(err) return console.log('ERROR',err)
    })
})
console.log('END')