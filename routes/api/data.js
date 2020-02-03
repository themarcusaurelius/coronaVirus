const express = require('express');
const router = express.Router();
const axios = require('axios')
const client = require('../../elasticsearch/connection');
const URL = `https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc%2CCountry_Region%20asc%2CProvince_State%20asc&resultOffset=0&resultRecordCount=250&cacheHint=true`;

router.get('/virus', function (req, res) {
    res.send('Running Application...');
    console.log('Loading Application...')

    setInterval(() => { 
        //======= Check that Elasticsearch is up and running =======\\
        pingElasticsearch = async () => {
            await client.ping({
                requestTimeout: 30000,
            }, function(error,res) {
                if (error) {
                    console.error('elasticsearch cluster is down!');
                } else {
                    console.log('Elasticsearch Ready');
                }
            });
        }

        console.log('Getting Data From Host')

        // ====== Get Data From USGS and then index into Elasticsearch ====== \\
        indexAllDocs = async () => {
            try {
                const VIRUS = await axios.get(`${URL}`,{
                    headers: {
                        'Content-Type': [
                            'application/json',  
                            'charset=utf-8' 
                        ]
                    }
                });

                if (VIRUS) {
                    console.log('Data Received!')
                }
                
                results = VIRUS.data.features

                console.log('Indexing All Data Into Elasticsearch')

                results.map(async data => (
                    virusObject = {
                        OBJECTID: data.attributes.OBJECTID,
                        Province_State: data.attributes.Province_State,
                        Country_Region: data.attributes.Country_Region,
                        Last_Update: data.attributes.Last_Update,
                        Confirmed: data.attributes.Confirmed,
                        Deaths: data.attributes.Deaths,
                        Recovered: data.attributes.Recovered,
                        Latitude: data.attributes.Lat,
                        Longitude: data.attributes.Long_,
                        Location:
                            { 
                                lat: data.attributes.Lat,
                                lon: data.attributes.Long_
                            }
                    },

                    await client.index({ 
                        index: 'corona-virus',
                        id: data.attributes.OBJECTID,
                        type: '_doc',
                        body: virusObject
                    }), (err, res, status) => {
                        console.log(res);
                    }
                ));

                //console.log(virusObject)

                if (VIRUS.data.length) {
                    indexAllDocs();
                } else {
                    console.log('All Data Has Been Indexed!');
                };
            } catch (err) {
                console.log(err)
            };

            console.log('Preparing For The Next Data Check...');
        };

        pingElasticsearch()
        indexAllDocs()
    }, 180000);
});


module.exports = router;