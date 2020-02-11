const express = require('express');
const router = express.Router();
const axios = require('axios')
const client = require('../../elasticsearch/connection');
const URL = `https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/cases_time_v2/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Report_Date_String%20asc&outSR=102100&resultOffset=0&resultRecordCount=2000&cacheHint=true`

//======= API ROUTE =======\\
router.get('/virus-totals', function (req, res) {
    res.send('Running Application...');
    console.log('Loading Application...')

    // setInterval(() => { 
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

        // ====== API call to get data ====== \\
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
                    console.log('Totals Data Received!')
                }

                results = VIRUS.data.features

                //console.log(results)

                console.log('Indexing All Totals Data Into Elasticsearch')

                //==== Map through the data to create a new custom data object ====\\
                results.map(async data => (
                    virusObject = {
                        OBJECTID: data.attributes.ObjectId,
                        Mainland_China: data.attributes.Mainland_China,
                        Other_Locations: data.attributes.Other_Locations,
                        Report_Date: data.attributes.Report_Date,
                        Total_Confirmed: data.attributes.Total_Confirmed,
                        //Total_Deaths: data.attributes.Total_Deaths,
                        Total_Recovered: data.attributes.Total_Recovered,
                        Report_Date_String: data.attributes.Report_Date_String
                     
                    },

                    //console.log(virusObject),

                    //==== Index the custom data objects into Elasticsearh ====\\
                    await client.index({ 
                        index: 'corona-virus-totals',
                        id: data.attributes.ObjectId,
                        type: '_doc',
                        body: virusObject
                    }), (err, res, status) => {
                        console.log(res);
                    }
                ));

                if (VIRUS.data.length) {
                    indexAllDocs();
                } else {
                    console.log('All Totals Data Has Been Indexed!');
                };
            } catch (err) {
                console.log(err)
            };

            //console.log('Preparing For The Next Data Check...');
        };

        pingElasticsearch()
        indexAllDocs()
    // }, 180000);
});

module.exports = router;