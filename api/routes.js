
module.exports = function(app) {
  const request = require('request');

  app.route('/api/v1/forecast').get((req, resOrigin) => {
    request(`${process.env.WEATHER_API_URI}/forecast?q=${req.query.cityName}&APPID=${process.env.WEATHER_API_KEY}`, { json: true }, (err, res, body) => {
      if (err)
        return resOrigin.status(500).send(err);
      return resOrigin.status(200).send(body);
    });
  });

  app.route('/api/v1/current_weather').get((req, resOrigin) => {
    request(`${process.env.WEATHER_API_URI}/weather?q=${req.query.cityName}&APPID=${process.env.WEATHER_API_KEY}`, { json: true }, (err, res, body) => {
      if (err)
        return resOrigin.status(500).send(err);
      return resOrigin.status(200).send(body);
    });
  });

};
