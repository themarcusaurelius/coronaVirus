const elasticsearch=require('elasticsearch');
const MARKS_DASHBOARD = "https://vz5ub26znfu682o50c:rdrca5ixdrk6rqlw@espnap.vizion.ai:443"
const DEMO_DASHBOARD = "https://vzi5rfm1qww6l0oo4q:o5m60df9bdet16s1@espnap.vizion.ai:443"

var client = new elasticsearch.Client({  
  hosts: [
    //MARKS_DASHBOARD,
    DEMO_DASHBOARD
  ],     
  //log: 'trace', 
  maxSockets: 30,
  keepAlive: false,  
  requestTimeout: Infinity,
  sniffInterval: false,
});  
  
module.exports = client;        