
module.exports = function(app) {
  const request = require('request');

  app.route('/api/v1/forecast').get((req, resOrigin) => {
    request(`${process.env.WEATHER_API_URI}/forecast?q=${req.query.cityName}&APPID=${process.env.WEATHER_API_KEY}`, { json: true }, (err, res, body) => {
      console.log(body);
      if (err)
        return resOrigin.send(500, err);
      return resOrigin.send(200, body);
    });
  });

  app.route('/api/v1/current_weather').get((req, resOrigin) => {
    request(`${process.env.WEATHER_API_URI}/weather?q=${req.query.cityName}&APPID=${process.env.WEATHER_API_KEY}`, { json: true }, (err, res, body) => {
      if (err)
        return resOrigin.send(500, err);
      return resOrigin.send(200, body);
    });
  });

};
