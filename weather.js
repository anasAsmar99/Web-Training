const express = require("express");
const request = require("request");
const app = express();


app.get('/', (req, res) => {
  let city = req.query.city;
  request(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1c4d6cbe11aabceba38c28e6a841d2d4`, function(error, response, body) {
    let data = JSON.parse(body);
    if(response.statusCode === 200)
    {
      res.send(`The Weather in "${city}" is ${data.weather[0].description} and the temp is ${data.main.temp} and wind speed is ${data.wind.speed}`);
    }
  });
});

app.listen(3000, () => console.log("Server started at port 3000"));
