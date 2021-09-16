const request = require("request");

const geocode = (address, cb) => {
 const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
  address
 )}.json?access_token=pk.eyJ1IjoiZGhpcmFqMWRlZSIsImEiOiJja3RpbzRjMWwxNDBhMndtcnFvYXp5MW40In0.XP1rBAGs-DneC9r3nDQVDA&limit=1`;
 request({ url: geoUrl, json: true }, (err, res) => {
  if (err) {
   cb("unable to connect or wrong address", undefined);
  } else if (res.body.features.length === 0) {
   cb("Place not found", undefined);
  } else {
   const datas = res.body.features[0];
   cb(undefined, {
    place: datas.place_name,
    coord: datas.center,
   });
  }
 });
};

module.exports = geocode;
