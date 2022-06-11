module.exports = function(app) {
  const request = require('request');

  app.route('/api/v1/live-video').get((req, resOrigin) => {
    const queryStringObject = { 
      key: process.env.YOUTUBE_API_KEY, 
      part: 'snippet',
      type: 'video',
      eventType: 'live',
      q: `${req.query.cityName} live cam`
    };
    const url = `${process.env.YOUTUBE_API_URI}/search`;
    request({url:url, qs:queryStringObject}, (err, res, body) => {
      if(err) {
        console.log(err);
        return resOrigin.status(500).send(err);
      }
      return resOrigin.status(200).send(body);
    });
  })

  app.route('/api/v1/forecast').get((req, resOrigin) => {
    request(`${process.env.WEATHER_API_URI}/forecast?q=${req.query.cityName}&APPID=${process.env.WEATHER_API_KEY}`, { json: true }, (err, res, body) => {
      if (err) {
        return resOrigin.status(500).send(err);
      }
      if (res.statusCode == 404) {
        return resOrigin.status(404).send(res.body);
      }
      return resOrigin.status(200).send(body);
    });
  });

  app.route('/api/v1/current_weather').get((req, resOrigin) => {
    request(`${process.env.WEATHER_API_URI}/weather?q=${req.query.cityName}&APPID=${process.env.WEATHER_API_KEY}`, { json: true }, (err, res, body) => {
      if (err) {
        return resOrigin.status(500).send(err);
      }
      if (res.statusCode == 404) {
        return resOrigin.status(404).send(res.body);
      }
      return resOrigin.status(200).send(body);
    });
  });

};
