const express= require("express");
const bodyParser= require("body-parser");
const _ =require("lodash")
let ejs = require('ejs');
var https = require('https');
var fs = require('fs');


const app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


//Imposto la home page come lindex.ejs
app.get("/", function(req, res){

    res.render("lindex");
});
//definisco le azione successive all'inserimento della città nel form
app.post("/", function(req, res){

    
    const query= req.body.cityName;
    const apiKey= '';
    const unit = "metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query + " &appid="+ apiKey +"&units="+unit ;
    
    //avvio una https request e ne sfrutto il risultato
    https.get(url, function(response){
         console.log(response.statusCode);

         //se lo statusCode in risposta corrisponde ad esito positivo (200) avvia la funzione e restituisce i valori necessari in postindex.ejs
        if(response.statusCode===200){
        response.on("data", function(data){
            const weatherData=JSON.parse(data);
            console.log(weatherData);

            const sunrise=_.get(weatherData,"sys.sunrise","");
            let date = new Date(sunrise * 1000);
            let hours = date.getHours();
            let minutes =date.getMinutes();
            const sunrise1= ""+hours+":"+minutes+"";

            const sunset=_.get(weatherData,"sys.sunset","");
            let date1 = new Date(sunset * 1000);
            let hours1 = date1.getHours();
            let minutes1 =date1.getMinutes();
            const sunset1= ""+hours1+":"+minutes1+"";

            const wind=_.get(weatherData,"wind.speed","");

            const city=query;
            const temp= _.get(weatherData,"main.temp","");
            const weatherDescription = _.get(weatherData,"weather[0].description","");
            const icon=_.get(weatherData,"weather[0].icon","");
            const imgURL="https://openweathermap.org/img/wn/"+ icon + "@2x.png";
            res.render("postIndex", {
                weatherDescription:weatherDescription,
                temp:temp, 
                imgURL:imgURL, 
                city:city,
                sunrise:sunrise1, 
                sunset:sunset1, 
                wind:wind
            });
            });
            //in caso il codice non sia positivo rendo la pagina che mostre una scritta introduttiva e il codice di errore
        }else{
            res.render("errors.ejs", {err:response.statusCode})
        }
    });

      
  
});



//avvio il server locale 
app.listen(process.env.PORT || 3000, function(){
    console.log("server running on port 3000")
})