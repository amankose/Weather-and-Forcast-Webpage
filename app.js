const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

  res.sendFile(__dirname + "/index.html");


});


app.post("/", function(req, res){

  const City = req.body.City
  //console.log(req.body.City);
  //console.log("Post request recieved.");

  //const city = "maharashtra";
  const apikey = "927e300c7d3c19ffb9a32149a4d934ba";
  const unit = "metric";
  const url = "https://" + "api.openweathermap.org/data/2.5/weather?q=" + City + "&appid=" + apikey + "&units=" + unit;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      console.log(data);
      var weatherdata = JSON.parse(data);
      console.log(weatherdata);
      const temp = weatherdata.main.temp;
      console.log("Temperature is: " + temp + " degree celcius!");

      const desc = weatherdata.weather[0].description;
      console.log("The weather is: " + desc + "!" );

      const icon = weatherdata.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";


      res.write("<h1> Temperature of "  + City + " is: "  + temp + " degree celcius! </h1>");
      res.write("<h2> The Weather is " + desc + "!<h2>");
      res.write("<img src=" + imageURL + ">");
      res.send();
      //res.send( "<h1> Temperature of your area is: "  + temp + " degree celcius! </h1>");
      //res.send( "<h1> Temperature of your area is: "  + temp + " degree celcius! </h1>" + "<br> The weather is currently " + desc + "!");

    });
  });
  //res.send("Server is running.");

});






app.listen(3000, function(){
  console.log("Server started at 3000.")
});
