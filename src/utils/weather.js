const request = require("request");

const weather = (address, cb) => {
 if (Array.isArray(address)) {
  const [long, lat] = address;
  var urlparam = lat.toString() + "," + long.toString();
 } else {
  var urlparam = address;
 }
 const url = `http://api.weatherstack.com/current?access_key=428ea855e292b74fa4c2baa738558830&query=${urlparam}`;
 request({ url, json: true }, (err, res) => {
  if (err) {
   cb("unable to connect or place entered doesn't exist", undefined);
  } else if (res.body.error) {
   cb({ code: 615, info: res.body.error.info }, undefined);
  } else {
   const data = res.body;
   cb(
    undefined,
    `${data.current.weather_descriptions[0]}. It is ${data.current.temperature}deg celsius, but it feels like ${data.current.feelslike}deg celsius. `
   );
  }
 });
};

module.exports = weather;
