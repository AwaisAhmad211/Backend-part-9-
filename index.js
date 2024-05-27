const express = require('express') ;
const app = express() ;
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended : true})) ;
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine" , "ejs")
app.get("/",(req,res)=>{
    fs.readdir("./files",(err,files)=>{
        // console.log(files)
        res.render("index",{files : files});
    })
})

app.post("/create",(req,res)=>{
     fs.writeFile(`./files/${req.body.name.split(' ').join('')}.txt`,`${req.body.details}`,(err)=>{
        // console.log(req.body.details)
        res.redirect("/")
     })
})

app.get("/files/:fileName",(req,res)=>{
    // console.log(req.params.fileName)
    let fileNamee = req.params.fileName
    fs.readFile(`./files/${fileNamee}`,"utf-8",(err,fileData)=>{  
        res.render("show",{fileNamee,fileData})
    })
})
app.get("/edit/:fileName",(req,res)=>{
    let fileName = req.params.fileName ;
    res.render("edit",{fileName})
})
app.post("/edit",(req,res)=>{
   fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,(err)=>{
    res.redirect("/");
   })
})
app.listen(3000);