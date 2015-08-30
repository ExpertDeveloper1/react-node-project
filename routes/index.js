var express = require('express');
var router = express.Router();
var http = require('http');
var $ = require('jquery');

/* GET home page. */
function getNameList() {
    var nameList = [];
    nameList.push('abc');
    return nameList;
}
function inlist(list) {


}
router.get('/', function (req, res) {
    res.render('index', {title: 'abc'});
});
router.get('/json', function (req, res) {
    var url='';

    http.get(url, function (result) {
        console.log('get url:'+url +'....');
        var dataRes = '';
        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            // console.log(chunk);
            dataRes += chunk;
        });

        result.on('end', function () {
            var nameList = getNameList();
            // console.log(dataRes);
            console.log('after');
            var dataObject = JSON.parse(dataRes);
            var coutResult = [];

            for (var obj in dataObject) {
                if (nameList.indexOf(obj) > -1) {
                    var info={};
                    info.name=obj;
                    info.commits = 0;
                    info.addline = 0;
                    info.subline = 0;
                    info.totalline = 0;

                    for (var objValue in dataObject[obj]) {
                        info.commits += dataObject[obj][objValue][0];
                        info.addline += dataObject[obj][objValue][1];
                        info.subline += dataObject[obj][objValue][2];
                    }
                    info.totalline = info.addline - info.subline;
                    //  console.log(obj + '::::' + JSON.stringify(coutResult[obj]));
                    coutResult.push(info);

                }
            }
             console.log(JSON.stringify(coutResult));


            res.json(JSON.stringify(coutResult));
        });

    }).on('error', function (e) {
        console.log("Got error: " + e.message);
        next(e);
    });

});



module.exports = router;
