var express = require('express');
var router = express.Router();

var lastExecuted = 0;
var waitInterval = 5; // time in minutes to wait between jam execution; default 5 min

router.get('/', function(req, res, next){
    res.render('index', {title: 'Die'});
});
router.post('/', StartJams);

function StartJams(req, res, next){
    if(Math.floor((new Date() - lastExecuted)/60000) < waitInterval){
        console.log('someone tried to start jams too fast')
        res.send('chill bruh');
        return;
    }
    var spawn = require("child_process").spawn,child;
    child = spawn("powershell.exe",[__dirname + '/../startRand.ps1']);
    child.stdout.on("data",function(data){
        //console.log("Powershell Data: " + data);
    });
    child.stderr.on("data",function(data){
        console.log("error starting jams: " + data);
        res.send('something fucked up');
    });
    child.on("exit",function(){
        var d = new Date();
        console.log("music started at " + d.toString());
        res.send('coolio');
    });
    child.stdin.end();

    lastExecuted = new Date();
}
module.exports = router;
