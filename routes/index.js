var express = require('express');
var router = express.Router();
var http = require('http');
var $ = require('jquery');
var _ = require('underscore');
//var objectAssign=require('object-assign');


/* GET home page. */
function getNameList() {
    var nameList = [];
    nameList.push('specialNum1');
    nameList.push('specialNum2');
    nameList.push('specialNum3');
    return nameList;
}

function merge(objectSource, keyDest, keysource) {
    console.log(_.isObject(this));
    if (_.isObject(this) && _.has(objectSource, keyDest) && _.has(objectSource, keysource)) {
         console.log('passing condition check');
        _.each(objectSource[keysource],function(value,key){
            //在dest中存在则需要合并
            if(_.has(objectSource[keyDest],key)){
                objectSource[keyDest][key]=value.map(function(valueSing,index){
                           return valueSing+objectSource[keyDest][key][index];
                });
            }else{
                //如果在dest中不存在，直接复制过去
                objectSource[keyDest][key]=objectSource[keysource][key];
            }

        });
        console.log(JSON.stringify(objectSource[keyDest]));
    }

}

router.get('/', function (req, res) {
    res.render('index', {title: 'abc'});
});

router.get('/get-name', function (req, res) {
    console.log('coming');
    var nameList = {};
    nameList.specialNum1 = {'server-num1a': [1, 1000, 431, 0, 0],'server-num1b': [1, 1000, 431, 0, 0]};
    nameList.specialNum2 = {'server-num2': [1, 1000, 432, 0, 0]};
    nameList.specialNum3 = {'server-num3': [1, 1000, 433, 0, 0]};
    nameList.specialNum4 = {'server-num1a': [1, 1000, 434, 0, 0]};
    nameList.specialNum5 = {'server-num2': [1, 1000, 435, 0, 0]};

    console.log('ending');
    res.json(nameList);

});

router.get('/json', function (req, res, next) {
    var url = 'http://localhost:3000/get-name';
    // url='/get-name';
    http.get(url, function (result) {
        console.log('get url:' + url + '....');
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
            console.log('content:' + dataRes);
            var dataObject = JSON.parse(dataRes);
            //对dataObject 进行特殊处理
            merge(dataObject, 'specialNum1', 'specialNum4');
            merge(dataObject, 'specialNum2', 'specialNum5');
            var afterObject=_.pick(dataObject,nameList);
            console.log('afterObject:::'+JSON.stringify(afterObject));
            var coutResult = [];
            _.each(afterObject,function(value,key){
                var info = {};
                info.name = key;
                info.commits = 0;
                info.addline = 0;
                info.subline = 0;
                info.totalline = 0;
                _.each(value,function(innerValue,innerKey){
                    info.commits +=innerValue[0];
                    info.addline +=innerValue[1];
                    info.subline +=innerValue[2];
                    info.totalline = innerValue[1]-innerValue[2];
                });
                coutResult.push(info);
            });
            console.log('convert:::'+JSON.stringify(coutResult));
            res.json(coutResult);
        });

    }).on('error', function (e) {
        console.log("Got error: " + e.message);
        next(e);
    });

});


module.exports = router;
