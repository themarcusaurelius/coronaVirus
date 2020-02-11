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
    <img src="https://giant.gfycat.com/MisguidedUncommonAnnelid.gif">
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
Create a file called 'config.js' in the root directory and add the following code substituting the API_ENPOINT with the Elasticsearh API Endpoint that was generated when you created your stack. Save.

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
Open a terminal in the code editor and run the following command:

```
npm run server
```
<p align="center">
  <img src="https://i.imgur.com/Jg4L1Bx.png">
</p>












<p align="center">
  <img src="https://i.imgur.com/pegZHkx.png">
</p>






