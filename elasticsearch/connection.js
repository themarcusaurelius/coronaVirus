const elasticsearch = require('elasticsearch');
const config = require('../config')
const { Elasticsearch: { API_ENDPOINT }} = config

var client = new elasticsearch.Client({  
  hosts: [
    API_ENDPOINT
  ],     
  //log: 'trace', 
  maxSockets: 30,
  keepAlive: false,  
  requestTimeout: Infinity,
  sniffInterval: false,
});  
  
module.exports = client;        