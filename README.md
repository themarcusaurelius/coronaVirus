## Novel coronavirus (2019-nCoV) Outbreak Tracking Dashboard

The case data visualized is collected from various sources, including WHO, U.S. CDC, ECDC, China CDC (CCDC), NHC, and DXY. 

DXY is a Chinese website that aggregates NHC and local CCDC situation reports in near real-time, providing more current regional case estimates than the national level reporting organizations are capable of, and is thus used for all the mainland China cases reported in our dashboard (confirmed, suspected, recovered, deaths). 

U.S. cases (confirmed, suspected, recovered, deaths) are taken from the U.S. CDC, and all other country (suspected and confirmed) case data is taken from the corresponding regional health departments. 

The dashboard is intended to provide the public with an understanding of the outbreak situation as it unfolds, with transparent data sources.

# How to use:

### Get Vizion Elasticsearch Credentials

Go to: [Vizion.ai](https://app.vizion.ai/)

1. Create a free account.
2. Select Elasticsearch from the Marketplace and follow through the onboarding process
3. Generate a stack with a relevant name
4. Copy and save the Credentials in a safe space!

  <p align="center">
    <img src="https://giant.gfycat.com/SpiffyBlindCobra.gif">
  </p>
  
  

 


### Download Application:
In a Bash terminal run the following command:

```
git clone https://github.com/themarcusaurelius/coronaVirus.git
```


### Install Dependencies:
CD into the directory and run the command:

```
npm install
```

### Open The Directory In A Code Editor
Create a file called 'config.js' in the root directory and add the following code substituting the 'API_ENDPOINT' with the Elasticsearh API Endpoint that was generated when you created your stack. Save.

```
const config = {
    Elasticsearch: {
        API_ENDPOINT: 'YOUR_ELASTICSEARCH_API_ENDPOINT_GOES_HERE'
    }
}

module.exports = config
```

<p align="center">
  <img src="https://i.imgur.com/8BseA0C.png">
</p>


### Start The Node.js Server
Open a terminal in the code editor and run the following command in the root directory:

```
npm run server
```
<p align="center">
  <img src="https://i.imgur.com/Jg4L1Bx.png">
</p>

### Create Mapping Types For Data
Go to: [Kibana](https://app.vizion.ai/kibana/app/my_login)

1. Enter the <b>Username</b> and <b>Password</b> that was generated when you created your stack
2. Click on the <b>DevTools</b> tab.

Create the 1st index:

```
PUT corona-virus
```

Create the 1st index mappings:
```
PUT corona-virus/_mappings/_doc 
{
  "properties" : {
    "Confirmed" : {
      "type" : "long"
    },
    "Country_Region" : {
      "type" : "text",
      "fields" : {
        "keyword" : {
          "type" : "keyword",
          "ignore_above" : 256
        }
      }
    },
    "Deaths" : {
      "type" : "long"
    },
    "Last_Update" : {
      "type" : "date"
    },
    "Latitude" : {
      "type" : "float"
    },
    "Location" : {
      "type" : "geo_point"
    },
    "Longitude" : {
      "type" : "float"
    },
    "OBJECTID" : {
      "type" : "long"
    },
    "Province_State" : {
      "type" : "text",
      "fields" : {
        "keyword" : {
          "type" : "keyword",
          "ignore_above" : 256
        }
      }
    },
    "Recovered" : {
      "type" : "long"
    }
  }
}
```

<p align="center">
  <img src="https://i.imgur.com/eTWkOd0.png">
</p>

Create the 2nd index:
```
PUT corona-virus-totals
```

Create the 2nd index mappings:
```
PUT corona-virus-totals/_mappings/_doc 
{
  "properties": {
    "Last_Update": {
      "type": "date"
    },
    "Mainland_China" : {
      "type" : "long"
    },
    "OBJECTID" : {
      "type" : "long"
    },
    "Other_Locations" : {
      "type" : "long"
    },
    "Report_Date" : {
      "type" : "date",
      "ignore_malformed" : true
    },
    "Report_Date_String" : {
      "type" : "date",
      "format" : "yyyy/MM/dd HH:mm:ss||yyyy/MM/dd||epoch_millis"
    },
    "Total_Confirmed" : {
      "type" : "long"
    },
    "Total_Recovered" : {
      "type" : "long"
    }
  }
}
```


### Upload Dashboard and Visuals to Kibana
1. Click on the <b>Management</b> tab and then click on <b>Saved Objects</b>
2. Import the <b>kibana.json</b> file located in the root directory of your project folder.

<p align="center">
  <img src="https://i.imgur.com/ejX1Rr4.png">
</p>

<p align="center">
  <img src="https://i.imgur.com/0GU0CiG.png">
</p>


### Seed The Elasticsearch Database

<b>Make Sure The Server Is Still Running</b>

There are two different data sources included in this application. The first one is overall daily totals of confirmed cases. This one is updated daily once. To seed all <b>Totals</b> data up to the current day, open a broswer and go to the following link: 
```
localhost:5002/api/data/virus-totals
```
Hit enter and the data will be sent up to Elasticsearch:

<p align="center">
  <img src="https://i.imgur.com/2aoANI4.png">
</p>

In your terminal you will see the following messages if everything was uploaded successfully:
<p align="center">
  <img src="https://i.imgur.com/PYLb5Cb.png">
</p>

Now, It is time to run the recurring data ingestion. In the broswer, as before, enter the following"
```
http://localhost:5002/api/data/virus
```

This will run a revolving check every two minutes for new data and will ingest it into Elasticsearch automatically as long as the server is running. You can watch in the terminal in real-time every two minutes for the data check. 

## View The Dashboard In Kibana

Back in Kibana, go to the <b>Dashboards</b> tab and click on the <b>Corona-Virus</b> dashboard to open it. You may need to change the <b>Time Range</b> To a longer period to include all the data that has been collected to get an accurate overall view of the ongoing outbreak situation, as well as the <b>Refresh Interval</b> to 5 seconds to always have an up-to-date-dashboard.


Nearly everything is clickable and the dashboard will dynamically adjust based on what you jave clicked on so play around with the data and see what you can discover!

<p align="center">
  <img src="https://i.imgur.com/pegZHkx.png">
</p>









