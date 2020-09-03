const express= require("express");
const bodyParser= require("body-parser");
let ejs = require('ejs');
var https = require('https');

const app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var weatherDescription='';
var temp= 0;
var imgURL='';
var visibility="invisible";


app.get("/", function(req, res){
    visibility="invisible";
    res.render("lindex",{weatherDescription:weatherDescription, temp:temp, imgURL:imgURL, visibility:visibility })
});



app.post("/", function(req, res){

    const query= req.body.cityName;
    const apiKey="52af0baba452d35f307481f2a348c775";
    const appUnit="metric";

    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query + " &appid="+ apiKey +"&units="+ appUnit;

    https.get(url, function(response){
         console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData=JSON.parse(data);
             temp= weatherData.main.temp;
             weatherDescription = weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            imgURL="https://openweathermap.org/img/wn/"+ icon + "@2x.png";
            visibility="visible";
            res.render("lindex", {weatherDescription:weatherDescription, temp:temp, imgURL:imgURL, visibility:visibility });
            visibility="invisible";
            })
    })
})




app.listen(3000, function(){
    console.log("server running on port 3000")
})