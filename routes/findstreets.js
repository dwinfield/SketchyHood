var request = require('request');  //make rest requests
var cheerio = require('cheerio');  //parse html
var express = require('express');
var router = express.Router();




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Enter in a zip code:');
});

router.get('/zip/:zip', function(req, res, next) {
    var zip = req.params.zip;
    console.log('entered zip: ' + zip);
    var baseUrl = properties.path().findStreets.baseUrl;

    var streetsInZip = '';

    if(baseUrl) {
        request(baseUrl + zip, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);

                var count = 0;

                $('.Tableresultborder tr').each(function(i, element){
                    var row = $(this);
                    if ( count === 0 || count === 1) {
                        //this is the header row that lists number of records
                        //as well as the city/state
                    }else {
                        var street = row.text().trim().toUpperCase();
                        streetsInZip+=street + '|';

                    }

                    count++;
                });

                console.log('hello');


            }else {
                console.log('error found' + response.statusCode);
            }
        });

    } else {
        var error = 'baseUrl is missing';
        res.send(error);
    }


});

module.exports = router;
