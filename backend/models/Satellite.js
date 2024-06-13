const mongoose = require('mongoose');

const SatelliteSchema = new mongoose.Schema({
  name: String,
  launch_year: String,
  time_utc: String,
  latitude: String,
  longitude: String,
  altitude: String,
  elevation: String,
},{ collection: 'settallite' });

const Satellite = mongoose.model('settallite', SatelliteSchema);

module.exports = Satellite;
