const NodeGeocoder = require('node-geocoder');
const { _getHttpAdapter } = require('node-geocoder/lib/geocoderfactory');

const options = {
    provider: process.env.GEOCODER_PROVIDER,
    HttpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
