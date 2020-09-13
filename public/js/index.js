//funzione avviata appena caricata la homepage, ottiene i valori dall'api e li stampa come elementi della lista in lindex.ejs
function geoFindMe() {
  
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
  
     //utilizzo la chiave e le coordinate per accedere all'api
      var key = config.API_KEY;
      fetch('https://api.openweathermap.org/data/2.5/weather?lat='+ latitude +'&lon='+ longitude +'&appid='+ key)  
        .then(function(resp) { return resp.json() }) // Convert data to json
          .then(function(data) {
            console.log(data);
            const listed=document.querySelector(".list-group");

            //def. meteo
            const listel=document.createElement("li");
            listel.classList.add("list-group-item");
            const iconCode= data.weather[0].icon; 
            const iconURL= "http://openweathermap.org/img/wn/"+iconCode+"@2x.png";
            const imG= document.createElement("IMG");
            imG.src=iconURL;
            imG.classList.add("iconcss");
            listel.textContent=" Weather: "+ data.weather[0].main;
            listed.appendChild(listel);
            listel.appendChild(imG);

            //def. temp
            const listel1=document.createElement("li");
            listel1.classList.add("list-group-item");
            const tempcontent=(Number(data.main.temp)- 273.15).toFixed(2);
            listel1.textContent="Temperature: "+tempcontent;
            const tempImg= document.createElement("IMG");
            tempImg.src="css/img/thermometer.svg";
            tempImg.classList.add("iconcss");
            listed.appendChild(listel1);
            listel1.appendChild(tempImg);

            //def. velocità vento
            const listel2=document.createElement("li");
            listel2.classList.add("list-group-item");
            const windImg= document.createElement("IMG");
            windImg.src="css/img/wind.svg";
            listel2.textContent="Wind speed: " + data.wind.speed +"m/s ";
            windImg.classList.add("iconcss");
            listed.appendChild(listel2);
            listel2.appendChild(windImg);

            //def. alba
            const sunRise=data.sys.sunrise;
            var date = new Date(sunRise * 1000);
            var hours = date.getHours();
            var minutes =date.getMinutes();
            const listel3=document.createElement("li");
            listel3.classList.add("list-group-item");
            listel3.textContent="Sunrise time: "+ hours+":"+minutes+" AM ";
            const sunriseImg= document.createElement("IMG");
            sunriseImg.src="css/img/sunrise.svg";
            sunriseImg.classList.add("iconcss");
            listed.appendChild(listel3);
            listel3.appendChild(sunriseImg);

            //def. tramonto
            const sunSet=data.sys.sunset;
            var date1 = new Date(sunSet * 1000);
            var hours1 = date1.getHours();
            var minutes1 =date1.getMinutes();
            const listel4=document.createElement("li");
            listel4.classList.add("list-group-item");
            listel4.textContent="Sunset time: "+ hours1+":"+minutes1+" PM ";
            const sunsetImg= document.createElement("IMG");
            sunsetImg.src="css/img/sunset.svg";
            sunsetImg.classList.add("iconcss");
            listed.appendChild(listel4);
            listel4.appendChild(sunsetImg);

        
          })//def. risposta  all'errore durante l'operazione di fetch
        .catch(function(err) {
          console.log(err + " 1");
          const listed=document.querySelector(".list-group");
          const listel=document.createElement("li");
          listel.classList.add("list-group-item");
          listel.textContent=" There has benn an error: "+ err;
          listed.appendChild(listel);
      });
    }
  //def. risposta all'errore di geolocalizzazione
    function error() {
      console.log('Unable to retrieve your location');
      const listed=document.querySelector(".list-group");
      const listel=document.createElement("li");
      listel.classList.add("list-group-item");
      listel.textContent=" Unable to retrieve your location";
      listed.appendChild(listel);
    }
    //codice che fa avviare la funzione richiedendo al browser se è accessibile la geolocalizzazione
    if(!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
      const listed=document.querySelector(".list-group");
      const listel=document.createElement("li");
      listel.classList.add("list-group-item");
      listel.textContent=" Error: geolocation is not supported by your browser";
      listed.appendChild(listel);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
  //avvio la funzione
  geoFindMe();
//dopo aver avviato la funzione geoFindMe e aver atteso 1s verrà mostrata la lista 
  var elementsToShow = document.querySelectorAll('.show-on-scroll');
  setTimeout(function loop() {

    Array.prototype.forEach.call(elementsToShow, function(element){
          element.classList.add('is-visible');
        })
      },1000);



 

