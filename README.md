# Weather
This is a simple weather app that fetches weather for this week, weather today and current weather. 

Example output

```
Weather for Oslo, Norway

This week
---------
Weather: Light rain on Thursday, with high temperatures bottoming out at 24°C on Friday.

Today
-----
Weather: Clear throughout the day.
in temp: 11.58°C
Max temp: 26.53°C
Wind speed: 1.23 m/s

Currently
---------
Weather: Clear
Temp: 26.44°C
Apparent temp: 26.44°C
Wind speed: 1.49 m/s
```


###How to install:
git clone https://github.com/rajohan/weather.git
cd weather && npm install

###Setup:
You will have to add a Google maps API key and a Dark Sky API key

Google: node app.js googleKey -k "Your key"
Dark sky: node app.js darkSkyKey -k "Your key"

###Usage:
Fetch weather for an address: node app.js weather -a "address"
Set a default address: node app.js weather-default -a "Address"
Fetch weather for default address: node app.js weather
