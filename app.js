const express=require("express");
const https=require("https")
const bodyParser = require("body-parser");
const app=express()
app.use(bodyParser.urlencoded({extended:true}))
 app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
 })
app.post("/",function(req,res){
const place=req.body.cityName
 const appid="ef114f15eae1de1cf99f1e8234108c70"
 const unit="metric"
 const u="https://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid="+appid+"&units="+unit
 https.get(u,function(response){
     console.log(response.statusCode)

     response.on("data",function(data){
         const d=JSON.parse(data)
         const t=d.main.temp
        //  const i=d.weather[0].icon 
        //  const iu="http://openweathermap.org/img/wn/"+i+"@2x.png"
        //  res.write("<img src='"+iu+"'></img>")
         res.write("<h1>the temp in "+place+ " is " +t+ " degree celsius</h1>")
         res.send()
     })
 })
})




app.listen(3000,function(){
console.log("Server Is Running");
})