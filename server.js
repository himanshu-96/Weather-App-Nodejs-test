const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '289e8b958b67d96b09291c88fced1558';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
	res.render('index', {temp: null, error: null});
})

app.post('/', function (req, res) {
	let city = req.body.city;
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

	request(url, function (err, response, body) {
    		if(err){
      			res.render('index', {temp: null, error: 'Error, please try again'});
    		} 
			else{
      			let weather = JSON.parse(body)
      			if(weather.main == undefined){
        			res.render('index', {temp: null, error: 'Error, please try again'});
      			}
				else{
					let lon = `${weather.coord.lon}`;
					let lat = `${weather.coord.lat}`;
					let temp = `${weather.main.temp}`;
					let pressure = `${weather.main.pressure}`;
					let humidity = `${weather.main.humidity}`;
					let temp_min = `${weather.main.temp_min}`;
					let temp_max = `${weather.main.temp_max}`;
					let speed = `${weather.wind.speed}`;
					let clouds = `${weather.clouds.all}`;
					let visibility = `${weather.visibility}`;
					res.render('index', {city: city, lon: lon, lat: lat, temp: temp, pressure: pressure, humidity: humidity, temp_min: temp_min, temp_max: temp_max, speed: speed, pressure: pressure, visibility: visibility, clouds: clouds, error: null});
				}
	    	}
	});
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
